"use client";

import Link from "next/link";
import { formatTime } from "@/lib/format";

export default function ScheduleCard({ entry }) {
  const show = entry.show;
  const image = show.image?.medium;
  const network = show.network?.name || show.webChannel?.name;

  return (
    <Link href={`/show?id=${show.id}`} className="flex flex-col h-full">
      <div className="rounded-xl overflow-hidden shadow-card bg-white hover:scale-[1.03] transition-transform duration-200 cursor-pointer h-full flex flex-col">
        {image ? (
          <img
            src={image}
            alt={show.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-muted text-sm">
            No Image
          </div>
        )}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-ink text-lg leading-tight mb-1 line-clamp-2">
            {show.name}
          </h3>
          <div className="text-sm text-muted space-y-1 mt-auto">
            {entry.airtime && (
              <p className="text-primary font-medium">
                {formatTime(entry.airtime)}
              </p>
            )}
            {network && <p>{network}</p>}
            <p>
              S{entry.season}E{entry.number} — {entry.name}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
