import { NextRequest, NextResponse } from "next/server";
import { searchProductPrices } from "@/lib/search/searchProductPrices";

export async function POST(request: NextRequest) {
  try {
    const { query, country } = await request.json();

    if (!query || !country) {
      return NextResponse.json(
        { error: "Query and country are required" },
        { status: 400 }
      );
    }

    const results = await searchProductPrices(query, country);

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Error in search-prices API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
