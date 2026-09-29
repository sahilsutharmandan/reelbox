"use client";

import { Suspense } from "react";
import ShowClient from "./ShowClient";

export default function ShowPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      }
    >
      <ShowClient />
    </Suspense>
  );
}
