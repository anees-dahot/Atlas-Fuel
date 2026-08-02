const FORM_TYPES = {
  contact: {
    subject: 'Website contact enquiry',
    required: ['email', 'message'],
  },
  careers: {
    subject: 'Website careers application',
    required: ['fullName', 'email', 'coverLetter'],
  },
  subscribe: {
    subject: 'Fuel price alert subscription',
    required: ['email', 'location'],
  },
}

const MAX_BODY_BYTES = 64 * 1024
const MAX_FIELD_LENGTH = 5000
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 8
const requestsByAddress = new Map()

const cleanText = (value) =>
  typeof value === 'string'
    ? value.replace(/\u0000/g, '').trim().slice(0, MAX_FIELD_LENGTH)
    : ''

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')

const isEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254

const sameOrigin = (request) => {
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')
  if (!origin || !host) return true

  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

const isRateLimited = (request) => {
  const address =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  const now = Date.now()
  const recent = (requestsByAddress.get(address) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  )

  recent.push(now)
  requestsByAddress.set(address, recent)
  return recent.length > RATE_LIMIT_MAX
}

const buildMessages = (formType, fields) => {
  const deliveryAddress =
    process.env.ATLAS_FORMS_TO_EMAIL ||
    process.env.FORM_TO_EMAIL ||
    'info@atlasfuel.com.au'
  const rows = Object.entries(fields)
    .filter(([key, value]) => key !== 'website' && value)
    .map(([key, value]) => [
      key.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase()),
      value,
    ])

  return {
    text: rows.map(([label, value]) => `${label}: ${value}`).join('\n\n'),
    html: rows
      .map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong><br>${escapeHtml(value).replaceAll('\n', '<br>')}</p>`)
      .join(''),
    mailto: `mailto:${deliveryAddress}?subject=${encodeURIComponent(FORM_TYPES[formType].subject)}&body=${encodeURIComponent(
      rows.map(([label, value]) => `${label}: ${value}`).join('\n\n')
    )}`,
  }
}

export async function handleFormSubmission(request, formType) {
  const config = FORM_TYPES[formType]
  if (!config) {
    return Response.json({ok: false, message: 'Unknown form.'}, {status: 404})
  }

  if (!sameOrigin(request)) {
    return Response.json({ok: false, message: 'Invalid form origin.'}, {status: 403})
  }

  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json({ok: false, message: 'Submission is too large.'}, {status: 413})
  }

  if (isRateLimited(request)) {
    return Response.json(
      {ok: false, message: 'Too many attempts. Please wait before trying again.'},
      {status: 429}
    )
  }

  let input
  try {
    const rawBody = await request.text()
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return Response.json({ok: false, message: 'Submission is too large.'}, {status: 413})
    }
    input = JSON.parse(rawBody)
  } catch {
    return Response.json({ok: false, message: 'Invalid form submission.'}, {status: 400})
  }

  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return Response.json({ok: false, message: 'Invalid form submission.'}, {status: 400})
  }

  const fields = Object.fromEntries(
    Object.entries(input)
      .slice(0, 40)
      .map(([key, value]) => [cleanText(key).slice(0, 80), cleanText(value)])
      .filter(([key]) => key)
  )

  if (fields.website) {
    return Response.json({ok: true})
  }

  const missing = config.required.filter((field) => !fields[field])
  if (missing.length) {
    return Response.json(
      {ok: false, message: 'Please complete all required fields.'},
      {status: 400}
    )
  }

  if (!isEmail(fields.email)) {
    return Response.json(
      {ok: false, message: 'Please enter a valid email address.'},
      {status: 400}
    )
  }

  const {text, html, mailto} = buildMessages(formType, fields)
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.ATLAS_FORMS_FROM_EMAIL || process.env.FORM_FROM_EMAIL
  const to = process.env.ATLAS_FORMS_TO_EMAIL || process.env.FORM_TO_EMAIL

  if (!apiKey || !from || !to) {
    return Response.json(
      {
        ok: false,
        message: 'Online delivery is not configured yet. Please email the Atlas Fuel team instead.',
        fallbackUrl: mailto,
      },
      {status: 503}
    )
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: fields.email,
        subject: config.subject,
        text,
        html,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      return Response.json(
        {
          ok: false,
          message: 'We could not send your submission. Please email the Atlas Fuel team instead.',
          fallbackUrl: mailto,
        },
        {status: 502}
      )
    }

    return Response.json({ok: true})
  } catch {
    return Response.json(
      {
        ok: false,
        message: 'We could not send your submission. Please email the Atlas Fuel team instead.',
        fallbackUrl: mailto,
      },
      {status: 502}
    )
  }
}
