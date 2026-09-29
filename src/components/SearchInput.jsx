"use client";

import { useState, useEffect } from "react";

export default function SearchInput({ onSearch }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search TV shows..."
        className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white text-ink text-lg shadow-card focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
      />
    </div>
  );
}
