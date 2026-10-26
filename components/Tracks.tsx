"use client";

import { useState, type ComponentType } from "react";
import {
  Atom, Blocks, Boxes, Bot, Bus, ChartLine, Cloud, Database,
  GraduationCap, HeartPulse, Leaf, Lightbulb, PanelsTopLeft,
  ScanEye, Search, ShieldCheck, Sparkles, TerminalSquare, Wallet, X,
} from "lucide-react";
import { BUILDVERSE as C } from "@/config/buildverse";
import { SparkleCluster } from "./Decor";

const ICONS: Record<string, ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  bot: Bot,
  sparkles: Sparkles,
  eye: ScanEye,
  chart: ChartLine,
  atom: Atom,
  shield: ShieldCheck,
  boxes: Boxes,
  blocks: Blocks,
  cloud: Cloud,
  terminal: TerminalSquare,
  database: Database,
  wallet: Wallet,
  heart: HeartPulse,
  leaf: Leaf,
  graduation: GraduationCap,
  panels: PanelsTopLeft,
  bus: Bus,
  lightbulb: Lightbulb,
};

const eyebrow = "font-tech text-xs font-medium uppercase tracking-[0.18em] text-violet-600 before:mr-2 before:text-violet-400 before:content-['//'] sm:text-sm";
const h2 = "mt-2 font-serif italic text-4xl font-normal tracking-tight text-violet-950 sm:text-5xl lg:text-6xl";

export function Tracks() {
  const [active, setActive] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const total = C.trackCategories.reduce((n, c) => n + c.tracks.length, 0);

  let counter = 0;
  const startIndex = new Map<string, number>();
  for (const c of C.trackCategories) {
    startIndex.set(c.id, counter);
    counter += c.tracks.length;
  }

  const q = searchQuery.trim().toLowerCase();
  const filteredCategories = C.trackCategories
    .map((cat) => {
      const isCatMatch = active === "all" || active === cat.id;
      if (!isCatMatch) return { ...cat, tracks: [] };
      if (!q) return cat;
      const matchingTracks = cat.tracks.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          cat.name.toLowerCase().includes(q)
      );
      return { ...cat, tracks: matchingTracks };
    })
    .filter((cat) => cat.tracks.length > 0);

  const visibleTrackCount = filteredCategories.reduce((sum, c) => sum + c.tracks.length, 0);

  return (
    <section id="tracks" className="relative scroll-mt-20 py-16">
      <SparkleCluster className="right-4 top-8 lg:right-16" />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Header with Stats */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className={eyebrow}>Innovation tracks</p>
            <h2 className={h2}>{C.trackTheme.title}</h2>
            <p className="mt-2 font-poppins text-xl font-semibold text-violet-700 sm:text-2xl">{C.trackTheme.statement}</p>
            <p className="mt-3 text-base leading-relaxed text-violet-950/75">
              Explore {total} tracks across {C.trackCategories.length} domains. Tracks guide your concept direction, but all tracks follow the exact same competition rules, scoring criteria, and presentation standards.
            </p>
          </div>
          <div className="hidden lg:flex flex-col items-end gap-1.5 shrink-0">
            <div className="flex items-center gap-2 rounded-2xl bg-white/80 p-2 border border-violet-200/70 shadow-sm backdrop-blur-sm">
              <div className="rounded-xl bg-violet-100/80 px-3 py-1.5 text-center">
                <span className="block font-poppins text-xl font-bold text-violet-700">{total}</span>
                <span className="block font-tech text-[10px] uppercase tracking-wider text-violet-900/60 font-semibold">Tracks</span>
              </div>
              <div className="rounded-xl bg-violet-100/80 px-3 py-1.5 text-center">
                <span className="block font-poppins text-xl font-bold text-violet-700">{C.trackCategories.length}</span>
                <span className="block font-tech text-[10px] uppercase tracking-wider text-violet-900/60 font-semibold">Categories</span>
              </div>
              <div className="rounded-xl bg-violet-100/80 px-3 py-1.5 text-center">
                <span className="block font-poppins text-xl font-bold text-violet-700">1</span>
                <span className="block font-tech text-[10px] uppercase tracking-wider text-violet-900/60 font-semibold">Rubric</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-10 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Live Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-400" aria-hidden />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tracks, topics, tech (e.g. AI, health, web3)..."
                className="w-full rounded-2xl border border-violet-200/80 bg-white/90 pl-10 pr-9 py-2.5 text-sm text-violet-950 placeholder-violet-950/40 shadow-xs transition focus:border-violet-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-violet-400 hover:bg-violet-100 hover:text-violet-700 transition cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Track Counter & Reset */}
            <div className="flex items-center gap-2 text-xs font-tech text-violet-900/70 self-end sm:self-center">
              <span>Showing <strong>{visibleTrackCount}</strong> of {total} tracks</span>
              {(active !== "all" || searchQuery) && (
                <button
                  type="button"
                  onClick={() => { setActive("all"); setSearchQuery(""); }}
                  className="text-violet-600 hover:text-violet-800 underline font-semibold ml-1 cursor-pointer"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div
            role="group"
            aria-label="Filter tracks by category"
            className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            <button
              type="button"
              aria-pressed={active === "all"}
              onClick={() => setActive("all")}
              className={`min-h-10 shrink-0 inline-flex items-center gap-2 rounded-full px-4 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                active === "all"
                  ? "bg-violet-700 text-white shadow-md shadow-violet-700/25 ring-2 ring-violet-700/30"
                  : "bg-white/80 text-violet-900 border border-violet-200/80 hover:bg-violet-50 hover:border-violet-300"
              }`}
            >
              <span>All Tracks</span>
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-tech font-bold ${active === "all" ? "bg-white/25 text-white" : "bg-violet-100 text-violet-700"}`}>
                {total}
              </span>
            </button>
            {C.trackCategories.map((c) => {
              const isSelected = active === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setActive(c.id)}
                  className={`min-h-10 shrink-0 inline-flex items-center gap-2 rounded-full px-4 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-violet-700 text-white shadow-md shadow-violet-700/25 ring-2 ring-violet-700/30"
                      : "bg-white/80 text-violet-900 border border-violet-200/80 hover:bg-violet-50 hover:border-violet-300"
                  }`}
                >
                  <span>{c.name}</span>
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-tech font-bold ${isSelected ? "bg-white/25 text-white" : "bg-violet-100 text-violet-700"}`}>
                    {c.tracks.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories and Track Cards */}
        {filteredCategories.length > 0 ? (
          <div className="mt-10 space-y-14">
            {filteredCategories.map((cat) => {
              const ci = C.trackCategories.findIndex((c) => c.id === cat.id);
              return (
                <div key={cat.id} aria-labelledby={`cat-${cat.id}`}>
                  {/* Category Header */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 border-b border-violet-200/60 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 font-tech text-xs font-bold text-violet-700 border border-violet-200/70" aria-hidden>
                        {String(ci + 1).padStart(2, "0")}
                      </span>
                      <h3 id={`cat-${cat.id}`} className="font-poppins text-xl sm:text-2xl font-bold text-violet-950">
                        {cat.name}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-violet-950/65 font-medium pl-11 sm:pl-0">{cat.hint}</p>
                  </div>

                  {/* Cards Grid */}
                  <ul className={`mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 ${cat.tracks.length === 4 ? "xl:grid-cols-4" : cat.tracks.length === 1 ? "" : "lg:grid-cols-3"}`}>
                    {cat.tracks.map((t) => {
                      const Icon = ICONS[t.icon] ?? Lightbulb;
                      const origCat = C.trackCategories.find((c) => c.id === cat.id);
                      const origIndex = origCat ? origCat.tracks.findIndex((tr) => tr.title === t.title) : 0;
                      const n = (startIndex.get(cat.id) ?? 0) + origIndex + 1;
                      const isOpenInnovation = t.title.toLowerCase().includes("open innovation");

                      return (
                        <li
                          key={t.title}
                          className={`track-card group relative rounded-3xl border ${
                            isOpenInnovation
                              ? "border-amber-200/80 bg-gradient-to-br from-amber-50/40 via-white to-violet-50/30"
                              : "border-violet-100/90 bg-white"
                          } p-1.5 shadow-[0_4px_24px_-6px_rgba(46,16,101,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-300 hover:shadow-[0_20px_40px_-10px_rgba(109,40,217,0.14)] ${
                            cat.tracks.length === 1 ? "md:col-span-2 lg:col-span-3 xl:col-span-4" : ""
                          }`}
                        >
                          <div className="flex h-full flex-col rounded-[1.35rem] bg-gradient-to-b from-white via-white to-violet-50/20 p-5 sm:p-6">
                            <div className="flex items-start justify-between gap-3">
                              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                                isOpenInnovation
                                  ? "bg-amber-100/80 text-amber-700 border border-amber-200"
                                  : "bg-gradient-to-br from-violet-100 to-indigo-100 text-violet-700 border border-violet-200/60"
                              } shadow-xs transition-transform duration-300 group-hover:scale-105`}>
                                <Icon className="h-6 w-6" aria-hidden />
                              </div>
                              <span className="font-tech text-xs font-bold text-violet-600 bg-violet-100/70 border border-violet-200/60 px-2.5 py-1 rounded-full group-hover:bg-violet-200/70 transition-colors">
                                Track {String(n).padStart(2, "0")}
                              </span>
                            </div>

                            <h4 className="mt-4 font-poppins text-lg font-semibold leading-snug text-violet-950 group-hover:text-violet-700 transition-colors">
                              {t.title}
                            </h4>
                            <p className="mt-2 text-sm leading-relaxed text-violet-950/75">
                              {t.description}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="mt-12 rounded-3xl border border-violet-200/70 bg-white/90 p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-poppins text-xl font-bold text-violet-950">
              No tracks matching &ldquo;{searchQuery}&rdquo;
            </h3>
            <p className="mt-2 text-sm text-violet-950/70 max-w-md mx-auto">
              We couldn&apos;t find an exact track match for that search. You can build any original software product under <strong>Open Innovation</strong>!
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="rounded-xl border border-violet-300 bg-white px-4 py-2 text-sm font-semibold text-violet-800 hover:bg-violet-50 cursor-pointer"
              >
                Clear Search
              </button>
              <button
                type="button"
                onClick={() => { setSearchQuery(""); setActive("open"); }}
                className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 cursor-pointer"
              >
                View Open Innovation
              </button>
            </div>
          </div>
        )}

        {/* Open Innovation Featured Banner */}
        <div className="mt-14 relative overflow-hidden rounded-3xl border border-violet-200/60 bg-gradient-to-br from-violet-950 via-indigo-950 to-violet-900 p-6 sm:p-8 text-white shadow-xl">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" aria-hidden />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-tech font-semibold text-amber-300 backdrop-blur-xs border border-white/15">
              <Lightbulb className="h-3.5 w-3.5" aria-hidden />
              Not bound by a single track?
            </div>
            <h3 className="mt-3 font-poppins text-xl sm:text-2xl font-bold text-white">
              Build Outside the Box with Open Innovation
            </h3>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-violet-100/85">
              If your project spans multiple disciplines or tackles a completely novel challenge, choose <strong className="text-white">Track 18: Open Innovation</strong>. All submissions are judged strictly on innovation, technical depth, real-world utility, and presentation quality — tracks never restrict your ambition.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
