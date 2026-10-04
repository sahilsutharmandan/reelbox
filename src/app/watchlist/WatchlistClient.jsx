"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  getWatchlist,
  removeFromWatchlist,
  getProgress,
  setProgress,
} from "@/lib/storage";
import { percent } from "@/lib/format";

export default function WatchlistClient() {
  useSearchParams();
  const [watchlist, setWatchlist] = useState([]);
  const [progress, setProgressState] = useState({});

  useEffect(() => {
    setWatchlist(getWatchlist());
    setProgressState(getProgress());
  }, []);

  function handleRemove(showId) {
    const updated = removeFromWatchlist(showId);
    setWatchlist(updated);
  }

  function handleWatchedChange(showId, value) {
    const current = progress[showId] || { watched: 0, total: 0 };
    const watched = Math.max(0, Math.min(Number(value) || 0, current.total));
    const updated = setProgress(showId, watched, current.total);
    setProgressState(updated);
  }

  function handleTotalChange(showId, value) {
    const current = progress[showId] || { watched: 0, total: 0 };
    const total = Math.max(0, Number(value) || 0);
    const watched = Math.min(current.watched, total);
    const updated = setProgress(showId, watched, total);
    setProgressState(updated);
  }

  if (watchlist.length === 0) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-ink mb-8">My Watchlist</h1>
        <div className="text-center py-16">
          <p className="text-muted text-lg mb-4">Your watchlist is empty</p>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
          >
            Discover Shows
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-ink mb-8">My Watchlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {watchlist.map((show) => {
          const prog = progress[show.id] || { watched: 0, total: 0 };
          const pct = percent(prog.watched, prog.total);

          return (
            <div
              key={show.id}
              className="rounded-xl overflow-hidden shadow-card bg-surface flex flex-col"
            >
              <Link href={`/show?id=${show.id}`}>
                {show.image?.medium ? (
                  <img
                    src={show.image.medium}
                    alt={show.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 dark:bg-white/10 flex items-center justify-center text-muted text-sm">
                    No Image
                  </div>
                )}
              </Link>
              <div className="p-4 flex flex-col flex-1">
                <Link href={`/show?id=${show.id}`}>
                  <h3 className="font-semibold text-ink text-lg leading-tight mb-2 line-clamp-2 hover:text-primary transition">
                    {show.name}
                  </h3>
                </Link>

                <div className="mt-auto space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-muted mb-1">
                      <span>Progress</span>
                      <span>
                        {prog.watched}/{prog.total} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-white/10 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <label className="text-muted">Watched</label>
                    <input
                      type="number"
                      min={0}
                      max={prog.total}
                      value={prog.watched}
                      onChange={(e) =>
                        handleWatchedChange(show.id, e.target.value)
                      }
                      className="w-16 px-2 py-1 border dark:border-white/20 bg-canvas text-ink rounded text-center text-sm"
                    />
                    <label className="text-muted">of</label>
                    <input
                      type="number"
                      min={0}
                      value={prog.total}
                      onChange={(e) =>
                        handleTotalChange(show.id, e.target.value)
                      }
                      className="w-16 px-2 py-1 border dark:border-white/20 bg-canvas text-ink rounded text-center text-sm"
                    />
                  </div>

                  <button
                    onClick={() => handleRemove(show.id)}
                    className="w-full py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
