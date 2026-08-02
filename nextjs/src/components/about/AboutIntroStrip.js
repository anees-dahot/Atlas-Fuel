'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const sizeMap = {
  '1': '12px',
  '2': '16px',
  '3': '20px',
  '4': '24px',
  '5': '32px',
  '6': '48px',
  '7': '70px',
};

function parseNum(val) {
  const m = String(val).match(/(\d[\d,.]*)/)
  return m ? parseFloat(m[1].replace(',', '')) : 0
}
function getSuffix(val) {
  return String(val).replace(/[\d,. ]+/, '')
}
function getPrefix(val) {
  const m = String(val).match(/^([^0-9]*)/)
  return m ? m[1] : ''
}

function Counter({ value, style }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const animated = useRef(false)
  const target = parseNum(value)
  const numeric = /\d/.test(String(value ?? ''))
  const decimals = (String(value ?? '').match(/\.(\d+)/)?.[1] || '').length
  const suffix = getSuffix(value)
  const prefix = getPrefix(value)

  useEffect(() => {
    if (!ref.current || animated.current || !numeric) return
    const st = ScrollTrigger.create({
      trigger: ref.current, start: 'top 85%', once: true,
      onEnter: () => {
        animated.current = true
        gsap.to({ val: 0 }, {
          val: target, duration: 2.2, ease: 'power2.out',
          onUpdate() {
            const current = this.targets()[0].val
            setCount(Number(current.toFixed(decimals)))
          },
        })
      },
    })
    return () => st.kill()
  }, [decimals, numeric, target])

  return (
    <span ref={ref} className="tabular-nums" style={style}>
      {numeric ? `${prefix}${count}${suffix}` : value}
    </span>
  )
}

export default function AboutIntroStrip({ data = {} }) {
  const sectionRef = useRef(null)

  const quote = data.quote ?? 'Trusted by Australia\'s leading industries — from mining and agriculture to marine and construction.'
  const quoteColor = data.quoteColor ?? 'text-gray-900'
  const quoteSize = data.quoteSize ? { fontSize: sizeMap[data.quoteSize] } : {}
  const quoteBorderEnabled = data.quoteBorderEnabled ?? false
  const quoteBorderColor = data.quoteBorderColor ?? 'var(--cms-text)'
  const quoteBorderWidth = data.quoteBorderWidth ?? '1px'
  const quoteShadowColor = data.quoteShadowColor ?? ''
  const quoteStyle = {
    ...quoteSize,
    ...(quoteBorderEnabled && {
      WebkitTextStroke: `${quoteBorderWidth} ${quoteBorderColor}`,
      ...(quoteShadowColor && { textShadow: `0 0 10px ${quoteShadowColor}` }),
    }),
  }

  const counters = data.counters ?? [
    { value: '100M+', label: 'Litres Delivered'  },
    { value: '300+',  label: 'Jobs Connected'    },
    { value: '15+',   label: 'Years Experience'  },
    { value: '99.5%', label: 'On-Time Rate'      },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.intro-quote', { opacity: 0, y: 40, duration: 1, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { trigger: '.intro-quote', start: 'top 80%', once: true } })
      gsap.from('.intro-counter', { opacity: 0, y: 50, duration: 0.8, stagger: 0.12, ease: 'back.out(1.3)', immediateRender: false,
        scrollTrigger: { trigger: '.intro-counters-row', start: 'top 80%', once: true } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white py-20 lg:py-28 overflow-hidden relative border-y border-gray-100">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Quote */}
        <p className={`intro-quote ${quoteColor} text-2xl md:text-3xl lg:text-4xl font-heading font-medium text-center max-w-4xl mx-auto leading-snug mb-16`} style={quoteStyle}>
          <span className="text-primary">&ldquo;</span>
          {quote}
          <span className="text-primary">&rdquo;</span>
        </p>

        {/* Counters */}
        <div className="intro-counters-row grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-200 pt-12">
          {counters.map((c, i) => {
            const valueColor = c.valueColor ?? 'text-gray-900';
            const valueSize = c.valueSize ? { fontSize: sizeMap[c.valueSize] } : {};
            const valueBorderEnabled = c.valueBorderEnabled ?? false;
            const valueBorderColor = c.valueBorderColor ?? 'var(--cms-text)';
            const valueBorderWidth = c.valueBorderWidth ?? '1px';
            const valueShadowColor = c.valueShadowColor ?? '';
            const valueStyle = {
              ...valueSize,
              ...(valueBorderEnabled && {
                WebkitTextStroke: `${valueBorderWidth} ${valueBorderColor}`,
                ...(valueShadowColor && { textShadow: `0 0 10px ${valueShadowColor}` }),
              }),
            };

            const labelColor = c.labelColor ?? 'text-gray-500';
            const labelSize = c.labelSize ? { fontSize: sizeMap[c.labelSize] } : {};
            const labelBorderEnabled = c.labelBorderEnabled ?? false;
            const labelBorderColor = c.labelBorderColor ?? 'var(--cms-text)';
            const labelBorderWidth = c.labelBorderWidth ?? '1px';
            const labelShadowColor = c.labelShadowColor ?? '';
            const labelStyle = {
              ...labelSize,
              ...(labelBorderEnabled && {
                WebkitTextStroke: `${labelBorderWidth} ${labelBorderColor}`,
                ...(labelShadowColor && { textShadow: `0 0 10px ${labelShadowColor}` }),
              }),
            };

            return (
              <div key={c._key ?? `${c.label}-${i}`} className="intro-counter text-center group">
                <div className={`${valueColor} text-4xl md:text-5xl lg:text-6xl font-heading font-light mb-3 group-hover:text-primary transition-colors duration-300`} style={valueStyle}>
                  <Counter value={c.value} style={valueStyle} />
                </div>
                <div className="w-8 h-0.5 bg-primary mx-auto mb-3" />
                <div className={`${labelColor} text-xs font-semibold uppercase tracking-widest`} style={labelStyle}>{c.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
