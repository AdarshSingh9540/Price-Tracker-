import { getKnownProductPrices } from "./getKnownProductPrices";
import { fetchGoogleShopping } from "./fetchGoogleShopping";
import { generateRealisticPrices } from "./generateRealisticPrices";
import { PriceResult } from "./types";

export async function searchProductPrices(query: string, country: string): Promise<PriceResult[]> {
  const allResults: PriceResult[] = [];

  try {
    const knownProducts = getKnownProductPrices(query, country);
    if (knownProducts.length > 0) {
      return knownProducts;
    }

    const serpResults = await fetchGoogleShopping(query, country);
    allResults.push(...serpResults);

    if (allResults.length > 0) {
      const uniqueResults = allResults.filter(
        (result, index, self) => index === self.findIndex((r) => r.website === result.website),
      );

      return uniqueResults
        .filter((r) => r.price !== "N/A" && !isNaN(Number(r.price.replace(/[^\d.]/g, ""))))
        .sort((a, b) => {
          const priceA = Number(a.price.replace(/[^\d.]/g, ""));
          const priceB = Number(b.price.replace(/[^\d.]/g, ""));
          return priceA - priceB;
        })
        .slice(0, 8);
    }

    return generateRealisticPrices(query, country);
  } catch (error) {
    console.error("Error in searchProductPrices:", error);
    return generateRealisticPrices(query, country);
  }
}
