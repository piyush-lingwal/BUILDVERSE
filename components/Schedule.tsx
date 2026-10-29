"use client";

import { useSyncExternalStore, type ComponentType } from "react";
import Image from "next/image";
import { ArrowRight, Building2, Check, ClipboardCheck, GraduationCap, Home, Laptop, Lightbulb, Linkedin, MapPin, Monitor, Presentation, Radio, Trophy, User } from "lucide-react";
import { BUILDVERSE as C } from "@/config/buildverse";
import { Mascot } from "./Mascot";
import { UtkrishtLogo } from "./Logos";
import { SubmissionFormButton } from "./SubmissionFormButton";
import { useCurrentTime } from "./useCurrentTime";

type Day = (typeof C.days)[number];
type Step = Day["steps"][number];
type State = "live" | "next" | "done" | "started" | null;

const ICONS: Record<Step["icon"], ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  learn: GraduationCap, idea: Lightbulb, build: Laptop, progress: ClipboardCheck, pitch: Presentation, result: Trophy,
};
// Where each phase happens: the main idea of the event is "Learn at college, Build at home, Pitch at college".
const PLACE_ICON = { college: Building2, home: Home } as const;
const PLACE_CHIP = {
  college: "border-violet-300/40 bg-violet-400/20 text-violet-100",
  home: "border-emerald-300/40 bg-emerald-400/15 text-emerald-200",
} as const;
// Badge colours for the dark panel.
const TONES: Record<Step["badge"]["tone"], string> = {
  neutral: "border-white/15 bg-white/10 text-violet-100",
  info: "border-sky-300/30 bg-sky-400/15 text-sky-200",
  warn: "border-amber-300/30 bg-amber-400/15 text-amber-200",
};

const eyebrow = "font-tech text-xs font-medium uppercase tracking-[0.18em] text-violet-600 before:mr-2 before:text-violet-400 before:content-['//'] sm:text-sm";
const h2 = "mt-2 font-serif italic text-4xl font-normal tracking-tight text-violet-950 sm:text-5xl lg:text-6xl";

// "Now" in the visitor's browser (the page is static). 0 on the server / first render = unknown, so no live UI is drawn.
const useNow = useCurrentTime;

function untilText(ms: number) {
  const m = Math.max(1, Math.round(ms / 60_000));
  const d = Math.floor(m / 1440), h = Math.floor((m % 1440) / 60), mm = m % 60;
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${mm}m`;
  return `${mm}m`;
}

export function Schedule() {
  const now = useNow();
  const flat = C.days.flatMap((d) => d.steps);
  const timed = flat.filter((s) => s.start).map((s) => ({ s, t: Date.parse(s.start!) })).sort((a, b) => a.t - b.t);
  const next = now ? timed.find((x) => x.t > now) : undefined;
  const ends = flat.filter((s) => s.end).map((s) => Date.parse(s.end!));
  const allDone = !!now && ends.length > 0 && now >= Math.max(...ends);

  const stateOf = (s: Step): State => {
    if (!now || !s.start) return null;
    const st = Date.parse(s.start);
    const en = s.end ? Date.parse(s.end) : NaN;
    if (!Number.isNaN(en)) {
      if (now >= st && now < en) return "live";
      if (now >= en) return "done";
    }
    if (Number.isNaN(en) && now >= st) return "started";
    return next && st === next.t ? "next" : null;
  };

  return (
    <section id="timeline" className="scroll-mt-20 py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className={eyebrow}>Event timeline</p>
        <h2 className={h2}>Two days. From learning to pitching.</h2>
        <p className="mt-3 max-w-2xl text-violet-950/75">The complete flow of BUILD-VERSE 2026: Learn at college, build at home, pitch at college. Forms are shared with registered participants at the times below.</p>

        <div className="timeline-card relative mt-10 overflow-hidden rounded-[2rem] border border-violet-900/40 bg-gradient-to-br from-violet-950 via-indigo-950 to-violet-900 p-5 text-white shadow-2xl shadow-violet-950/30 sm:p-8 lg:p-10">
          <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-violet-500/25 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:44px_44px]" />

          <div className="relative">
            {/* Next milestone (browser-side, appears after load) */}
            <div className="min-h-9" aria-live="polite">
              {next ? (
                <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-sm">
                  <Radio className="h-4 w-4 text-emerald-300" aria-hidden />
                  <span className="font-tech text-xs uppercase tracking-wider text-violet-200">Next up</span>
                  <span className="font-semibold">{next.s.title}</span>
                  <span className="text-violet-200">in {untilText(next.t - now)}</span>
                </p>
              ) : allDone ? (
                <p className="inline-flex items-center gap-2 rounded-full border border-violet-300/30 bg-violet-400/15 px-4 py-1.5 text-sm font-semibold text-violet-100">
                  <Trophy className="h-4 w-4 text-amber-300" aria-hidden />{C.resultsLine}
                </p>
              ) : now && timed.length > 0 && timed[timed.length - 1].t <= now ? (
                <p className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/15 px-4 py-1.5 text-sm font-semibold text-emerald-200">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" aria-hidden />Event in progress
                </p>
              ) : null}
            </div>

            {/* The three phases at a glance: the main idea of the event */}
            <ol className="mt-5 grid grid-cols-1 items-stretch gap-2 sm:grid-cols-3 sm:gap-3" aria-label="The three phases">
              {C.phases.map((ph, i) => {
                const PIcon = PLACE_ICON[ph.place];
                return (
                  <li key={ph.n} className="relative flex">
                    <a href={`#phase-${ph.n}`} className="group flex w-full flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition hover:border-violet-300/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-300">
                      <span className="font-tech text-[11px] font-bold uppercase tracking-wider text-violet-300 sm:text-xs">Phase {ph.n}</span>
                      <span className="mt-1 font-poppins text-xl font-semibold leading-snug">{ph.name}</span>
                      <span className={`mt-2 inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${PLACE_CHIP[ph.place]}`}>
                        <PIcon className="h-3.5 w-3.5" aria-hidden />{ph.placeLabel}
                      </span>
                      <span className="mt-auto pt-3 text-xs text-violet-200/80">{ph.when}</span>
                    </a>
                    {i < C.phases.length - 1 && <ArrowRight aria-hidden className="absolute -right-3 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-violet-300 sm:block" />}
                  </li>
                );
              })}
            </ol>

            {/* Detailed route */}
            <ol className="mt-10">
              {C.days.map((d, di) => (
                <li key={d.date}>
                  {/* Day header */}
                  <div className="grid grid-cols-[2.5rem_1fr] gap-x-3 md:grid-cols-[10rem_2.5rem_1fr] md:gap-x-4">
                    <div className="hidden md:block" />
                    <div className="relative flex justify-center">
                      <span aria-hidden className={`absolute bottom-0 left-1/2 w-px -translate-x-1/2 bg-violet-300/40 ${di > 0 ? "top-0" : "top-4"}`} />
                      <span aria-hidden className="relative z-10 mt-3 h-3.5 w-3.5 rotate-45 rounded-[3px] bg-violet-300 shadow-[0_0_16px_4px_rgba(167,139,250,0.55)]" />
                    </div>
                    <div className="relative flex items-end gap-4 pb-5 sm:gap-5">
                      <span aria-hidden className="inline-block bg-gradient-to-b from-white to-violet-300 bg-clip-text font-serif text-7xl italic leading-[0.85] text-transparent pr-3 sm:pr-4 sm:text-8xl">{d.day}</span>
                      <div className="min-w-0 pb-1">
                        <p className="font-tech text-xs font-bold uppercase tracking-[0.2em] text-violet-300">{d.label} · {d.month}</p>
                        <h3 className="mt-1 font-poppins text-xl font-bold leading-snug sm:text-2xl">{d.title}</h3>
                        <p className="mt-0.5 text-sm text-violet-200/85">{d.subtitle}</p>
                        <p className="sr-only">{`${d.day} ${d.month} 2026`}</p>
                      </div>
                      {d.mascot === "pitch" && (
                        <div aria-hidden className="pointer-events-none ml-auto hidden shrink-0 lg:block">
                          <Mascot name="pitch" sizes="200px" className="-mb-6 h-auto w-44 drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]" />
                        </div>
                      )}
                      {d.mascot === "trophy" && (
                        <div aria-hidden className="pointer-events-none ml-auto hidden shrink-0 sm:block">
                          {/* Gold trophy art, cropped and compressed to ~80 KB (the source PNG was 2.2 MB). */}
                          <Image src="/buildverse/trophy-gold.webp" alt="" width={520} height={545} sizes="(min-width: 1024px) 144px, 96px" quality={85} className="-mb-4 h-auto w-24 drop-shadow-[0_10px_28px_rgba(251,191,36,0.35)] lg:w-36" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Steps */}
                  <ol>
                    {d.steps.map((s, si) => {
                      const Icon = ICONS[s.icon];
                      const st = stateOf(s);
                      const lastOverall = di === C.days.length - 1 && si === d.steps.length - 1;
                      const PlaceIcon = s.place ? PLACE_ICON[s.place.kind] : null;
                      return (
                        <li key={s.title} id={s.phase ? `phase-${s.phase}` : undefined} className={`grid scroll-mt-28 grid-cols-[2.5rem_1fr] gap-x-3 md:grid-cols-[10rem_2.5rem_1fr] md:gap-x-4 ${st === "done" ? "opacity-60" : ""}`}>
                          {/* time gutter (desktop) */}
                          <div className="hidden pt-3 text-right md:block">
                            {s.time && <p className="font-tech text-sm font-bold leading-snug text-violet-200">{s.time}</p>}
                            {s.timeNote && <p className="mt-0.5 text-xs text-violet-300/80">{s.timeNote}</p>}
                          </div>
                          {/* spine + node */}
                          <div className="relative flex justify-center">
                            <span aria-hidden className={`absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-violet-300/50 to-violet-300/20 ${lastOverall ? "h-6" : "h-full"}`} />
                            <span className={`relative z-10 mt-2 flex h-10 w-10 items-center justify-center rounded-full border ${st === "live" ? "border-emerald-300 bg-emerald-400 text-violet-950 shadow-[0_0_0_6px_rgba(52,211,153,0.2),0_0_24px_rgba(52,211,153,0.6)]" : st === "next" ? "border-violet-200 bg-violet-500 text-white shadow-[0_0_0_6px_rgba(167,139,250,0.2),0_0_22px_rgba(167,139,250,0.55)]" : "border-violet-300/40 bg-violet-900 text-violet-100"}`}>
                              {st === "done" ? <Check className="h-5 w-5" aria-hidden /> : <Icon className="h-5 w-5" aria-hidden />}
                            </span>
                          </div>
                          {/* card */}
                          <div className="pb-6 sm:pb-7">
                            <div className={`relative rounded-2xl border bg-white/[0.07] p-4 backdrop-blur-sm transition hover:bg-white/[0.1] sm:p-5 ${st === "live" ? "border-emerald-300/50" : "border-white/10"}`}>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 md:hidden">
                                {s.time && <p className="font-tech text-sm font-bold text-violet-200">{s.time}</p>}
                                {s.timeNote && <p className="text-xs text-violet-300/80">{s.timeNote}</p>}
                              </div>
                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className="font-poppins text-lg font-semibold leading-snug sm:text-xl">{s.title}</h4>
                                {st === "live" && <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400 px-2 py-0.5 text-xs font-bold text-violet-950"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-950" aria-hidden />Live now</span>}
                                {st === "next" && <span className="rounded-full bg-violet-400 px-2 py-0.5 text-xs font-bold text-violet-950">Up next</span>}
                                {st === "started" && <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-xs font-bold text-emerald-200">Started</span>}
                                {st === "done" && <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-bold text-violet-200">Done</span>}
                              </div>
                              <p className="mt-2 text-sm leading-relaxed text-violet-100/85">{s.description}</p>
                              <div className="mt-3 flex flex-wrap items-center gap-2">
                                {s.place && PlaceIcon && (
                                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${PLACE_CHIP[s.place.kind]}`}>
                                    <PlaceIcon className="h-3.5 w-3.5" aria-hidden />{s.place.kind === "college" ? "At college" : "At home"} · {s.place.label}
                                  </span>
                                )}
                                <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${TONES[s.badge.tone]}`}>
                                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />{s.badge.text}
                                </span>
                              </div>

                              {/* Time-activated form button */}
                              {s.form && (
                                <div className="mt-4 pt-1">
                                  <SubmissionFormButton
                                    url={s.form.url}
                                    opensAt={s.form.opensAt}
                                    closesAt={s.form.closesAt}
                                    timeLabel={s.form.timeLabel}
                                    buttonLabel={s.form.buttonLabel}
                                    variant="dark"
                                  />
                                </div>
                              )}

                              {/* Speaker Sessions */}
                              {s.sessions && s.sessions.length > 0 && (
                                <div className="mt-5 space-y-3.5 border-t border-white/10 pt-4">
                                  <div className="flex items-center justify-between">
                                    <p className="font-tech text-xs font-semibold uppercase tracking-wider text-violet-300">
                                      Featured Guest Speakers &amp; Sessions
                                    </p>
                                    <span className="rounded-full bg-violet-400/20 px-2 py-0.5 text-[10px] font-semibold text-violet-200">
                                      {s.sessions.length} Sessions
                                    </span>
                                  </div>

                                  <div className="grid gap-3">
                                    {s.sessions.map((session, si) => (
                                      <div
                                        key={si}
                                        className="rounded-xl border border-white/10 bg-white/[0.04] p-3.5 sm:p-4 transition-all duration-200 hover:border-violet-300/30 hover:bg-white/[0.07]"
                                      >
                                        {/* Session Header: Time, Mode, Venue */}
                                        <div className="flex flex-wrap items-center gap-2">
                                          <span className="font-tech text-xs font-bold text-violet-200 sm:text-sm">
                                            {session.time}
                                          </span>
                                          <span
                                            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                                              session.mode === "physical"
                                                ? PLACE_CHIP["college"]
                                                : "border-sky-300/40 bg-sky-400/15 text-sky-200"
                                            }`}
                                          >
                                            {session.mode === "physical" ? (
                                              <>
                                                <Building2 className="h-3 w-3" aria-hidden /> In-person
                                              </>
                                            ) : (
                                              <>
                                                <Monitor className="h-3 w-3" aria-hidden /> Online
                                              </>
                                            )}
                                          </span>
                                          {session.venue && (
                                            <span className="inline-flex items-center gap-1 text-[11px] text-violet-300/80">
                                              <MapPin className="h-3 w-3 text-violet-400" aria-hidden />
                                              {session.venue}
                                            </span>
                                          )}
                                        </div>

                                        {/* Session Title */}
                                        <h5 className="mt-2 font-poppins text-sm font-bold text-white sm:text-base">
                                          {session.title}
                                        </h5>

                                        {/* Speakers */}
                                        <div className="mt-2.5 space-y-2">
                                          {session.speakers.map((sp) => (
                                            <div key={sp.name} className="flex items-start gap-2.5">
                                              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-violet-400/30 bg-violet-900/60 text-violet-200">
                                                <User className="h-3.5 w-3.5" aria-hidden />
                                              </span>
                                              <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-1.5">
                                                  {sp.linkedIn ? (
                                                    <a
                                                      href={sp.linkedIn}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="group/link inline-flex items-center gap-1 font-semibold text-xs sm:text-sm text-white hover:text-sky-300 transition-colors"
                                                    >
                                                      <span>{sp.name}</span>
                                                      <Linkedin className="h-3.5 w-3.5 text-sky-400 transition-transform group-hover/link:scale-110" aria-hidden />
                                                    </a>
                                                  ) : (
                                                    <span className="font-semibold text-xs sm:text-sm text-white">{sp.name}</span>
                                                  )}
                                                  {sp.org && (
                                                    <span className="rounded bg-violet-400/20 px-1.5 py-0.5 text-[10px] font-medium text-violet-200">
                                                      {sp.org}
                                                    </span>
                                                  )}
                                                </div>
                                                <p className="text-[11px] leading-snug text-violet-300/80">
                                                  {sp.role}
                                                </p>
                                                {sp.highlights && sp.highlights.length > 0 && (
                                                  <div className="mt-1 flex flex-wrap gap-1">
                                                    {sp.highlights.map((h, hi) => (
                                                      <span
                                                        key={hi}
                                                        className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] text-violet-200/90"
                                                      >
                                                        {h}
                                                      </span>
                                                    ))}
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          ))}
                                        </div>

                                        {/* What will you learn / Topics */}
                                        {session.topics && session.topics.length > 0 && (
                                          <div className="mt-3 rounded-lg border border-white/5 bg-black/20 p-2.5">
                                            <p className="font-tech text-[10px] font-bold uppercase tracking-wider text-violet-300/90">
                                              What will you learn:
                                            </p>
                                            <ul className="mt-1.5 space-y-1">
                                              {session.topics.map((topic, ti) => (
                                                <li
                                                  key={ti}
                                                  className="flex items-start gap-1.5 text-xs text-violet-200/80 leading-relaxed"
                                                >
                                                  <span
                                                    aria-hidden
                                                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-400"
                                                  />
                                                  <span>{topic}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {C.utkrisht.show && (
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <UtkrishtLogo className="h-16 w-auto" />
            <p className="text-sm text-violet-950/70">{C.utkrisht.text}</p>
          </div>
        )}
      </div>
    </section>
  );
}
