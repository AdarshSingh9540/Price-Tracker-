import { knownPrices } from "@/helper/KnownPrices";
import { PriceResult } from "./types";

export function getKnownProductPrices(query: string, country: string): PriceResult[] {
  const queryLower = query.toLowerCase();

  for (const [product, countryData] of Object.entries(knownPrices)) {
    if (queryLower.includes(product) || product.includes(queryLower)) {
      const prices = countryData[country] || countryData["IN"] || [];
      if (prices.length > 0) {
        return prices;
      }
    }
  }

  return [];
}
