"use client";

import Link from "next/link";
import { extractYear } from "@/lib/format";

export default function ShowCard({ show }) {
  const image = show.image?.medium;
  const year = extractYear(show.premiered);
  const rating = show.rating?.average;

  return (
    <Link href={`/show?id=${show.id}`}>
      <div className="rounded-xl overflow-hidden shadow-card bg-white hover:scale-[1.03] transition-transform duration-200 cursor-pointer flex flex-col">
        <img
            src={image}
            alt={show.name}
            className="w-full h-64 object-cover"
          />
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-ink text-lg leading-tight mb-1 line-clamp-2">
            {show.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted mb-2">
            {rating && (
              <span className="text-primary font-medium">★ {rating}</span>
            )}
            <span>{year}</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-auto">
            {show.genres?.slice(0, 3).map((g) => (
              <span
                key={g}
                className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium"
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
