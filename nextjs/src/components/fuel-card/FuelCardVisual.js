'use client'

const variants = {
  fleet: {
    surface: 'linear-gradient(135deg, #0a0a0a 0%, #1c1c1c 55%, #0a0a0a 100%)',
    accent: 'var(--cms-primary)',
    label: 'FLEET',
  },
  business: {
    surface: 'linear-gradient(135deg, #14501a 0%, #2db234 60%, #1a7a1f 100%)',
    accent: '#ffffff',
    label: 'BUSINESS',
  },
  driver: {
    surface: 'linear-gradient(135deg, #2e2e2e 0%, #575757 55%, #2e2e2e 100%)',
    accent: 'var(--cms-primary)',
    label: 'DRIVER',
  },
}

export default function FuelCardVisual({variant = 'fleet', label, className = ''}) {
  const style = variants[variant] ?? variants.fleet

  return (
    <div
      className="relative flex aspect-[1.586/1] w-full max-w-[280px] flex-col justify-between overflow-hidden rounded-xl p-6 shadow-lg"
      style={{background: style.surface}}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-25 blur-2xl"
        style={{backgroundColor: style.accent}}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div className="font-heading text-xl font-bold uppercase leading-none tracking-[0.14em] text-white">
          Atlas
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
          {label ?? style.label}
        </span>
      </div>

      <div className="relative z-10 flex items-center gap-3">
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke={style.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 20V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14" />
          <path d="M4 20h12" />
          <path d="M14 9h2.5l2.5 3v5a1.5 1.5 0 0 1-1.5 1.5H16" />
          <circle cx="9" cy="14" r="1.5" />
        </svg>
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
          Fuel Card
        </span>
      </div>
    </div>
  )
}
