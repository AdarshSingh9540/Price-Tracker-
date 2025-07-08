// Realistic price ranges for different product categories by country
export const priceRanges = {
  // Electronics
  macbook: {
    IN: { min: 120000, max: 350000, currency: "INR" },
    US: { min: 1200, max: 3500, currency: "USD" },
    UK: { min: 1000, max: 3000, currency: "GBP" },
    default: { min: 1200, max: 3500, currency: "USD" },
  },
  iphone: {
    IN: { min: 50000, max: 180000, currency: "INR" },
    US: { min: 500, max: 1800, currency: "USD" },
    UK: { min: 400, max: 1500, currency: "GBP" },
    default: { min: 500, max: 1800, currency: "USD" },
  },
  laptop: {
    IN: { min: 25000, max: 300000, currency: "INR" },
    US: { min: 300, max: 3000, currency: "USD" },
    UK: { min: 250, max: 2500, currency: "GBP" },
    default: { min: 300, max: 3000, currency: "USD" },
  },
  headphones: {
    IN: { min: 1000, max: 50000, currency: "INR" },
    US: { min: 20, max: 500, currency: "USD" },
    UK: { min: 15, max: 400, currency: "GBP" },
    default: { min: 20, max: 500, currency: "USD" },
  },
  phone: {
    IN: { min: 8000, max: 150000, currency: "INR" },
    US: { min: 100, max: 1500, currency: "USD" },
    UK: { min: 80, max: 1200, currency: "GBP" },
    default: { min: 100, max: 1500, currency: "USD" },
  },
  tablet: {
    IN: { min: 15000, max: 120000, currency: "INR" },
    US: { min: 150, max: 1200, currency: "USD" },
    UK: { min: 120, max: 1000, currency: "GBP" },
    default: { min: 150, max: 1200, currency: "USD" },
  },
}

export function getPriceRange(query: string, country: string) {
  const queryLower = query.toLowerCase()

  for (const [category, ranges] of Object.entries(priceRanges)) {
    if (queryLower.includes(category)) {
      return ranges[country as keyof typeof ranges] || ranges.default
    }
  }

  // Default to laptop range if no category matches
  return priceRanges.laptop[country as keyof typeof priceRanges.laptop] || priceRanges.laptop.default
}
