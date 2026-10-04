"use client";

export default function SeasonTabs({ seasons, activeSeason, onSelect }) {
  return (
    <div className="sticky top-16 z-20 -mx-4 px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide bg-canvas/95 backdrop-blur">
      {seasons.map((season) => (
        <button
          key={season.id}
          onClick={() => onSelect(season)}
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
