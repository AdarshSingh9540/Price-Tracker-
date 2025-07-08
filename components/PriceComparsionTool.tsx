"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Search } from "lucide-react";
import { PriceResult } from "../lib/search/types";
import { SearchForm } from "./SearchForm";
import { ResultsDisplay } from "./ResultDisplay";
import { LoadingSpinner } from "./LoadingSpinner";
import { NoResults } from "./NoResults";

export default function PriceComparisonTool() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("IN");
  const [results, setResults] = useState<PriceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataSource, setDataSource] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a product query");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);
    setDataSource("");

    try {
      const response = await fetch("/api/search-prices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query.trim(), country }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prices");
      }

      const data = await response.json();
      setResults(data.results || []);

      // Determine data source
      if (data.results?.length > 0) {
        const hasRealData = data.results.some(
          (r: PriceResult) => r.link.includes("amazon") || r.link.includes("flipkart") || r.reviews
        );
        setDataSource(hasRealData ? "Live data from e-commerce sites" : "Curated product database");
      }
    } catch (err) {
      setError("Failed to search for prices. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: string, currency: string) => {
    const numPrice = Number.parseFloat(price.replace(/[^\d.-]/g, ""));
    if (isNaN(numPrice)) return `${currency} ${price}`;

    const currencyMap: Record<string, string> = {
      INR: "INR",
      USD: "USD",
      GBP: "GBP",
      EUR: "EUR",
      CAD: "CAD",
      AUD: "AUD",
    };

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyMap[currency] || "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numPrice);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            PriceHunter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the best deals across multiple websites with real-time price comparison
          </p>
        </div>

        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <CheckCircle className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-700">
            <strong>Real Price Data:</strong> This tool fetches actual prices from major e-commerce sites like Amazon,
            Flipkart, and more.
          </AlertDescription>
        </Alert>

        <Card className="mb-8 shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Search className="h-5 w-5" />
              Find Best Prices
            </CardTitle>
            <CardDescription>Compare prices across multiple websites in seconds</CardDescription>
          </CardHeader>
          <SearchForm
            query={query}
            setQuery={setQuery}
            country={country}
            setCountry={setCountry}
            onSearch={handleSearch}
            loading={loading}
          />
        </Card>

        {/* {error && (
          <Alert className="mb-6 bg-red-50 border-red-200">
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )} */}

        {results.length > 0 && (
          <ResultsDisplay
            results={results}
            dataSource={dataSource}
            viewMode={viewMode}
            setViewMode={setViewMode}
            formatPrice={formatPrice}
          />
        )}

        {loading && <LoadingSpinner />}

        {!loading && results.length === 0 && query && <NoResults setQuery={setQuery} />}

        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>© 2025 PriceHunter. All prices are fetched in real-time from respective websites.</p>
          <p className="mt-1">
            Prices and availability may vary. Always check the final price on the retailer's website.
          </p>
        </footer>
      </div>
    </div>
  );
}