import Image from "next/image";
import { Trophy, Users } from "lucide-react";
import { BUILDVERSE as C } from "@/config/buildverse";

const eyebrow = "font-tech text-xs font-medium uppercase tracking-[0.18em] text-violet-600 before:mr-2 before:text-violet-400 before:content-['//'] sm:text-sm";
const h2 = "mt-2 font-serif italic text-4xl font-normal tracking-tight text-violet-950 sm:text-5xl lg:text-6xl";
const wrap = "mx-auto w-full max-w-6xl px-4 sm:px-6";

// Teams without a place get the gold accent. With places, the top three use gold / silver / bronze (`medal`) and the rest a plain card.
const CARD = {
  default: "border-amber-300/40 bg-white/[0.07] transition-all duration-300 hover:border-amber-300/70 hover:bg-white/[0.13] hover:shadow-[0_0_32px_-8px_rgba(251,191,36,0.35)] hover:-translate-y-0.5",
  plain: "border-white/15 bg-white/[0.07] transition-all duration-300 hover:border-violet-300/40 hover:bg-white/[0.13] hover:shadow-[0_4px_24px_-6px_rgba(167,139,250,0.3)] hover:-translate-y-0.5",
  gold: "border-amber-300/60 bg-amber-300/10 shadow-[0_0_40px_-12px_rgba(251,191,36,0.55)] transition-all duration-300 hover:border-amber-300/90 hover:bg-amber-300/[0.16] hover:shadow-[0_0_56px_-8px_rgba(251,191,36,0.75)] hover:-translate-y-1",
  silver: "border-slate-200/50 bg-slate-200/10 transition-all duration-300 hover:border-slate-200/80 hover:bg-slate-200/[0.18] hover:shadow-[0_4px_28px_-6px_rgba(226,232,240,0.35)] hover:-translate-y-0.5",
  bronze: "border-orange-300/50 bg-orange-300/10 transition-all duration-300 hover:border-orange-300/80 hover:bg-orange-300/[0.18] hover:shadow-[0_4px_28px_-6px_rgba(251,146,60,0.35)] hover:-translate-y-0.5",
} as const;
const PILL = {
  default: "bg-amber-300 text-violet-950",
  plain: "bg-violet-300 text-violet-950",
  gold: "bg-amber-300 text-violet-950",
  silver: "bg-slate-200 text-violet-950",
  bronze: "bg-orange-300 text-violet-950",
} as const;

/** Shown only after the event: the "concluded" message and the winning teams. */
export function Winners() {
  if (!C.eventConcluded) return null;
  const winners = C.winners;
  return (
    <section id="winners" className="scroll-mt-20 py-16">
      <div className={wrap}>
        <p className={eyebrow}>Event concluded</p>
        <h2 className={h2}>{winners.length > 0 ? "Meet the winning teams." : "Thank you for building with us."}</h2>
        <p className="mt-3 max-w-2xl text-violet-950/75">{C.concludedLine}</p>

        <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-violet-900/40 bg-gradient-to-br from-violet-950 via-indigo-950 to-violet-900 p-5 text-white shadow-2xl shadow-violet-950/30 sm:p-8 lg:p-10">
          <div aria-hidden className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:44px_44px]" />

          <div className="relative">
            <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
              <Image
                src="/buildverse/trophy-gold.webp"
                alt=""
                width={520}
                height={545}
                sizes="(min-width: 640px) 128px, 96px"
                quality={85}
                className="h-auto w-24 shrink-0 drop-shadow-[0_10px_28px_rgba(251,191,36,0.4)] sm:w-32"
              />
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/15 px-3 py-1 font-tech text-xs font-bold uppercase tracking-wider text-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden />Concluded successfully
                </p>
                <h3 className="mt-3 font-poppins text-xl font-bold leading-snug sm:text-2xl">BUILD-VERSE 2026 is a wrap.</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-violet-100/85 sm:text-base">
                  Two days of expert sessions, overnight building and final pitches. Thank you to every participant, speaker and mentor who made it happen.
                </p>
              </div>
            </div>

            {winners.length > 0 ? (
              <ol aria-label="Winning teams" className="mt-8 flex flex-wrap justify-center gap-4">
                {winners.map((w) => (
                  <li key={w.team} className={`w-full rounded-2xl border p-5 backdrop-blur-sm sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.7rem)] ${CARD[w.medal ?? (w.place ? "plain" : "default")]}`}>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${PILL[w.medal ?? (w.place ? "plain" : "default")]}`}>
                      <Trophy className="h-3.5 w-3.5" aria-hidden />{w.place ?? "Winning Team"}
                    </span>
                    <h4 className="mt-3 font-poppins text-xl font-bold leading-snug">{w.team}</h4>
                    {w.project && <p className="mt-1 text-sm font-medium text-violet-100/90">{w.project}</p>}
                    {w.track && <p className="mt-0.5 font-tech text-xs uppercase tracking-wider text-violet-300">{w.track}</p>}
                    <p className="mt-4 flex items-center gap-1.5 font-tech text-xs font-bold uppercase tracking-wider text-violet-300"><Users className="h-3.5 w-3.5" aria-hidden />Team members</p>
                    <ul className="mt-2 space-y-2">
                      {w.members.map((m) => (
                        <li key={m.name} className="leading-snug">
                          <span className="block text-sm font-semibold text-white">
                            {m.name}
                            {m.lead && <span className="ml-2 rounded-full bg-violet-300/20 px-2 py-0.5 align-middle font-tech text-[10px] font-bold uppercase tracking-wider text-violet-200">Team lead</span>}
                          </span>
                          <span className="block text-xs text-violet-200/85">{m.course} · {m.year}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-8 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-sm text-violet-100/90">
                The winning teams will be featured here shortly.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
