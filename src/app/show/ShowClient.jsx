"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getShow, getEpisodesBySeason } from "@/lib/api";
import {
  isInWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from "@/lib/storage";
import ShowHero from "@/components/ShowHero";
import SeasonTabs from "@/components/SeasonTabs";
import EpisodeList from "@/components/EpisodeList";
import CastCarousel from "@/components/CastCarousel";

export default function ShowClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [inWatchlist, setInWatchlist] = useState(false);

  const { data: show, isLoading } = useQuery({
    queryKey: ["show", id],
    queryFn: () => getShow(id),
    enabled: !!id,
  });

  const seasons = useMemo(() => show?._embedded?.seasons || [], [show]);
  const cast = show?._embedded?.cast || [];

  const [activeSeason, setActiveSeason] = useState(null);

  useEffect(() => {
    if (seasons.length > 0 && !activeSeason) {
      setActiveSeason(seasons[0]);
    }
  }, [seasons, activeSeason]);

  useEffect(() => {
    if (id) {
      setInWatchlist(isInWatchlist(Number(id)));
    }
  }, [id]);

  const { data: episodes, isLoading: episodesLoading } = useQuery({
    queryKey: ["episodes", id],
    queryFn: () => getEpisodesBySeason(activeSeason.id),
    enabled: !!activeSeason,
  });

  function handleToggleWatchlist() {
    if (!show) return;
    if (inWatchlist) {
      removeFromWatchlist(show.id);
      setInWatchlist(false);
    } else {
      addToWatchlist({
        id: show.id,
        name: show.name,
        image: show.image,
        rating: show.rating,
        genres: show.genres,
      });
      setInWatchlist(true);
    }
  }

  if (!id) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center text-muted">
        No show selected.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!show) return null;

  return (
    <div>
      <ShowHero
        show={show}
        inWatchlist={inWatchlist}
        onToggleWatchlist={handleToggleWatchlist}
      />

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        {show.summary && (
          <section>
            <h2 className="text-2xl font-bold text-ink mb-3">Summary</h2>
            <p className="text-muted leading-relaxed">
              {show.summary}
            </p>
          </section>
        )}

        {seasons.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4">Episodes</h2>
            <SeasonTabs
              seasons={seasons}
              activeSeason={activeSeason}
              onSelect={setActiveSeason}
            />
            <div className="mt-4">
              {episodesLoading ? (
                <div className="flex justify-center py-8">
                  <div className="w-6 h-6 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                </div>
              ) : (
                <EpisodeList episodes={episodes} />
              )}
            </div>
          </section>
        )}

        {cast.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4">Cast</h2>
            <CastCarousel cast={cast} />
          </section>
        )}
      </div>
    </div>
  );
}
