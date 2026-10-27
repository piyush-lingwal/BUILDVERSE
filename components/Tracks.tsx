"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { ArrowRight, Atom, Blocks, Boxes, Bot, BrainCircuit, Bus, ChartLine, ChevronLeft, ChevronRight, Cloud, Database, GraduationCap, HeartHandshake, HeartPulse, Layers, Leaf, Lightbulb, PanelsTopLeft, Rocket, ScanEye, ShieldCheck, Sparkles, TerminalSquare, Wallet, X } from "lucide-react";
import { BUILDVERSE as C } from "@/config/buildverse";
import { SparkleCluster } from "./Decor";

type Icon = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

const TRACK_ICONS: Record<string, Icon> = {
  bot: Bot, sparkles: Sparkles, eye: ScanEye, chart: ChartLine, atom: Atom, shield: ShieldCheck, boxes: Boxes, blocks: Blocks,
  cloud: Cloud, terminal: TerminalSquare, database: Database, wallet: Wallet, heart: HeartPulse, leaf: Leaf,
  graduation: GraduationCap, panels: PanelsTopLeft, bus: Bus, lightbulb: Lightbulb,
};
const CAT_ICONS: Record<string, Icon> = { brain: BrainCircuit, rocket: Rocket, layers: Layers, heart: HeartHandshake, lightbulb: Lightbulb };

// One accent per theme, all inside the brand's violet family (Open Innovation gets the warm highlight).
const ACCENT: Record<string, string> = {
  ai: "from-violet-600 to-indigo-500",
  future: "from-fuchsia-500 to-violet-600",
  software: "from-indigo-600 to-sky-500",
  impact: "from-violet-500 to-pink-500",
  open: "from-amber-400 to-orange-500",
};

const eyebrow = "font-tech text-xs font-medium uppercase tracking-[0.18em] text-violet-600 before:mr-2 before:text-violet-400 before:content-['//'] sm:text-sm";
const h2 = "mt-2 font-serif italic text-4xl font-normal tracking-tight text-violet-950 sm:text-5xl lg:text-6xl";

export function Tracks() {
  const cats = C.trackCategories;
  const total = cats.reduce((n, c) => n + c.tracks.length, 0);
  const [openId, setOpenId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const idx = cats.findIndex((c) => c.id === openId);
  const cat = idx >= 0 ? cats[idx] : null;

  // Open/close the native <dialog>: it gives focus trapping, Esc and an inert page for free.
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (openId && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    if (!openId && d.open) d.close();
    if (openId) bodyRef.current?.scrollTo({ top: 0 });
  }, [openId]);

  useEffect(() => () => { document.documentElement.style.overflow = ""; }, []);

  const openIdRef = useRef<string | null>(null);
  openIdRef.current = openId;
  const onClosed = () => {
    document.documentElement.style.overflow = "";
    // Give focus back to the card of the theme that was open last (it may differ from the one clicked).
    const back = document.querySelector<HTMLElement>(`#tracks [data-cat="${openIdRef.current}"]`) ?? opener.current;
    setOpenId(null);
    back?.focus();
  };

  const go = (d: number) => setOpenId(cats[(idx + d + cats.length) % cats.length].id);

  return (
    <section id="tracks" className="relative scroll-mt-20 py-16">
      <SparkleCluster className="right-4 top-8 lg:right-16" />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className={eyebrow}>Innovation tracks</p>
        <h2 className={h2}>{C.trackTheme.title}</h2>
        <p className="mt-2 font-display text-xl text-violet-700 sm:text-2xl">{C.trackTheme.statement}</p>
        <p className="mt-4 max-w-3xl text-violet-950/75">
          {total} innovation tracks across {cats.length} themes. Pick the theme that fits your idea, then open it to see its tracks.
          Tracks are not separate competitions: all of them follow the same rules and judging criteria.
        </p>

        <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
          {cats.map((c, i) => {
            const Icon = CAT_ICONS[c.icon] ?? Lightbulb;
            const wide = i >= 3; // 3 + 2 layout on desktop
            return (
              <li key={c.id} className={`track-card ${wide ? "lg:col-span-3" : "lg:col-span-2"} ${i === cats.length - 1 ? "md:col-span-2" : ""}`}>
                <button
                  type="button"
                  onClick={(e) => { opener.current = e.currentTarget; setOpenId(c.id); }}
                  data-cat={c.id}
                  aria-haspopup="dialog"
                  aria-label={`${c.name}: ${c.tracks.length} ${c.tracks.length === 1 ? "track" : "tracks"}. Open details`}
                  className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-violet-100 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                >
                  <span aria-hidden className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${ACCENT[c.id]} opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-25`} />
                  <div className="flex items-start justify-between gap-3">
                    <span className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${ACCENT[c.id]} text-white shadow-lg shadow-violet-500/20`}><Icon className="h-7 w-7" aria-hidden /></span>
                    <span className="font-display text-4xl font-semibold leading-none text-violet-200" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold leading-snug text-violet-950 sm:text-2xl">{c.name}</h3>
                  <p className="mt-1 text-sm text-violet-950/70">{c.hint}</p>
                  <ul className={`mt-4 flex-wrap gap-1.5 ${c.tracks.length > 1 ? "flex" : "hidden"}`} aria-hidden>
                    {c.tracks.slice(0, 4).map((t) => (
                      <li key={t.title} className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-800">{t.title.split(" & ")[0]}</li>
                    ))}
                    {c.tracks.length > 4 && <li className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-800">+{c.tracks.length - 4} more</li>}
                  </ul>
                  <span className="mt-auto flex items-center justify-between pt-6 text-sm font-semibold text-violet-700">
                    <span className="font-tech text-xs uppercase tracking-[0.14em] text-violet-500">{c.tracks.length} {c.tracks.length === 1 ? "track" : "tracks"}</span>
                    <span className="inline-flex items-center gap-1.5 group-hover:text-violet-900">Explore tracks <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 rounded-2xl border border-violet-200 bg-violet-50 px-5 py-4 text-sm text-violet-900">
          <strong className="font-semibold">Not sure where your idea fits?</strong> Choose Open Innovation. It stays open for any original software project outside the listed tracks.
        </p>
      </div>

      <dialog
        ref={dialogRef}
        data-lenis-prevent
        aria-labelledby="track-dialog-title"
        onClose={onClosed}
        onClick={(e) => { if (e.target === dialogRef.current) dialogRef.current?.close(); }}
        className="bv-dialog"
      >
        {cat && (
          <div className="flex max-h-[inherit] min-h-0 flex-col">
            <header className="relative shrink-0 border-b border-violet-100 px-5 pb-4 pt-5 sm:px-8 sm:pt-7">
              <div className="flex items-start gap-4">
                {(() => { const I = CAT_ICONS[cat.icon] ?? Lightbulb; return <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${ACCENT[cat.id]} text-white shadow-lg shadow-violet-500/20 sm:h-14 sm:w-14`}><I className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden /></span>; })()}
                <div className="min-w-0 flex-1 pr-12">
                  <p className="font-tech text-xs uppercase tracking-[0.18em] text-violet-500">Theme {String(idx + 1).padStart(2, "0")} of {String(cats.length).padStart(2, "0")} · {cat.tracks.length} {cat.tracks.length === 1 ? "track" : "tracks"}</p>
                  <h3 id="track-dialog-title" className="mt-1 text-xl font-semibold leading-snug text-violet-950 sm:text-3xl">{cat.name}</h3>
                  <p className="mt-1 text-sm text-violet-950/70">{cat.hint}</p>
                </div>
              </div>
              <button type="button" onClick={() => dialogRef.current?.close()} aria-label="Close" className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-violet-800 transition hover:bg-violet-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-600 sm:right-5 sm:top-5">
                <X className="h-5 w-5" aria-hidden />
              </button>
            </header>

            <div ref={bodyRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-8 sm:py-6">
              <ul className={`grid gap-4 ${cat.tracks.length === 1 ? "" : "sm:grid-cols-2"}`}>
                {cat.tracks.map((t, i) => {
                  const Icon = TRACK_ICONS[t.icon] ?? Lightbulb;
                  const n = cats.slice(0, idx).reduce((a, c) => a + c.tracks.length, 0) + i + 1;
                  return (
                    <li key={t.title} className="rounded-2xl border border-violet-100 bg-violet-50/50 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-violet-700 shadow-sm"><Icon className="h-6 w-6" aria-hidden /></span>
                        <span className="font-tech text-xs font-medium uppercase tracking-[0.14em] text-violet-400">Track {String(n).padStart(2, "0")}</span>
                      </div>
                      <h4 className="mt-3 font-display text-lg font-semibold leading-snug text-violet-950">{t.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-violet-950/75">{t.description}</p>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-5 text-xs text-violet-950/60">All tracks follow the same competition rules and judging criteria. Projects should demonstrate meaningful software functionality, innovation, practical relevance, and a clear presentation.</p>
            </div>

            <footer className="flex shrink-0 items-center justify-between gap-2 border-t border-violet-100 px-3 py-3 sm:px-6">
              <button type="button" onClick={() => go(-1)} className="inline-flex min-h-11 items-center gap-1 rounded-xl px-3 text-sm font-semibold text-violet-800 hover:bg-violet-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-600">
                <ChevronLeft className="h-4 w-4" aria-hidden /><span className="sm:hidden">Prev</span><span className="hidden max-w-[16rem] truncate sm:inline">{cats[(idx - 1 + cats.length) % cats.length].name}</span>
              </button>
              <button type="button" onClick={() => go(1)} className="inline-flex min-h-11 items-center gap-1 rounded-xl px-3 text-sm font-semibold text-violet-800 hover:bg-violet-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-600">
                <span className="sm:hidden">Next</span><span className="hidden max-w-[16rem] truncate sm:inline">{cats[(idx + 1) % cats.length].name}</span><ChevronRight className="h-4 w-4" aria-hidden />
              </button>
            </footer>
          </div>
        )}
      </dialog>
    </section>
  );
}
