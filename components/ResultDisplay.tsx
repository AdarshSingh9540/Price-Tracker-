import { PriceResult } from "../lib/search/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Truck, ShoppingBag, Percent, ExternalLink } from "lucide-react";

interface ResultsDisplayProps {
  results: PriceResult[];
  dataSource: string;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  formatPrice: (price: string, currency: string) => string;
}

export function ResultsDisplay({
  results,
  dataSource,
  viewMode,
  setViewMode,
  formatPrice,
}: ResultsDisplayProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Price Results{" "}
            <span className="text-blue-600">({results.length})</span>
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
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all border-0 shadow-md"
            >
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
                <Badge
                  className="absolute top-2 left-2 text-white bg-blue-600 hover:bg-blue-700"
                  variant="secondary"
                >
                  #{index + 1}
                </Badge>
                {result.discount && (
                  <Badge
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600"
                    variant="secondary"
                  >
                    {result.discount}
                  </Badge>
                )}
              </div>
              <CardContent className="p-5">
                <div className="mb-3">
                  <Badge variant="outline" className="mb-2 bg-white">
                    {result.website}
                  </Badge>
                  <h3 className="font-medium text-lg line-clamp-2 h-14">
                    {result.productName}
                  </h3>
                </div>

                <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                  {result.rating && (
                    <div className="flex items-center">
                      <Star
                        className="h-3.5 w-3.5 text-yellow-500 mr-1"
                        fill="currentColor"
                      />
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
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-all border-0 shadow-md"
            >
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
                  <Badge
                    className="absolute top-2 left-2 bg-blue-600 hover:bg-blue-700"
                    variant="secondary"
                  >
                    #{index + 1}
                  </Badge>
                </div>
                <CardContent className="p-5 flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <Badge variant="outline" className="mb-2 bg-white">
                        {result.website}
                      </Badge>
                      <h3 className="font-medium text-lg mb-2">
                        {result.productName}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                        {result.rating && (
                          <div className="flex items-center">
                            <Star
                              className="h-3.5 w-3.5 text-yellow-500 mr-1"
                              fill="currentColor"
                            />
                            <span>{result.rating}</span>
                          </div>
                        )}
                        {result.reviews && <span>({result.reviews})</span>}
                        {result.shipping && (
                          <div className="flex items-center">
                            <Truck className="h-3.5 w-3.5 mr-1 text-green-600" />
                            <span className="text-green-600">
                              {result.shipping}
                            </span>
                          </div>
                        )}
                        {result.availability && (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
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
                        <Badge
                          className="bg-red-500 hover:bg-red-600"
                          variant="secondary"
                        >
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
  );
}
