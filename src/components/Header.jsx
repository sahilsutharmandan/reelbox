"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getWatchlist, WATCHLIST_EVENT } from "@/lib/storage";

const links = [
  { href: "/", label: "Search" },
  { href: "/schedule", label: "Schedule" },
  { href: "/watchlist", label: "Watchlist" },
];

export default function Header() {
  const pathname = usePathname();
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const sync = () => setSavedCount(getWatchlist().length);
    sync();
    window.addEventListener(WATCHLIST_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(WATCHLIST_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-gray-100 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          ReelBox
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition ${
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:text-ink hover:bg-gray-100 dark:hover:bg-white/10"
              }`}
            >
              {link.label}
              {link.href === "/watchlist" && savedCount > 0 && (
                <span className="min-w-[1.25rem] h-5 px-1.5 rounded-full bg-primary text-white text-xs font-semibold leading-5 text-center">
                  {savedCount}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
