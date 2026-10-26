"use client";

import { useEffect, useState } from "react";
import { countdownParts, registrationState } from "@/lib/state";

const two = (n: number) => String(n).padStart(2, "0");

export function Countdown({ deadline }: { deadline: string }) {
  // null until mounted: server and first client render match, no hydration warning.
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const closed = now !== null && registrationState(now, deadline) === "closed";
  const parts = countdownParts(now ?? Date.parse(deadline), deadline);
  const cells: [string, number][] = [["Days", parts.days], ["Hours", parts.hours], ["Minutes", parts.minutes], ["Seconds", parts.seconds]];

  if (closed) {
    return <p className="rounded-xl border border-violet-200 bg-white/80 px-4 py-3 text-sm font-semibold text-violet-900">Registration is closed.</p>;
  }
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-violet-200 bg-white/80 p-3 backdrop-blur" aria-label="Time left to register">
      <span className="px-1 text-sm font-semibold leading-tight text-violet-700">Registration<br />closes in</span>
      <div className="flex gap-2" aria-live="off">
        {cells.map(([label, value]) => (
          <div key={label} className="min-w-[58px] rounded-lg border border-violet-100 bg-white px-2 py-1.5 text-center shadow-sm">
            <div className="text-xl font-bold tabular-nums text-violet-950">{now === null ? "--" : two(value)}</div>
            <div className="text-xs text-violet-600">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
