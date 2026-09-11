'use client'

import {FormStatus, useFormSubmission} from '@/components/forms/FormStatus'

const inputClass =
  'w-full border border-gray-300 bg-white px-5 py-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary'

const labelClass =
  'mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-gray-600'

export default function FuelTestingEnquiryForm({form = {}}) {
  const {status, submit, isSubmitting} = useFormSubmission({
    endpoint: '/api/fuel-testing',
    successMessage:
      form.successMessage ??
      'Thanks. Your testing enquiry has been received — our lab team will be in touch shortly.',
    errorMessage:
      form.errorMessage ??
      'Your enquiry could not be submitted. Please try again.',
  })

  const testTypes = form.testTypes ?? [
    'Fuel Quality & Contamination',
    'Compliance Certification',
    'On-Site Sampling',
    'Not sure yet',
  ]

  return (
    <form className="space-y-5" onSubmit={submit}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="fuel-testing-name">Name *</label>
          <input
            id="fuel-testing-name"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Smith"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="fuel-testing-company">Company</label>
          <input
            id="fuel-testing-company"
            name="companyName"
            type="text"
            autoComplete="organization"
            placeholder="Atlas Transport Pty Ltd"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="fuel-testing-email">Email *</label>
          <input
            id="fuel-testing-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@company.com.au"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="fuel-testing-phone">Phone</label>
          <input
            id="fuel-testing-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="04XX XXX XXX"
            className={inputClass}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="fuel-testing-type">Testing required *</label>
          <select
            id="fuel-testing-type"
            name="testType"
            required
            className={inputClass}
            defaultValue=""
          >
            <option value="" disabled>Select a service</option>
            {testTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="fuel-testing-message">Sample details</label>
        <textarea
          id="fuel-testing-message"
          name="message"
          rows={4}
          placeholder="Fuel type, sample source, and how soon you need results…"
          className={inputClass}
        />
      </div>

      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="fuel-testing-website">Website</label>
        <input id="fuel-testing-website" name="website" type="text" tabIndex="-1" autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full border-2 border-primary bg-primary px-8 py-5 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-primary-dark disabled:cursor-wait disabled:opacity-60"
      >
        {isSubmitting ? (form.submittingButtonText ?? 'Submitting…') : (form.buttonText ?? 'Request Testing')}
      </button>

      <FormStatus
        status={status}
        emailLinkText={form.emailFallbackText ?? 'Email us instead'}
      />
    </form>
  )
}
