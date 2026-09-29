"use client";

import { useQuery } from "@tanstack/react-query";
import { getSchedule } from "@/lib/api";
import { todayDate, formatDate } from "@/lib/format";
import ScheduleCard from "@/components/ScheduleCard";

export default function SchedulePage() {
  const today = todayDate();

  const { data: schedule, isLoading } = useQuery({
    queryKey: ["schedule", today],
    queryFn: () => getSchedule(today),
  });

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-ink mb-1">Today&apos;s Schedule</h1>
        <p className="text-muted">{formatDate(today)}</p>
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

      {schedule && schedule.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {schedule.map((entry) => (
            <ScheduleCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </main>
  );
}
