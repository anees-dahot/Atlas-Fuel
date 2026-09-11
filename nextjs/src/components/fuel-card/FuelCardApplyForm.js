'use client'

import {FormStatus, useFormSubmission} from '@/components/forms/FormStatus'

const inputClass =
  'w-full border border-gray-300 bg-white px-5 py-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary'

const labelClass =
  'mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-gray-600'

export default function FuelCardApplyForm({form = {}}) {
  const {status, submit, isSubmitting} = useFormSubmission({
    endpoint: '/api/fuel-card',
    successMessage:
      form.successMessage ??
      'Thanks. Your fuel card application has been received — our team will be in touch within one business day.',
    errorMessage:
      form.errorMessage ??
      'Your application could not be submitted. Please try again.',
  })

  const cardTypes = form.cardTypes ?? ['Fleet Card', 'Business Card', 'Driver Card', 'Not sure yet']
  const fleetSizes = form.fleetSizes ?? ['1 – 5 vehicles', '6 – 20 vehicles', '21 – 50 vehicles', '50+ vehicles']

  return (
    <form className="space-y-5" onSubmit={submit}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="fuel-card-company">Business name *</label>
          <input
            id="fuel-card-company"
            name="companyName"
            type="text"
            required
            autoComplete="organization"
            placeholder="Atlas Transport Pty Ltd"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="fuel-card-abn">ABN</label>
          <input
            id="fuel-card-abn"
            name="abn"
            type="text"
            inputMode="numeric"
            placeholder="12 345 678 901"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="fuel-card-name">Contact name *</label>
          <input
            id="fuel-card-name"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Smith"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="fuel-card-email">Email *</label>
          <input
            id="fuel-card-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@company.com.au"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="fuel-card-phone">Phone *</label>
          <input
            id="fuel-card-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="04XX XXX XXX"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="fuel-card-state">State</label>
          <select
            id="fuel-card-state"
            name="state"
            className={inputClass}
            defaultValue=""
          >
            <option value="" disabled>Select your state</option>
            {['WA', 'NT', 'SA', 'QLD', 'NSW', 'VIC', 'TAS', 'ACT'].map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="fuel-card-type">Card type *</label>
          <select
            id="fuel-card-type"
            name="cardType"
            required
            className={inputClass}
            defaultValue=""
          >
            <option value="" disabled>Select a card</option>
            {cardTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="fuel-card-fleet">Fleet size</label>
          <select
            id="fuel-card-fleet"
            name="fleetSize"
            className={inputClass}
            defaultValue=""
          >
            <option value="" disabled>Select fleet size</option>
            {fleetSizes.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="fuel-card-message">Anything else we should know?</label>
        <textarea
          id="fuel-card-message"
          name="message"
          rows={4}
          placeholder="Monthly fuel volume, sites you refuel at, purchase controls you need…"
          className={inputClass}
        />
      </div>

      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="fuel-card-website">Website</label>
        <input id="fuel-card-website" name="website" type="text" tabIndex="-1" autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full border-2 border-primary bg-primary px-8 py-5 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-primary-dark disabled:cursor-wait disabled:opacity-60"
      >
        {isSubmitting ? (form.submittingButtonText ?? 'Submitting…') : (form.buttonText ?? 'Apply for a Fuel Card')}
      </button>

      <p className="text-xs leading-relaxed text-gray-500">
        {form.disclaimer ??
          'Applications are subject to credit assessment and approval. Atlas Fuel will never ask for your card PIN or banking passwords by email.'}
      </p>

      <FormStatus
        status={status}
        emailLinkText={form.emailFallbackText ?? 'Email us instead'}
      />
    </form>
  )
}
