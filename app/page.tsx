"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Search, ExternalLink, CheckCircle, Star, Truck, ShoppingBag, Percent } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PriceResult {
  link: string
  price: string
  currency: string
  productName: string
  website: string
  availability: string
  rating?: string
  reviews?: string
  shipping?: string
  discount?: string
  image?: string
}

const countries = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
]

const sampleQueries = [
  "CMF Phone 1",
  "iPhone 16 Pro",
  "MacBook Pro M4",
  "Samsung Galaxy S24 Ultra",
  "boAt Airdopes 311 Pro",
  "OnePlus 12",
  "Nothing Phone 2a",
]

export default function PriceComparisonTool() {
  const [query, setQuery] = useState("")
  const [country, setCountry] = useState("IN")
  const [results, setResults] = useState<PriceResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [dataSource, setDataSource] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a product query")
      return
    }

    setLoading(true)
    setError("")
    setResults([])
    setDataSource("")

    try {
      const response = await fetch("/api/search-prices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query.trim(), country }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch prices")
      }

      const data = await response.json()
      setResults(data.results || [])

      // Determine data source
      if (data.results?.length > 0) {
        const hasRealData = data.results.some(
          (r: PriceResult) => r.link.includes("amazon") || r.link.includes("flipkart") || r.reviews,
        )
        setDataSource(hasRealData ? "Live data from e-commerce sites" : "Curated product database")
      }
    } catch (err) {
      setError("Failed to search for prices. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: string, currency: string) => {
    const numPrice = Number.parseFloat(price.replace(/[^\d.-]/g, ""))
    if (isNaN(numPrice)) return `${currency} ${price}`

    const currencyMap: Record<string, string> = {
      INR: "INR",
      USD: "USD",
      GBP: "GBP",
      EUR: "EUR",
      CAD: "CAD",
      AUD: "AUD",
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyMap[currency] || "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numPrice)
  }

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
          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                <Label htmlFor="query" className="text-sm font-medium mb-1.5 block">
                  Product Search
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="query"
                    className="pl-10 py-6 text-base"
                    placeholder="e.g., iPhone 16 Pro, MacBook Pro M4, CMF Phone 1"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="country" className="text-sm font-medium mb-1.5 block">
                  Country
                </Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="py-6">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        <span className="flex items-center gap-2">
                          <span>{c.flag}</span>
                          <span>{c.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {sampleQueries.map((sample) => (
                <Button
                  key={sample}
                  variant="outline"
                  size="sm"
                  onClick={() => setQuery(sample)}
                  className="text-xs bg-white hover:bg-blue-50"
                >
                  {sample}
                </Button>
              ))}
            </div>

          
            <Button
              onClick={handleSearch}
              disabled={loading || !query.trim()}
              className="w-full py-6 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Searching for best prices...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  Find Best Prices
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {results.length > 0 && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Price Results <span className="text-blue-600">({results.length})</span>
                </h2>
                <p className="text-gray-500 text-sm">Sorted by lowest price first</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-white">
                  {dataSource}
                </Badge>
                <Tabs
                  defaultValue="grid"
                  className="w-[200px]"
                  onValueChange={(v) => setViewMode(v as "grid" | "list")}
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="grid">Grid View</TabsTrigger>
                    <TabsTrigger value="list">List View</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((result, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-xl transition-all border-0 shadow-md">
                    <div className="relative bg-gray-50 p-4 flex items-center justify-center h-48">
                      {result.image ? (
                        <img
                          src={result.image || "/placeholder.svg"}
                          alt={result.productName}
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <div className="w-32 h-32 bg-gray-200 rounded-md flex items-center justify-center">
                          <ShoppingBag className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                      <Badge className="absolute top-2 left-2 bg-blue-600 hover:bg-blue-700" variant="secondary">
                        #{index + 1}
                      </Badge>
                      {result.discount && (
                        <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600" variant="secondary">
                          {result.discount}
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <div className="mb-3">
                        <Badge variant="outline" className="mb-2 bg-white">
                          {result.website}
                        </Badge>
                        <h3 className="font-medium text-lg line-clamp-2 h-14">{result.productName}</h3>
                      </div>

                      <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                        {result.rating && (
                          <div className="flex items-center">
                            <Star className="h-3.5 w-3.5 text-yellow-500 mr-1" fill="currentColor" />
                            <span>{result.rating}</span>
                          </div>
                        )}
                        {result.reviews && <span>({result.reviews})</span>}
                        {result.shipping && (
                          <div className="flex items-center ml-auto">
                            <Truck className="h-3.5 w-3.5 mr-1 text-green-600" />
                            <span className="text-green-600">{result.shipping}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatPrice(result.price, result.currency)}
                        </div>
                        <a
                          href={result.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                        >
                          View Deal
                          <ExternalLink className="h-3.5 w-3.5 ml-1" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((result, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-all border-0 shadow-md">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative bg-gray-50 p-4 flex items-center justify-center md:w-48 h-48">
                        {result.image ? (
                          <img
                            src={result.image || "/placeholder.svg"}
                            alt={result.productName}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <div className="w-32 h-32 bg-gray-200 rounded-md flex items-center justify-center">
                            <ShoppingBag className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                        <Badge className="absolute top-2 left-2 bg-blue-600 hover:bg-blue-700" variant="secondary">
                          #{index + 1}
                        </Badge>
                      </div>
                      <CardContent className="p-5 flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <Badge variant="outline" className="mb-2 bg-white">
                              {result.website}
                            </Badge>
                            <h3 className="font-medium text-lg mb-2">{result.productName}</h3>
                            <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                              {result.rating && (
                                <div className="flex items-center">
                                  <Star className="h-3.5 w-3.5 text-yellow-500 mr-1" fill="currentColor" />
                                  <span>{result.rating}</span>
                                </div>
                              )}
                              {result.reviews && <span>({result.reviews})</span>}
                              {result.shipping && (
                                <div className="flex items-center">
                                  <Truck className="h-3.5 w-3.5 mr-1 text-green-600" />
                                  <span className="text-green-600">{result.shipping}</span>
                                </div>
                              )}
                              {result.availability && (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  {result.availability}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <div className="text-2xl font-bold text-blue-600">
                              {formatPrice(result.price, result.currency)}
                            </div>
                            {result.discount && (
                              <Badge className="bg-red-500 hover:bg-red-600" variant="secondary">
                                <Percent className="h-3 w-3 mr-1" />
                                {result.discount}
                              </Badge>
                            )}
                            <a
                              href={result.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors mt-2"
                            >
                              View Deal
                              <ExternalLink className="h-3.5 w-3.5 ml-1" />
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {loading && (
          <div className="text-center py-16">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
              <div className="absolute inset-3 border-t-4 border-blue-400 border-solid rounded-full animate-spin animation-delay-150"></div>
              <div className="absolute inset-6 border-t-4 border-blue-200 border-solid rounded-full animate-spin animation-delay-300"></div>
            </div>
            <p className="text-xl font-medium text-gray-700 mb-2">Searching for the best prices...</p>
            <p className="text-gray-500">Comparing prices across multiple websites</p>
          </div>
        )}

        {!loading && results.length === 0 && query && (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No results found</h3>
            <p className="text-gray-500 mb-4">Try a different search term or select another country</p>
            <Button onClick={() => setQuery("")} variant="outline">
              Clear Search
            </Button>
          </div>
        )}

        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>© 2025 PriceHunter. All prices are fetched in real-time from respective websites.</p>
          <p className="mt-1">
            Prices and availability may vary. Always check the final price on the retailer's website.
          </p>
        </footer>
      </div>
    </div>
  )
}
