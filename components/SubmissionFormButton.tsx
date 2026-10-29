"use client";

import { ExternalLink, Lock } from "lucide-react";
import { useCurrentTime } from "./useCurrentTime";
import { isFormClickable } from "@/lib/state";

export interface SubmissionFormButtonProps {
  url: string;
  opensAt: string;
  closesAt?: string;
  timeLabel: string;
  buttonLabel: string;
  variant?: "dark" | "light";
  className?: string;
}

export function SubmissionFormButton({
  url,
  opensAt,
  closesAt,
  timeLabel,
  buttonLabel,
  variant = "dark",
  className = "",
}: SubmissionFormButtonProps) {
  const now = useCurrentTime();
  const open = now !== 0 && isFormClickable(now, opensAt, closesAt);

  if (open) {
    if (variant === "dark") {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2 text-xs font-bold text-violet-950 shadow-md shadow-emerald-400/25 transition-all duration-200 hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-400/35 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 sm:text-sm ${className}`}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-950 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-950" />
          </span>
          <span>{buttonLabel}</span>
          <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </a>
      );
    }

    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-violet-600/25 transition-all duration-200 hover:bg-violet-700 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:text-sm ${className}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
        </span>
        <span>{buttonLabel}</span>
        <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </a>
    );
  }

  // Not yet open / locked according to time
  if (variant === "dark") {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-medium text-violet-200/60 cursor-not-allowed select-none ${className}`}
        title={`Link becomes clickable at ${timeLabel}`}
      >
        <Lock className="h-3.5 w-3.5 text-violet-300/60" aria-hidden />
        <span>Opens at {timeLabel}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-xl border border-violet-200/80 bg-violet-50/70 px-4 py-2.5 text-xs font-medium text-violet-600/70 cursor-not-allowed select-none sm:text-sm ${className}`}
      title={`Link becomes clickable at ${timeLabel}`}
    >
      <Lock className="h-3.5 w-3.5 text-violet-400" aria-hidden />
      <span>Opens at {timeLabel}</span>
    </span>
  );
}
