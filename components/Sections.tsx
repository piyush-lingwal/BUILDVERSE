import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Trophy, Building2, Home as HomeIcon, BookOpen, Code2, Presentation, Leaf, HeartPulse, Cpu, Mail, Phone, MessageCircle, Award } from "lucide-react";
import { BUILDVERSE as C } from "@/config/buildverse";
import { RegisterButton } from "./RegisterButton";
import { Mascot } from "./Mascot";
import { Countdown } from "./Countdown";
import { SparkleCluster } from "./Decor";
import { SbgLogo, BuildVerseLogo, UtkrishtLogo, UtkrishtLogoWhite, KiroLogo, KiroGhost } from "./Logos";

const eyebrow = "font-tech text-xs font-medium uppercase tracking-[0.18em] text-violet-600 before:mr-2 before:text-violet-400 before:content-['//'] sm:text-sm";
const h2 = "mt-2 font-serif italic text-4xl font-normal tracking-tight text-violet-950 sm:text-5xl lg:text-6xl";
const wrap = "mx-auto w-full max-w-6xl px-4 sm:px-6";


const card = "rounded-2xl border border-violet-100 bg-white shadow-sm";

export function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`section-divider relative w-full py-1 ${className}`} aria-hidden="true">
      {/* Full-width subtle boundary line */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-violet-200/60" />
      </div>
      {/* Central stylized accent */}
      <div className="relative mx-auto flex max-w-6xl items-center px-4 sm:px-6">
        <div className="section-divider-line h-0.5 flex-1 origin-right bg-gradient-to-r from-transparent via-violet-300 to-violet-500" />
        <div className="mx-4 flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-violet-400" />
          <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-violet-600 shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
          <span className="h-1 w-1 rounded-full bg-violet-400" />
        </div>
        <div className="section-divider-line h-0.5 flex-1 origin-left bg-gradient-to-r from-violet-500 via-violet-300 to-transparent" />
      </div>
    </div>
  );
}

export { Header } from "./Header";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-violet-50 via-white to-[#FAF8FF]">
      <div className={`${wrap} grid items-center gap-8 py-12 sm:py-16 lg:grid-cols-2`}>
        <div id="hero-content">
          {C.utkrisht.show && (
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <UtkrishtLogo className="h-20 w-auto" />
            </div>
          )}
          <div className="mx-auto max-w-[560px] sm:mx-0 sm:-ml-2">
            <h1 className="mt-3 flex justify-center sm:block">
              <BuildVerseLogo className="mx-auto h-auto w-full drop-shadow-sm" />
            </h1>
            <p className="mt-3 text-center font-tech text-base font-bold uppercase tracking-[0.14em] text-violet-700 sm:text-xl">{C.tagline}</p>
            <div className="mt-3 flex items-center justify-center">
              <PoweredByKiro size="lg" />
            </div>
          </div>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-violet-950/80">
            {C.eventConcluded
              ? `A hands-on innovation event by the ${C.organiser}. Students learned modern development workflows, built real products and pitched their ideas to a panel of judges.`
              : `A hands-on innovation event by the ${C.organiser}. Learn modern development workflows, build a real product, and pitch your idea to a panel of judges.`}
          </p>
          {C.eventConcluded ? (
            <>
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700"><Trophy className="h-5 w-5" aria-hidden /></span>
                <div>
                  <p className="font-poppins font-bold text-emerald-900">Event concluded successfully</p>
                  <p className="mt-0.5 text-sm text-emerald-900/80">Thank you to every participant, speaker and mentor. Results were announced on 31 October.</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#winners" className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">See the winners <ArrowRight className="h-4 w-4" aria-hidden /></a>
                <a href="#about" className="hidden items-center rounded-xl border border-violet-300 bg-white px-6 py-3 font-semibold text-violet-800 hover:bg-violet-50 sm:inline-flex">Explore the Event</a>
              </div>
            </>
          ) : (
            <>
              <div className="mt-6"><Countdown deadline={C.registrationDeadline} /></div>
              <div className="mt-6 flex flex-wrap gap-3">
                <RegisterButton />
                <a href="#about" className="hidden items-center rounded-xl border border-violet-300 bg-white px-6 py-3 font-semibold text-violet-800 hover:bg-violet-50 sm:inline-flex">Explore the Event</a>
              </div>
            </>
          )}
        </div>
        <div id="hero-mascot-wrap" className="relative mx-auto w-full max-w-xl">
          <div id="hero-mascot" className="relative z-10 w-full">
            <Mascot
              name="hero"
              priority
              sizes="(min-width: 1024px) 560px, 90vw"
              className="h-auto w-full [filter:drop-shadow(0_18px_24px_rgba(46,16,101,0.18))]"
            />
          </div>
          {/* Ground contact shadow beneath desk */}
          <div
            id="hero-shadow"
            aria-hidden="true"
            className="pointer-events-none mx-auto -mt-6 h-5 w-4/5 rounded-[100%] bg-violet-950/20 blur-xl sm:-mt-8 sm:h-7 sm:w-3/4"
          />
          {/* The idea bulb with subtle golden ambient glow behind it */}
          <div id="hero-bulb" className="pointer-events-none absolute left-[18%] top-[6%] z-20 w-[15%] h-auto">
            {/* Soft, subtle golden ambient glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-amber-400/20 via-yellow-300/15 to-transparent blur-lg sm:h-18 sm:w-18 sm:blur-xl"
            />  
          </div>
        </div>
      </div>
    </section>
  );
}

export function About() {
  const points = [[BookOpen, "Learn modern tools"], [Code2, "Build a real product"], [Presentation, "Pitch to judges"]] as const;
  return (
    <section id="about" className="scroll-mt-20 py-16">
      <div className={`${wrap} grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14`}>
        {/* Text first in the code (reads first on phones); on desktop the artwork sits on the left. */}
        <div className="lg:order-2">
          <p className={eyebrow}>About the event</p>
          <h2 className={h2}>What is <span className="text-violet-600">BUILD-VERSE</span>?</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-violet-950/80">
            BUILD-VERSE is a two-day innovative event organized by the AWS Student Builders Group at Tulas University. The event aims to empower students with practical knowledge of modern technologies and AI-powered development tools, helping them become future-ready in an evolving technological landscape.
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-violet-950/80">
            Participants will attend multiple hybrid expert-led workshops on 29 October 2026, then build innovative products or working prototypes, and present their solutions to a panel of judges on 30 October 2026.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {points.map(([Icon, text]) => (
              <li key={text} className={`${card} about-pill flex items-center gap-3 px-4 py-3 text-sm font-medium text-violet-950 transition-all duration-300 hover:border-violet-300 hover:shadow-md hover:-translate-y-0.5`}><Icon className="h-5 w-5 shrink-0 text-violet-600" aria-hidden />{text}</li>
            ))}
          </ul>
        </div>
        <div id="about-mascot-wrap" className="relative mx-auto w-full max-w-md sm:max-w-lg lg:order-1 lg:max-w-none">
          {/* The artwork carries its own cloud base and glow, so no extra shadow is added. */}
          <Mascot
            name="about"
            sizes="(min-width: 1024px) 560px, (min-width: 640px) 512px, 92vw"
            className="relative z-10 h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}

export function Flow() {
  const ART = { 1: "learn", 2: "innovate", 3: "pitch" } as const;
  const steps = C.phases.map((p) => [String(p.n).padStart(2, "0"), p] as const);
  return (
    <section id="flow" className="scroll-mt-20 py-16">
      <div className={wrap}>
        <p className={eyebrow}>Event flow</p>
        <h2 className={h2}>Learn. Innovate. Pitch.</h2>
        <p className="mt-3 text-violet-950/70">Learn at college, build at home, pitch at college. A complete journey from learning to building and finally showcasing your ideas.</p>
        <div className="mt-8 grid items-center gap-3 sm:gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {steps.map(([n, ph], i) => (
            <Fragment key={n}>
              <div className={`${card} flow-card group relative flex h-full flex-col overflow-hidden p-6 transition-all duration-300 hover:border-violet-200 hover:shadow-md`}>
                {/* Large outlined step number in top-right background */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-1 right-3 select-none text-7xl font-black tracking-tighter text-transparent leading-none transition-all duration-300 group-hover:scale-105 group-hover:[-webkit-text-stroke:1.5px_rgba(124,58,237,0.6)] sm:text-8xl [-webkit-text-stroke:1.5px_rgba(124,58,237,0.32)]"
                >
                  {n}
                </span>

                <div className="relative z-10 flex h-full flex-col">
                  <div className="relative mx-auto -mt-2 flex w-full flex-col items-center">
                    <Mascot
                      name={ART[ph.n]}
                      sizes="(min-width: 768px) 300px, 70vw"
                      className="relative z-10 h-44 w-auto object-contain [filter:drop-shadow(0_12px_16px_rgba(46,16,101,0.15))]"
                    />
                    {/* Ground shadow beneath mascot inside card */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none -mt-3.5 h-3 w-36 rounded-[100%] bg-violet-950/20 blur-md"
                    />
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-violet-950">{ph.name}</h3>
                  <span className={`mt-2 inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${ph.place === "home" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-violet-200 bg-violet-50 text-violet-800"}`}>
                    {ph.place === "home" ? <HomeIcon className="h-3.5 w-3.5" aria-hidden /> : <Building2 className="h-3.5 w-3.5" aria-hidden />}{ph.placeLabel}
                  </span>
                  <p className="mt-1.5 font-tech text-xs font-bold uppercase tracking-wider text-violet-600">{ph.when}</p>
                  <p className="mt-2 text-violet-950/75">{ph.summary}</p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="flow-arrow flex items-center justify-center py-2 md:py-0" aria-hidden="true">
                  <Mascot
                    name="arrows"
                    sizes="96px"
                    className="h-auto w-12 rotate-90 transition-transform duration-300 hover:scale-110 md:w-16 md:rotate-0 lg:w-20"
                  />
                </div>
              )}
            </Fragment>
          ))}
        </div>
                <p className="mt-6 rounded-2xl border border-violet-100 bg-violet-50/70 px-5 py-3 text-sm text-violet-950/80">{C.eventConcluded
          ? <span className="font-semibold text-violet-900">{C.concludedLine}</span>
          : <><span className="font-semibold text-violet-900">{C.resultsLine}</span> Form 01 (idea submission) opens at 6:00 PM on 29 October and Form 02 (progress report) at midnight.</>}</p>
      </div>
    </section>
  );
}

export function Rules() {
  return (
    <section id="rules" className="scroll-mt-20 py-16">
      <div className={wrap}>
        <div>
          <p className={eyebrow}>Guidelines &amp; Eligibility</p>
          <h2 className={h2}>Rules &amp; Participation</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-violet-950/75">
            Clear eligibility, transparent evaluation, and zero guesswork so you can focus entirely on shipping your best work.
          </p>
        </div>

        {/* Detailed guidelines list with mascot */}
        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-violet-100/90 bg-white/90 p-6 shadow-[0_4px_24px_-6px_rgba(46,16,101,0.06)] sm:p-8">
            <div className="mb-5 flex items-center justify-between border-b border-violet-100/80 pb-4">
              <div>
                <h3 className="font-poppins text-xl font-bold text-violet-950">Event Guidelines</h3>
                <p className="text-xs font-medium text-violet-950/60">Official competition code &amp; submission standards</p>
              </div>
              <span className="rounded-md border border-violet-200 bg-violet-100/80 px-2.5 py-1 font-tech text-xs font-semibold text-violet-700">
                {C.rules.length} Rules
              </span>
            </div>
            <ol className="divide-y divide-violet-100/70">
              {C.rules.map((r, i) => (
                <li key={r} className="rule-item flex items-start gap-3.5 py-3.5 first:pt-0 last:pb-0">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-violet-200/70 bg-violet-100 font-tech text-xs font-bold text-violet-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-relaxed text-sm text-violet-950/85 sm:text-base">{r}</span>
                </li>
              ))}
            </ol>
          </div>
          <div id="rules-mascot-wrap" className="mx-auto mt-4 flex flex-col items-center lg:mt-0">
            <div className="relative flex flex-col items-center">
              <Mascot
                name="rules"
                sizes="(min-width: 1024px) 340px, 240px"
                className="relative z-10 h-auto w-full max-w-[240px] object-contain lg:max-w-xs [filter:drop-shadow(0_16px_22px_rgba(46,16,101,0.16))]"
              />
              {/* Ground shadow beneath desk */}
              <div
                aria-hidden="true"
                className="pointer-events-none -mt-4 h-4 w-44 rounded-[100%] bg-violet-950/20 blur-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Prizes() {
  return (
    <section id="prizes" className="scroll-mt-20 py-16">
      <div id="prizes-grid" className={`${wrap} grid items-center gap-8 lg:grid-cols-2`}>
        <div id="prizes-info">
          <p className={eyebrow}>Compete &amp; Win</p>
          <h2 className={h2}>Prizes &amp; Rewards</h2>
          <PoweredByKiro className="mt-3" />
          <div className="mt-4">
            {C.prize.art ? (
              <Mascot name="prizeAmount" sizes="(min-width: 1024px) 520px, 90vw" className="-ml-3 mt-1 h-auto w-full max-w-[460px]" />
            ) : (
              <p className="mt-2 text-5xl font-extrabold text-violet-700 sm:text-6xl">{C.prize.headline}</p>
            )}
            <p className="font-tech text-xs font-bold uppercase tracking-[0.18em] text-violet-950 sm:text-sm">Total prize pool</p>
          </div>
          <p className="mt-4 max-w-md text-violet-950/80">{C.prize.details}</p>
          {C.prize.items.length > 0 && <ul className="mt-4 list-disc pl-5 text-violet-950/85">{C.prize.items.map((i) => <li key={i}>{i}</li>)}</ul>}
        </div>
        <div id="prizes-trophy-column" className="relative mx-auto flex w-full max-w-md items-center justify-center">
          {/* Subtle soft warm glow behind trophy */}
          <div
            id="trophy-shadow"
            aria-hidden="true"
            className="pointer-events-none absolute h-48 w-48 rounded-full bg-gradient-to-tr from-amber-300/15 via-amber-200/15 to-transparent blur-2xl sm:h-60 sm:w-60"
          />
          <div id="trophy-img" className="relative z-10 mx-auto w-full max-w-[300px] sm:max-w-[340px]">
            <Mascot
              name="trophy"
              sizes="(min-width: 640px) 340px, 300px"
              className="h-auto w-full"
            />
          </div>
          {/* KIRO ghost as the second mascot, next to the AWS trophy mascot */}
          <KiroGhost className="kiro-float pointer-events-none absolute -bottom-3 right-0 z-20 h-20 w-20 drop-shadow-[0_8px_14px_rgba(76,29,149,0.25)] sm:-right-2 sm:h-28 sm:w-28" />
        </div>
      </div>

      <RewardsByPosition />
    </section>
  );
}

/** "Powered by KIRO" pill. Works on light and dark backgrounds because the logo has a white fill. */
function PoweredByKiro({ className = "", size = "md" }: { className?: string; size?: "md" | "lg" }) {
  const isLg = size === "lg";
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border border-violet-200/90 bg-white/90 shadow-xs shadow-violet-500/5 backdrop-blur-sm ${
        isLg ? "pl-4 pr-3 py-1.5" : "pl-3.5 pr-2.5 py-1"
      } ${className}`}
    >
      <span className={`font-tech font-bold uppercase tracking-[0.1em] text-violet-600 ${isLg ? "text-[11px] sm:text-xs" : "text-[10px] sm:text-[11px]"}`}>
        Powered by
      </span>
      <KiroLogo className={`${isLg ? "h-6 sm:h-7" : "h-5 sm:h-6"} w-auto object-contain`} />
    </div>
  );
}

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function RewardsByPosition() {
  return (
    <div id="rewards" className={`${wrap} mt-12 scroll-mt-24`}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className={eyebrow}>Rewards by position</p>
          <h3 className="mt-2 font-serif text-3xl italic tracking-tight text-violet-950 sm:text-4xl">What the top five teams take home</h3>
        </div>
        <PoweredByKiro />
      </div>

      <ol className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {C.rewards.map((r, i) => (
          <li
            key={r.position}
            className={`relative overflow-hidden rounded-2xl border bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${i === 0 ? "border-amber-300" : "border-violet-100"} ${i > 2 ? "lg:col-span-3" : "lg:col-span-2"}`}
          >
            <p className="font-tech text-xs font-bold uppercase tracking-[0.16em] text-violet-600">{r.position}</p>
            {r.cashInr !== undefined && <p className="mt-2 font-poppins text-3xl font-extrabold text-violet-950">{inr(r.cashInr)}<span className="ml-1 text-sm font-semibold text-violet-950/60">cash</span></p>}
            <ul className="mt-3 space-y-2 text-sm text-violet-950/85">
              {r.vouchers && (
                <li>
                  <div className="flex gap-2"><Award className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" aria-hidden />{C.voucherInfo.summary}</div>
                  <ul className="mt-3 flex flex-wrap items-center gap-3 pl-6">
                    {C.voucherInfo.exams.map((e) =>
                      e.badge ? (
                        <li key={e.name}>
                          <Image src={e.badge} alt={e.name} title={e.name} width={120} height={120} sizes="72px" className="h-[72px] w-[72px] object-contain drop-shadow-sm" />
                        </li>
                      ) : (
                        <li key={e.name} className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-900">{e.name}</li>
                      ),
                    )}
                  </ul>
                </li>
              )}
              {r.items.map((it) => (
                <li key={it} className="flex gap-2"><Award className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" aria-hidden />{it}</li>
              ))}
              {r.kiroCredits && (
                <li className="flex gap-2"><KiroGhost className="mt-0.5 h-4 w-4 shrink-0" /><span>1,000 KIRO credits per team member<span className="block text-xs text-violet-950/60">worth {inr(C.kiroCreditValueInr)} per member</span></span></li>
              )}
            </ul>
          </li>
        ))}
      </ol>

      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-violet-200 bg-violet-50/70 p-4">
        <KiroGhost className="kiro-float h-12 w-12 shrink-0" />
        <p className="text-sm font-medium text-violet-950 sm:text-base">{C.participantReward}</p>
      </div>
    </div>
  );
}

export { Schedule as Timeline } from "./Schedule";
export { Speakers } from "./Speakers";

export const Participation = Rules;

export function Faqs() {
  return (
    <section id="faqs" className="scroll-mt-20 py-16">
      <div className={wrap}>
        <p className={eyebrow}>Frequently asked questions</p>
        <h2 className={h2}>FAQs</h2>
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="grid gap-3">
            {C.faqs.map((f, i) => (
              <details key={f.q} className={`${card} faq-card group px-5 py-4 transition-all duration-300 hover:border-violet-200`}>
                <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 font-semibold text-violet-950">
                  <span className="text-violet-600">{String(i + 1).padStart(2, "0")}</span>{f.q}
                </summary>
                <p className="mt-3 pl-8 text-violet-950/80">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="relative mx-auto flex w-full max-w-[340px] flex-col items-center lg:sticky lg:top-28 lg:mt-0 lg:max-w-[420px]">
            {/* FAQ Mascot (only the mascot floats) */}
            <div id="faq-mascot-wrap" className="relative flex flex-col items-center">
              <Mascot
                name="faq"
                sizes="(min-width: 1024px) 380px, 280px"
                className="relative z-10 h-auto w-full max-w-[260px] object-contain sm:max-w-[300px] [filter:drop-shadow(0_20px_28px_rgba(46,16,101,0.18))]"
              />
              {/* Ground shadow beneath standing mascot feet */}
              <div
                aria-hidden="true"
                className="pointer-events-none -mt-6 h-5 w-52 rounded-[100%] bg-violet-950/25 blur-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const contacts = C.contacts.filter((c) => c.phone.trim() !== "");
  const itemCls = "flex items-center gap-3 rounded-2xl border border-violet-100 bg-white p-4 shadow-sm transition hover:border-violet-300 hover:shadow-md";
  return (
    <section id="contact" className="scroll-mt-20 py-16">
      <div className={wrap}>
        <p className={eyebrow}>Contact</p>
        <h2 className={h2}>Questions? Talk to us.</h2>
        <p className="mt-3 max-w-2xl text-violet-950/70">Have queries about the event, the schedule or your team? Reach out to the organisers anytime.</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((c) => (
            <li key={c.name}>
              <a href={`tel:${c.phone.replace(/\s/g, "")}`} className={itemCls}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700"><Phone className="h-5 w-5" aria-hidden /></span>
                <span className="min-w-0">
                  <span className="block font-poppins font-semibold text-violet-950">{c.name}</span>
                  <span className="block font-tech text-sm font-semibold text-violet-700">{c.phone}</span>
                </span>
              </a>
            </li>
          ))}
          {C.whatsappUrl && (
            <li>
              <a href={C.whatsappUrl} target="_blank" rel="noopener noreferrer" className={itemCls}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700"><MessageCircle className="h-5 w-5" aria-hidden /></span>
                <span className="min-w-0">
                  <span className="block font-poppins font-semibold text-violet-950">WhatsApp community</span>
                  <span className="block text-sm text-violet-950/70">Join for updates</span>
                </span>
              </a>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="final-cta" className="relative isolate overflow-hidden bg-gradient-to-b from-[#FAF8FF] via-violet-100/50 to-violet-50/30 min-h-[520px] sm:min-h-[550px] md:min-h-[580px]">
      <SparkleCluster className="left-6 top-10 -scale-x-100 lg:left-20" />
      {/* Campus scene: full-width panorama with seamless gradient transition */}
      <div id="campus-scene" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 w-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%)]">
        {/* Desktop view (md: and up) - full edge-to-edge landscape */}
        <div className="relative hidden w-full md:block aspect-[1920/577] min-h-[380px]">
          <Image
            src="/buildverse/campus-scene.webp"
            alt="Campus panorama"
            fill
            sizes="100vw"
            quality={85}
            className="w-full h-full object-cover object-bottom scale-[1.01] origin-bottom"
          />
        </div>

        {/* Mobile view (< md) - focused right-side part of campus scene */}
        <div className="relative block h-72 sm:h-80 w-full md:hidden">
          <Image
            src="/buildverse/campus-scene.webp"
            alt="Campus panorama"
            fill
            sizes="860px"
            quality={85}
            className="w-full h-full object-cover object-[85%_bottom] scale-[1.01] origin-bottom"
          />
        </div>
      </div>

      {/* Centered CTA content */}
      <div className={`${wrap} relative z-10 flex flex-col items-center pt-16 pb-32 text-center sm:pt-20 sm:pb-36 md:pt-20 md:pb-36 lg:pt-24 lg:pb-40`}>
        <p className={eyebrow}>{C.eventConcluded ? "BUILD-VERSE 2026 concluded" : "Be a part of BUILD-VERSE 2026"}</p>
        <h2 className={h2}>{C.eventConcluded ? "Thank you for building with us." : "Your idea deserves a bigger stage."}</h2>
        <p className="mx-auto mt-3 max-w-xl text-violet-950/80">{C.eventConcluded ? "Learn. Innovate. Pitch. Congratulations to every team that turned an idea into a real product." : "Learn. Innovate. Pitch. Turn your ideas into real impact at BUILD-VERSE 2026."}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {C.eventConcluded ? (
            <a href="#winners" className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">See the winners <ArrowRight className="h-4 w-4" aria-hidden /></a>
          ) : (
            <RegisterButton />
          )}
          <a href="#about" className="hidden items-center rounded-xl border border-violet-300 bg-white/90 px-6 py-3 font-semibold text-violet-800 backdrop-blur-sm transition hover:bg-white sm:inline-flex">Explore the Event</a>
        </div>
        <PoweredByKiro className="mt-5" />
      </div>

      {/* Mascot: moved down & to the left (rocky cliff & mountain trees) */}
      <div
        id="final-cta-mascot"
        className="absolute bottom-2 left-3 z-10 sm:bottom-3 sm:left-6 md:bottom-4 md:left-8 lg:bottom-6 lg:left-14 xl:left-20"
      >
        <div className="relative flex flex-col items-center">
          <Mascot
            name="welcome"
            sizes="(min-width: 1024px) 240px, (min-width: 768px) 200px, 140px"
            className="relative z-10 h-auto w-32 xs:w-36 sm:w-44 md:w-52 lg:w-56 [filter:drop-shadow(0_16px_22px_rgba(46,16,101,0.22))]"
          />
          {/* Ground contact shadow on landscape terrain */}
          <div
            aria-hidden="true"
            className="pointer-events-none -mt-3 h-3 w-28 rounded-[100%] bg-violet-950/35 blur-md sm:-mt-4 sm:h-4 sm:w-36 lg:w-44"
          />
        </div>
      </div>

      {/* Utkrisht Logo: moved down & to the right (pine trees corner) */}
      {C.utkrisht.show && (
        <div className="absolute bottom-3 right-3 z-10 sm:bottom-4 sm:right-6 md:bottom-5 md:right-8 lg:bottom-6 lg:right-14 xl:right-20">
          <UtkrishtLogoWhite className="h-11 w-auto xs:h-13 sm:h-15 md:h-18 lg:h-20 drop-shadow-lg" />
        </div>
      )}
    </section>
  );
}

export function BvFooter() {
  return null;
}
