import { PriceResult } from "./types";

export async function fetchGoogleShopping(query: string, country: string): Promise<PriceResult[]> {
  const SERPAPI_KEY = process.env.SERPAPI_KEY;
  if (!SERPAPI_KEY) return [];

  try {
    const url = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(query)}&gl=${country.toLowerCase()}&api_key=${SERPAPI_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.shopping_results) return [];

    return data.shopping_results.slice(0, 5).map((item: any) => ({
      link: item.link,
      price: item.price?.toString().replace(/[^\d.]/g, "") || "N/A",
      currency: country === "IN" ? "INR" : "USD",
      productName: item.title,
      website: item.source,
      availability: "In stock",
      rating: item.rating?.toString(),
      reviews: item.reviews?.toString(),
      shipping: item.delivery || "Varies",
      image: item.thumbnail,
    }));
  } catch (error) {
    console.error("Google Shopping API error:", error);
    return [];
  }
}
