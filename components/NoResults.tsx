import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface NoResultsProps {
  setQuery: (query: string) => void;
}

export function NoResults({ setQuery }: NoResultsProps) {
  return (
    <div className="text-center py-16 bg-white rounded-lg shadow-sm">
      <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-medium text-gray-700 mb-2">
        No results found
      </h3>
      <p className="text-gray-500 mb-4">
        Try a different search term or select another country
      </p>
      <Button onClick={() => setQuery("")} variant="outline">
        Clear Search
      </Button>
    </div>
  );
}
