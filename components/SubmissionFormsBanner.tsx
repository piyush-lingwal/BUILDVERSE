"use client";

import { useCurrentTime } from "./useCurrentTime";
import { BUILDVERSE as C } from "@/config/buildverse";
import { isFormClickable } from "@/lib/state";
import { ExternalLink, Lock, Lightbulb, ClipboardCheck, Sparkles, Clock } from "lucide-react";

export function SubmissionFormsBanner() {
  const now = useCurrentTime();

  const forms = [
    {
      id: "form-1",
      icon: Lightbulb,
      round: "Round 01",
      title: C.forms.ideaSubmission.name,
      timeLabel: C.forms.ideaSubmission.timeLabel,
      description: "Submit your team's project idea, the problem you are solving, and your proposed solution architecture before building.",
      url: C.forms.ideaSubmission.url,
      opensAt: C.forms.ideaSubmission.opensAt,
      buttonLabel: "Submit Idea (Form 1)",
    },
    {
      id: "form-2",
      icon: ClipboardCheck,
      round: "Round 02",
      title: C.forms.progressReport.name,
      timeLabel: C.forms.progressReport.timeLabel,
      description: "At midnight, report your development progress, prototype demo details, and documentation of work completed so far.",
      url: C.forms.progressReport.url,
      opensAt: C.forms.progressReport.opensAt,
      buttonLabel: "Submit Progress Report (Form 2)",
    },
  ];

  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-violet-200/80 bg-gradient-to-br from-violet-50/90 via-white to-purple-50/50 p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-violet-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-100/80 px-3 py-1 text-xs font-semibold text-violet-800">
            <Sparkles className="h-3.5 w-3.5 text-violet-600" aria-hidden />
            <span>Official Submission Portals</span>
          </div>
          <h3 className="mt-2 text-xl font-bold text-violet-950 sm:text-2xl">
            Round 1 &amp; Round 2 Forms
          </h3>
          <p className="mt-1 text-xs text-violet-900/70 sm:text-sm">
            Links activate and become clickable automatically according to the official event schedule.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {forms.map((f) => {
          const Icon = f.icon;
          const isOpen = now !== 0 && isFormClickable(now, f.opensAt);

          return (
            <div
              key={f.id}
              className={`relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-300 sm:p-6 ${
                isOpen
                  ? "border-emerald-300/80 bg-white shadow-md shadow-emerald-500/5 ring-1 ring-emerald-400/30"
                  : "border-violet-100 bg-white/70"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-violet-100 px-2.5 py-1 text-xs font-semibold text-violet-800">
                    <Icon className="h-3.5 w-3.5 text-violet-600" aria-hidden />
                    {f.round}
                  </span>

                  {isOpen ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                      </span>
                      Live now · Open
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                      <Clock className="h-3 w-3 text-amber-600" aria-hidden />
                      Opens at scheduled time
                    </span>
                  )}
                </div>

                <h4 className="mt-3 text-lg font-bold text-violet-950 sm:text-xl">
                  {f.title}
                </h4>

                <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-violet-700">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  Scheduled: <span className="font-semibold">{f.timeLabel}</span>
                </p>

                <p className="mt-2.5 text-xs leading-relaxed text-violet-950/75 sm:text-sm">
                  {f.description}
                </p>
              </div>

              <div className="mt-6 pt-2">
                {isOpen ? (
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-md shadow-emerald-500/25 transition-all duration-200 hover:bg-emerald-600 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                  >
                    <span>{f.buttonLabel}</span>
                    <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </a>
                ) : (
                  <div
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200/90 bg-violet-50/70 px-5 py-3 text-sm font-medium text-violet-600/70 cursor-not-allowed select-none"
                    title={`This link will be clickable at ${f.timeLabel}`}
                  >
                    <Lock className="h-4 w-4 text-violet-400" aria-hidden />
                    <span>Opens at {f.timeLabel}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
