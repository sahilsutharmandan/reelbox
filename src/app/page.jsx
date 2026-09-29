"use client";

import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchShows } from "@/lib/api";
import SearchInput from "@/components/SearchInput";
import ShowCard from "@/components/ShowCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const handleSearch = useCallback((q) => {
    setQuery(q);
  }, []);

  const { data: results, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchShows(query),
    enabled: query.length > 0,
  });

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-ink mb-2">
          Discover TV Shows
        </h1>
        <p className="text-muted text-lg mb-6">
          Search and track your favorite series
        </p>
        <SearchInput onSearch={handleSearch} />
      </div>

      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {results && results.length === 0 && query && (
        <p className="text-center text-muted py-12">
          No shows found for &quot;{query}&quot;
        </p>
      )}

      {results && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map(({ show }) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      )}

      {!query && (
        <p className="text-center text-muted py-16">
          Start typing to search for shows
        </p>
      )}
    </main>
  );
}
