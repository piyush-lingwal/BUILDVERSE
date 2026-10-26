"use client";

import { useState, type ComponentType } from "react";
import {
  Atom, Blocks, Boxes, Bot, Bus, ChartLine, Cloud, Database,
  GraduationCap, HeartPulse, Leaf, Lightbulb, PanelsTopLeft,
  ScanEye, ShieldCheck, Sparkles, TerminalSquare, Wallet,
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
const h2 = "mt-2 font-serif italic text-4xl font-bold tracking-tight text-violet-950 sm:text-5xl lg:text-6xl";
const chip = "min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600";

export function Tracks() {
  const [active, setActive] = useState<string>("all");
  const total = C.trackCategories.reduce((n, c) => n + c.tracks.length, 0);
  const shown = active === "all" ? C.trackCategories : C.trackCategories.filter((c) => c.id === active);
  let counter = 0;
  const startIndex = new Map<string, number>();
  for (const c of C.trackCategories) {
    startIndex.set(c.id, counter);
    counter += c.tracks.length;
  }

  return (
    <section id="tracks" className="relative scroll-mt-20 py-16">
      <SparkleCluster className="right-4 top-8 lg:right-16" />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className={eyebrow}>Innovation tracks</p>
        <h2 className={h2}>{C.trackTheme.title}</h2>
        <p className="mt-2 font-display text-xl text-violet-700 sm:text-2xl">{C.trackTheme.statement}</p>
        <p className="mt-4 max-w-3xl text-violet-950/75">
          {total} innovation tracks in {C.trackCategories.length} categories. Tracks are not separate competitions: they only help you choose a direction.
          All tracks follow the same competition rules and judging criteria. Projects should demonstrate meaningful software functionality, innovation, practical relevance, and a clear presentation.
        </p>

        <div role="group" aria-label="Filter tracks by category" className="no-scrollbar -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          <button
            type="button"
            aria-pressed={active === "all"}
            onClick={() => setActive("all")}
            className={`${chip} ${active === "all" ? "border-violet-600 bg-violet-600 text-white" : "border-violet-200 bg-white text-violet-900 hover:border-violet-400"}`}
          >
            All {total} tracks
          </button>
          {C.trackCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={active === c.id}
              onClick={() => setActive(c.id)}
              className={`${chip} ${active === c.id ? "border-violet-600 bg-violet-600 text-white" : "border-violet-200 bg-white text-violet-900 hover:border-violet-400"}`}
            >
              {c.name} <span className="opacity-70">({c.tracks.length})</span>
            </button>
          ))}
        </div>

        <div className="mt-10 space-y-12">
          {shown.map((cat) => {
            const ci = C.trackCategories.findIndex((c) => c.id === cat.id);
            return (
              <div key={cat.id} aria-labelledby={`cat-${cat.id}`}>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-3xl font-semibold text-violet-300 sm:text-4xl" aria-hidden>
                    {String(ci + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 id={`cat-${cat.id}`} className="text-xl font-semibold text-violet-950 sm:text-2xl">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-violet-950/70">{cat.hint}</p>
                  </div>
                </div>
                <ul className={`mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 ${cat.tracks.length === 4 ? "xl:grid-cols-4" : cat.tracks.length === 1 ? "" : "lg:grid-cols-3"}`}>
                  {cat.tracks.map((t, i) => {
                    const Icon = ICONS[t.icon] ?? Lightbulb;
                    const n = (startIndex.get(cat.id) ?? 0) + i + 1;
                    return (
                      <li
                        key={t.title}
                        className={`track-card rounded-2xl border border-violet-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-md ${cat.tracks.length === 1 ? "md:col-span-2 lg:col-span-3 xl:col-span-4" : ""}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                            <Icon className="h-6 w-6" aria-hidden />
                          </span>
                          <span className="font-display text-sm font-semibold text-violet-400">
                            Track {String(n).padStart(2, "0")}
                          </span>
                        </div>
                        <h4 className="mt-3 font-display text-lg font-medium leading-snug text-violet-950">{t.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-violet-950/75">{t.description}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-10 rounded-2xl border border-violet-200 bg-violet-50 px-5 py-4 text-sm text-violet-900">
          <strong className="font-semibold">Not sure where your idea fits?</strong> Choose Open Innovation. It stays open for any original software project outside the listed tracks.
        </p>
      </div>
    </section>
  );
}
