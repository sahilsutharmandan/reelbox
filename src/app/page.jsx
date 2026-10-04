"use client";

import { useState, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchShows } from "@/lib/api";
import SearchInput from "@/components/SearchInput";
import ShowCard from "@/components/ShowCard";
import SortMenu from "@/components/SortMenu";

const SORT_OPTIONS = [
  { value: "relevance", label: "Best match" },
  { value: "rating", label: "Top rated" },
  { value: "newest", label: "Newest" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  const handleSearch = useCallback((q) => {
    setQuery(q);
  }, []);

  const { data: results, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchShows(query),
    enabled: query.length > 0,
  });

  const shows = useMemo(() => {
    if (!results) return results;
    if (sortBy === "rating") {
      return [...results].sort(
        (a, b) => (b.show.rating?.average || 0) - (a.show.rating?.average || 0)
      );
    }
    if (sortBy === "newest") {
      return [...results].sort((a, b) =>
        b.show.premiered.localeCompare(a.show.premiered)
      );
    }
    return results;
  }, [results, sortBy]);

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

      {shows && shows.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-4 text-sm">
            <p className="text-muted">
              {shows.length} {shows.length === 1 ? "result" : "results"}
            </p>
            <SortMenu
              value={sortBy}
              options={SORT_OPTIONS}
              onChange={setSortBy}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {shows.map(({ show }) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        </>
      )}

      {!query && (
        <p className="text-center text-muted py-16">
          Start typing to search for shows
        </p>
      )}
    </main>
  );
}
