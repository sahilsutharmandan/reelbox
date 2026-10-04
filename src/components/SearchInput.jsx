"use client";

import { useState, useEffect, useRef } from "react";

export default function SearchInput({ onSearch }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const q = value.trim();
    if (!q) {
      onSearch("");
      return;
    }
    const timer = setTimeout(() => {
      onSearch(q);
    }, 300);
    return () => clearTimeout(timer);
  }, [value, onSearch]);

  function handleClear() {
    setValue("");
    inputRef.current?.focus();
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Escape" && handleClear()}
        placeholder="Search TV shows..."
        className="w-full pl-5 pr-12 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-surface text-ink text-lg shadow-card focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-muted hover:text-ink hover:bg-gray-100 dark:hover:bg-white/10 transition"
        >
          ✕
        </button>
      )}
    </div>
  );
}
