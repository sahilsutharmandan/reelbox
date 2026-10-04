"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const seasonParam = searchParams.get("season");
  const [inWatchlist, setInWatchlist] = useState(false);

  const { data: show, isLoading } = useQuery({
    queryKey: ["show", id],
    queryFn: () => getShow(id),
    enabled: !!id,
  });

  const seasons = useMemo(() => show?._embedded?.seasons || [], [show]);
  const cast = show?._embedded?.cast || [];

  const activeSeason =
    seasons.find((s) => String(s.number) === seasonParam) ||
    seasons[0] ||
    null;

  function handleSelectSeason(season) {
    router.push(`/show?id=${id}&season=${season.number}`, { scroll: false });
  }

  useEffect(() => {
    if (id) {
      setInWatchlist(isInWatchlist(Number(id)));
    }
  }, [id]);

  const {
    data: episodes,
    isLoading: episodesLoading,
    isFetching: episodesFetching,
  } = useQuery({
    queryKey: ["episodes", activeSeason?.id],
    queryFn: () => getEpisodesBySeason(activeSeason.id),
    enabled: !!activeSeason,
    placeholderData: keepPreviousData,
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
            <div
              className="text-muted leading-relaxed [&>p]:mb-2"
              dangerouslySetInnerHTML={{ __html: show.summary }}
            />
          </section>
        )}

        {seasons.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4">Episodes</h2>
            <SeasonTabs
              seasons={seasons}
              activeSeason={activeSeason}
              onSelect={handleSelectSeason}
            />
            <div className="mt-4 min-h-[200px]">
              {!episodes && episodesLoading ? (
                <div className="flex justify-center py-8">
                  <div className="w-6 h-6 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                </div>
              ) : (
                <div className={episodesFetching ? "opacity-60 transition-opacity" : "transition-opacity"}>
                  <EpisodeList episodes={episodes} />
                </div>
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
