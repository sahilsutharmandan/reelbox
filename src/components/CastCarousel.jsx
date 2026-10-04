"use client";

export default function CastCarousel({ cast }) {
  if (!cast || cast.length === 0) return null;

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4" style={{ minWidth: "min-content" }}>
        {cast.map((member) => (
          <div
            key={`${member.person.id}-${member.character.id}`}
            className="flex-shrink-0 w-36 text-center"
          >
            {member.person.image?.medium ? (
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden ring-2 ring-primary/20 shadow-card">
                <img
                  src={member.person.image.medium}
                  alt={member.person.name}
                  loading="lazy"
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="w-28 h-28 rounded-full mx-auto bg-gray-200 dark:bg-white/10 flex items-center justify-center text-muted text-xs">
                No Photo
              </div>
            )}
            <p className="font-semibold text-ink text-sm mt-2 leading-tight">
              {member.person.name}
            </p>
            <p className="text-muted text-xs mt-0.5 leading-tight">
              {member.character.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
