"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSchedule } from "@/lib/api";
import { todayDate, formatDate, formatTime } from "@/lib/format";
import ScheduleCard from "@/components/ScheduleCard";

function groupByTime(entries) {
  const slots = {};
  for (const entry of entries) {
    const label = entry.airtime ? formatTime(entry.airtime) : "Time TBA";
    if (!slots[label]) slots[label] = [];
    slots[label].push(entry);
  }
  return Object.keys(slots).map((label) => ({ label, entries: slots[label] }));
}

export default function SchedulePage() {
  const today = todayDate();
  const [hideNews, setHideNews] = useState(false);

  const { data: schedule, isLoading } = useQuery({
    queryKey: ["schedule", today],
    queryFn: () => getSchedule(today),
  });

  const slots = useMemo(() => groupByTime(schedule || []), [schedule]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ink mb-1">
            Today&apos;s Schedule
          </h1>
          <p className="text-muted">{formatDate(today)}</p>
        </div>
        <label className="flex items-center gap-2 text-sm text-muted cursor-pointer select-none">
          <input
            type="checkbox"
            checked={hideNews}
            onChange={(e) => setHideNews(e.target.checked)}
            className="w-4 h-4 accent-primary"
          />
          Hide news
        </label>
      </div>

      {isLoading && (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {schedule && schedule.length === 0 && (
        <p className="text-center text-muted py-12">
          No shows scheduled for today.
        </p>
      )}

      <div className="space-y-10">
        {slots.map((slot) => {
          const entries = hideNews
            ? slot.entries.filter((entry) => entry.show.type !== "News")
            : slot.entries;
          if (entries.length === 0) return null;

          return (
            <section key={slot.label}>
              <h2 className="flex items-baseline gap-3 text-xl font-bold text-ink mb-4 pb-2 border-b border-gray-200 dark:border-white/10">
                {slot.label}
                <span className="text-sm font-normal text-muted">
                  {entries.length}{" "}
                  {entries.length === 1 ? "show" : "shows"}
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {entries.map((entry) => (
                  <ScheduleCard key={entry.id} entry={entry} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
