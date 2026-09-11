'use client'

import {useState} from 'react'

export default function FuelCardFaq({items = []}) {
  const [openIndex, setOpenIndex] = useState(0)

  if (!items.length) return null

  return (
    <div className="divide-y divide-gray-200 border-y border-gray-200">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div key={item._key ?? item.question ?? index}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="font-heading text-lg font-bold uppercase tracking-wide text-gray-900 md:text-xl">
                {item.question}
              </span>
              <span
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center border transition-all duration-300 ${
                  isOpen ? 'border-primary bg-primary text-white' : 'border-gray-300 text-gray-500'
                }`}
              >
                <svg
                  className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </button>
            <div
              className="grid transition-all duration-300 ease-out"
              style={{gridTemplateRows: isOpen ? '1fr' : '0fr'}}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-6 leading-relaxed text-gray-600">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
