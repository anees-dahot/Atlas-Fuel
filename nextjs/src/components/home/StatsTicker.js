'use client'

const sizeMap = { '1': '12px', '2': '16px', '3': '20px', '4': '24px', '5': '32px', '6': '48px', '7': '70px' }

const getStyle = (obj, field) => {
  const style = {}
  if (obj[`${field}Size`]) {
    style.fontSize = sizeMap[obj[`${field}Size`]]
  }
  if (obj[`${field}BorderEnabled`]) {
    style.WebkitTextStroke = `${obj[`${field}BorderWidth`]} ${obj[`${field}BorderColor`]}`
    if (obj[`${field}ShadowColor`]) {
      style.textShadow = `0 0 10px ${obj[`${field}ShadowColor`]}`
    }
  }
  return style
}

const defaultStats = [
  { value: '15+', label: 'Years Experience' },
  { value: '100M+', label: 'Litres Delivered' },
  { value: '100%', label: 'Australian Owned' },
  { value: '24/7', label: 'Service Available' },
  { value: '6', label: 'Industries Served' },
  { value: 'ISO', label: '9001 · 14001 · 45001 Certified' },
  { value: '300+', label: 'Jobs Connected' },
  { value: '99.5%', label: 'On-Time Delivery' },
]

export default function StatsTicker({ data }) {
  const stats = data && data.stats && data.stats.length > 0 ? data.stats : defaultStats

  return (
    <div className="bg-gray-900 py-3.5 overflow-hidden border-y border-gray-800">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...stats, ...stats].map((stat, i) => (
          <span key={i} className="inline-flex items-center gap-3 mx-8">
            <span className={`${stat.valueColor || "text-primary"} font-bold text-base font-heading tracking-wide`} style={getStyle(stat, 'value')}>
              {stat.value}
            </span>
            <span className={`${stat.labelColor || "text-gray-400"} text-xs uppercase tracking-widest font-medium`} style={getStyle(stat, 'label')}>
              {stat.label}
            </span>
            <span className="text-gray-700 text-lg ml-4">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
