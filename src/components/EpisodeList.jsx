"use client";

import { formatDate, formatRuntime } from "@/lib/format";

export default function EpisodeList({ episodes }) {
  if (!episodes || episodes.length === 0) {
    return <p className="text-muted py-4">No episodes found.</p>;
  }

  return (
    <div className="space-y-3">
      {episodes.map((ep) => (
        <div
          key={ep.id}
          className="bg-surface rounded-xl p-4 shadow-card"
        >
          <div className="flex items-start gap-4">
            {ep.image?.medium && (
              <img
                src={ep.image.medium}
                alt=""
                loading="lazy"
                className="w-48 aspect-video rounded-lg object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-ink">
                <span className="text-primary mr-2">E{ep.number}</span>
                {ep.name}
              </h4>
              <div className="flex items-center gap-3 text-sm text-muted mt-1">
                <span>{formatDate(ep.airdate)}</span>
                {ep.runtime && <span>{formatRuntime(ep.runtime)}</span>}
              </div>
              {ep.summary && (
                <div
                  className="text-sm text-muted mt-2 line-clamp-3 [&>p]:m-0"
                  dangerouslySetInnerHTML={{ __html: ep.summary }}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
