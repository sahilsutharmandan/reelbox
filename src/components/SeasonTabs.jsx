"use client";

export default function SeasonTabs({ seasons, activeSeason, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {seasons.map((season) => (
        <button
          key={season.id}
          onClick={() => onSelect(season)}
          aria-pressed={activeSeason?.id === season.id}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
            activeSeason?.id === season.id
              ? "bg-primary text-white"
              : "bg-gray-100 text-ink hover:bg-gray-200"
          }`}
        >
          Season {season.number}
        </button>
      ))}
    </div>
  );
}
