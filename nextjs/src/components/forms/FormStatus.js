'use client'

import {useState} from 'react'

export function useFormSubmission({endpoint, successMessage, errorMessage}) {
  const [status, setStatus] = useState({state: 'idle', message: '', fallbackUrl: ''})

  const submit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const fields = Object.fromEntries(new FormData(form).entries())

    setStatus({state: 'submitting', message: '', fallbackUrl: ''})

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(fields),
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok || !payload.ok) {
        const fallbackUrl =
          typeof payload.fallbackUrl === 'string' && payload.fallbackUrl.startsWith('mailto:')
            ? payload.fallbackUrl
            : ''
        setStatus({
          state: 'error',
          message: errorMessage,
          fallbackUrl,
        })
        return
      }

      form.reset()
      setStatus({state: 'success', message: successMessage, fallbackUrl: ''})
    } catch {
      setStatus({state: 'error', message: errorMessage, fallbackUrl: ''})
    }
  }

  return {status, submit, isSubmitting: status.state === 'submitting'}
}

export function FormStatus({status, emailLinkText = 'Email us instead'}) {
  if (
    status.state === 'idle' ||
    status.state === 'submitting' ||
    (!status.message && !status.fallbackUrl)
  ) return null

  return (
    <div
      className={
        status.state === 'success'
          ? 'border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800'
          : 'border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800'
      }
      role={status.state === 'error' ? 'alert' : 'status'}
      aria-live="polite"
    >
      {status.message}
      {status.fallbackUrl && (
        <>
          {' '}
          <a className="font-bold underline" href={status.fallbackUrl}>
            {emailLinkText}
          </a>
        </>
      )}
    </div>
  )
}
