const FUEL_RATES_API_URL = 'https://globalcrm.atlasfuel.com.au/api/fuel-rates'

const PRODUCT_TO_KEY = {
  'Diesel': 'diesel',
  'Premium - 98': 'premium',
  'Blended E10': 'e10',
  'Unleaded 91 (ULP)': 'unleaded',
  'Pulp - 95': 'pulp95',
}

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
  const byCity = new Map()

  for (const row of payload.data) {
    const key = PRODUCT_TO_KEY[row?.product_name]
    if (!row?.state_name || !row?.city_name || !key) continue

    const cityKey = `${row.state_name}::${row.city_name}`
    let location = byCity.get(cityKey)
    if (!location) {
      location = { name: row.city_name }
      byCity.set(cityKey, location)
      if (!byState.has(row.state_name)) byState.set(row.state_name, [])
      byState.get(row.state_name).push(location)
    }

    location[key] = toCpl(row.final_price)
  }

  return Array.from(byState.entries()).map(([state, locations]) => ({ state, locations }))
}
