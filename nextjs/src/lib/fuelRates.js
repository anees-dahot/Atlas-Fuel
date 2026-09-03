const FUEL_RATES_API_URL = 'https://globalcrm.atlasfuel.com.au/api/fuel-rates/table'

// Prices from Fuel Rates API are per-litre in dollars (e.g. 2.3281); the site displays cents-per-litre.
function toCpl(value) {
  if (typeof value !== 'number') return typeof value === 'string' ? value : '--'
  return (value * 100).toFixed(2)
}

export async function getLiveFuelRates() {
  const res = await fetch(FUEL_RATES_API_URL, { next: { revalidate: 600 } })
  if (!res.ok) throw new Error(`Fuel rates API responded with ${res.status}`)

  const json = await res.json()
  if (!json?.success || !Array.isArray(json.data)) throw new Error('Unexpected fuel rates API response')

  return json
}

export function mapFuelRatesToPriceGroups(payload) {
  const byState = new Map()

  for (const row of payload.data) {
    if (!row?.state) continue
    if (!byState.has(row.state)) byState.set(row.state, [])
    byState.get(row.state).push({
      name: row.city,
      diesel: toCpl(row['Diesel']),
      premium: toCpl(row['Premium - 98']),
      e10: toCpl(row['Blended E10']),
      unleaded: toCpl(row['Unleaded 91 (ULP)']),
      pulp95: toCpl(row['Pulp - 95']),
    })
  }

  return Array.from(byState.entries()).map(([state, locations]) => ({ state, locations }))
}
