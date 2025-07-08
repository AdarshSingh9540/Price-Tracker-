import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchFormProps {
  query: string;
  setQuery: (query: string) => void;
  country: string;
  setCountry: (country: string) => void;
  onSearch: () => void;
  loading: boolean;
}

const countries = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
];

const sampleQueries = [
  "CMF Phone 1",
  "iPhone 16 Pro",
  "MacBook Pro M4",
  "Samsung Galaxy S24 Ultra",
  "boAt Airdopes 311 Pro",
  "OnePlus 12",
  "Nothing Phone 2a",
];

export function SearchForm({ query, setQuery, country, setCountry, onSearch, loading }: SearchFormProps) {
  return (
    <div className="space-y-6 p-6">
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
              onKeyPress={(e) => e.key === "Enter" && onSearch()}
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
        onClick={onSearch}
        disabled={loading || !query.trim()}
        className="w-full py-6 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
      >
        {loading ? (
          <>
            <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Searching for best prices...
          </>
        ) : (
          <>
            <Search className="mr-2 h-5 w-5" />
            Find Best Prices
          </>
        )}
      </Button>
    </div>
  );
}