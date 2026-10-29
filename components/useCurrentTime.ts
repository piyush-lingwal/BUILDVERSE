"use client";

import { useSyncExternalStore } from "react";

function subscribe(cb: () => void) {
  // Check every 10 seconds so transitions (e.g. at 6:00 PM or midnight) flip accurately in real-time
  const id = setInterval(cb, 10_000);
  return () => clearInterval(id);
}

const getSnapshot = () => Date.now();
// Server / hydration snapshot: returns 0 so SSR and initial client hydration match safely
const getServerSnapshot = () => 0;

export function useCurrentTime(): number {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
