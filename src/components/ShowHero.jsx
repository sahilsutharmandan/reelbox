"use client";

import { formatTime } from "@/lib/format";

export default function ShowHero({ show, inWatchlist, onToggleWatchlist }) {
  const backdrop = show.image?.original;
  const rating = show.rating?.average;
  const network = show.network?.name || show.webChannel?.name;
  const schedule = show.schedule;

  return (
    <div className="relative w-full min-h-[400px] flex items-end">
      {backdrop ? (
        <img
          src={backdrop}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gray-800" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/20" />
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-8 pt-24">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          {show.name}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-white/80 text-sm mb-4">
          {rating && (
            <span className="bg-primary px-3 py-1 rounded-full text-white font-semibold text-sm">
              ★ {rating}
            </span>
          )}
          {show.genres?.map((g) => (
            <span
              key={g}
              className="px-3 py-1 bg-white/15 rounded-full backdrop-blur-sm"
            >
              {g}
            </span>
          ))}
          <span className="px-3 py-1 bg-white/15 rounded-full backdrop-blur-sm">
            {show.status}
          </span>
          {network && (
            <span className="px-3 py-1 bg-white/15 rounded-full backdrop-blur-sm">
              {network}
            </span>
          )}
          {schedule?.days?.length > 0 && (
            <span className="px-3 py-1 bg-white/15 rounded-full backdrop-blur-sm">
              {schedule.days.join(", ")}{" "}
              {schedule.time && `at ${formatTime(schedule.time)}`}
            </span>
          )}
        </div>
        <button
          onClick={onToggleWatchlist}
          className={`px-6 py-2.5 rounded-lg font-semibold transition ${
            inWatchlist
              ? "bg-white/20 text-white border border-white/30 hover:bg-white/30"
              : "bg-primary text-white hover:bg-primary/90"
          }`}
        >
          {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>
      </div>
    </div>
  );
}
