const FUEL_RATES_API_URL = 'https://globalcrm.atlasfuel.com.au/api/fuel-rates'

const PRODUCT_TO_KEY = {
  'Diesel': 'diesel',
  'Premium - 98': 'premium',
  'Blended E10': 'e10',
  'Unleaded 91 (ULP)': 'unleaded',
  'Pulp - 95': 'pulp95',
}

function formatPrice(value) {
  return typeof value === 'number' ? String(value) : '--'
}

export async function getLiveFuelRates() {
  const res = await fetch(FUEL_RATES_API_URL, { next: { revalidate: 600 } })
  if (!res.ok) throw new Error(`Fuel rates API responded with ${res.status}`)

  const json = await res.json()
  if (!json?.success || !Array.isArray(json.data)) throw new Error('Unexpected fuel rates API response')

  return json
}

export function mapFuelRatesToRows(payload) {
  const byCity = new Map()

  for (const row of payload.data) {
    const key = PRODUCT_TO_KEY[row?.product_name]
    if (!row?.state_name || !row?.city_name || !key) continue

    const cityKey = `${row.state_name}::${row.city_name}`
    let entry = byCity.get(cityKey)
    if (!entry) {
      entry = { state: row.state_name, city: row.city_name }
      byCity.set(cityKey, entry)
    }

    entry[key] = formatPrice(row.final_price)
  }

  return Array.from(byCity.values()).sort((a, b) => a.state.localeCompare(b.state))
}
