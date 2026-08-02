import test from 'node:test'
import assert from 'node:assert/strict'
import {handleFormSubmission} from '../src/app/api/_shared/formSubmission.js'

const requestFor = (body, origin = 'http://localhost') =>
  new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      host: 'localhost',
      origin,
      'x-forwarded-for': '127.0.0.1',
    },
    body: JSON.stringify(body),
  })

test('rejects cross-origin form submissions', async () => {
  const response = await handleFormSubmission(
    requestFor({email: 'test@example.com', message: 'Hello'}, 'https://example.com'),
    'contact'
  )

  assert.equal(response.status, 403)
})

test('validates required contact fields', async () => {
  const response = await handleFormSubmission(
    requestFor({email: 'test@example.com'}),
    'contact'
  )

  assert.equal(response.status, 400)
  assert.equal((await response.json()).ok, false)
})

test('silently accepts honeypot submissions', async () => {
  const response = await handleFormSubmission(
    requestFor({website: 'spam.example', email: 'bot@example.com', message: 'Spam'}),
    'contact'
  )

  assert.equal(response.status, 200)
  assert.equal((await response.json()).ok, true)
})

test('delivers valid submissions through the configured provider', async () => {
  const originalFetch = globalThis.fetch
  const originalApiKey = process.env.RESEND_API_KEY
  const originalFrom = process.env.ATLAS_FORMS_FROM_EMAIL
  const originalTo = process.env.ATLAS_FORMS_TO_EMAIL
  let delivery

  process.env.RESEND_API_KEY = 're_test'
  process.env.ATLAS_FORMS_FROM_EMAIL = 'Atlas Website <website@example.com>'
  process.env.ATLAS_FORMS_TO_EMAIL = 'team@example.com'
  globalThis.fetch = async (url, options) => {
    delivery = {url, options}
    return new Response(JSON.stringify({id: 'email_123'}), {status: 200})
  }

  try {
    const response = await handleFormSubmission(
      requestFor({
        email: 'customer@example.com',
        message: '<script>alert(1)</script>',
      }),
      'contact'
    )

    assert.equal(response.status, 200)
    assert.equal((await response.json()).ok, true)
    assert.equal(delivery.url, 'https://api.resend.com/emails')
    assert.equal(delivery.options.headers.Authorization, 'Bearer re_test')

    const payload = JSON.parse(delivery.options.body)
    assert.equal(payload.reply_to, 'customer@example.com')
    assert.deepEqual(payload.to, ['team@example.com'])
    assert.match(payload.html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/)
  } finally {
    globalThis.fetch = originalFetch
    if (originalApiKey === undefined) delete process.env.RESEND_API_KEY
    else process.env.RESEND_API_KEY = originalApiKey
    if (originalFrom === undefined) delete process.env.ATLAS_FORMS_FROM_EMAIL
    else process.env.ATLAS_FORMS_FROM_EMAIL = originalFrom
    if (originalTo === undefined) delete process.env.ATLAS_FORMS_TO_EMAIL
    else process.env.ATLAS_FORMS_TO_EMAIL = originalTo
  }
})
