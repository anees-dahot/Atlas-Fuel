'use client'

import {FormStatus, useFormSubmission} from '@/components/forms/FormStatus'

export default function FuelPriceSubscribeForm({form}) {
  const {status, submit, isSubmitting} = useFormSubmission({
    endpoint: '/api/subscribe',
    successMessage:
      form.successMessage ??
      'Thanks. Your fuel price alert request has been submitted.',
    errorMessage:
      form.errorMessage ??
      'Your request could not be submitted. Please try again.',
  })

  return (
    <form className="space-y-4" onSubmit={submit}>
      <input
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder={form.emailPlaceholder}
        aria-label={form.emailLabel || form.emailPlaceholder}
        className="w-full px-6 py-4 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {form.locations?.length ? (
        <select
          name="location"
          required
          aria-label={form.locationLabel || form.locationPlaceholder}
          className="w-full px-6 py-4 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
          defaultValue=""
        >
          <option value="" disabled>{form.locationPlaceholder}</option>
          {form.locations.map((location) => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          name="location"
          required
          placeholder={form.locationPlaceholder}
          aria-label={form.locationLabel || form.locationPlaceholder}
          className="w-full px-6 py-4 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      )}
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="subscribe-website">Website</label>
        <input id="subscribe-website" name="website" type="text" tabIndex="-1" autoComplete="off" />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-4 bg-primary text-white font-bold text-[13px] uppercase tracking-[0.1em] border-2 border-primary hover:bg-primary-dark transition-all duration-300 disabled:cursor-wait disabled:opacity-60"
      >
        {isSubmitting ? (form.submittingButtonText ?? 'Submitting…') : form.buttonText}
      </button>
      <FormStatus
        status={status}
        emailLinkText={form.emailFallbackText ?? 'Email us instead'}
      />
    </form>
  )
}
