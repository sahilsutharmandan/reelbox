"use client";

import { Suspense } from "react";
import WatchlistClient from "./WatchlistClient";

export default function WatchlistPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      }
    >
      <WatchlistClient />
    </Suspense>
  );
}
