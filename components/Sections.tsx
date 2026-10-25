import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Code2, Presentation, Leaf, GraduationCap, HeartPulse, Cpu, Users, Mail, Phone, MessageCircle } from "lucide-react";
import { BUILDVERSE as C } from "@/config/buildverse";
import { registrationState } from "@/lib/state";
import { Mascot } from "./Mascot";
import { Countdown } from "./Countdown";
import { SbgLogo, BuildVerseLogo, UtkrishtLogo } from "./Logos";

const themeIcons = [Leaf, GraduationCap, HeartPulse, Cpu, Users];
const eyebrow = "text-xs font-semibold uppercase tracking-[0.18em] text-violet-600";
const h2 = "mt-2 text-3xl font-bold tracking-tight text-violet-950 sm:text-4xl";
const wrap = "mx-auto w-full max-w-6xl px-4 sm:px-6";
const card = "rounded-2xl border border-violet-100 bg-white shadow-sm";

export function RegisterButton({ className = "", label = "Register Your Team" }: { className?: string; label?: string }) {
  const open = registrationState(Date.now(), C.registrationDeadline) === "open";
  if (!open) {
    return <span className={`inline-flex items-center justify-center rounded-xl bg-violet-200 px-6 py-3 font-semibold text-violet-700 ${className}`}>Registration closed</span>;
  }
  return (
    <Link href="/register" className={`inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 ${className}`}>
      {label} <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}

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

const NAV = [["About", "about"], ["Event Flow", "flow"], ["Themes", "themes"], ["Rules", "rules"], ["Prizes", "prizes"], ["Timeline", "timeline"], ["FAQs", "faqs"]] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-violet-100 bg-white/85 backdrop-blur">
      <div className={`${wrap} flex h-16 items-center justify-between gap-4`}>
        <Link href="/" className="flex items-center gap-3" aria-label="BUILD-VERSE 2026 home">
          <SbgLogo className="h-11 sm:h-12" />
        </Link>
        <nav aria-label="Sections" className="hidden items-center gap-5 lg:flex">
          {NAV.map(([l, id]) => <a key={id} href={`#${id}`} className="text-sm font-medium text-violet-900/80 hover:text-violet-700">{l}</a>)}
        </nav>
        <RegisterButton label="Register Now" className="!px-4 !py-2 text-sm" />
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-violet-50 via-white to-[#FAF8FF]">
      <div className={`${wrap} grid items-center gap-8 py-12 sm:py-16 lg:grid-cols-2`}>
        <div id="hero-content">
          {C.utkrisht.show && (
            <div className="flex items-center gap-3">
              <UtkrishtLogo className="h-20 w-auto" />
            </div>
          )}
          <h1 className="mt-3 -ml-2 max-w-[560px]"><BuildVerseLogo className="h-auto w-full" /></h1>
          <p className="mt-3 text-sm font-bold uppercase tracking-[0.3em] text-violet-700">{C.tagline}</p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-violet-950/80">
            A hands-on innovation event by the {C.organiser}. Learn modern development workflows, build a real product, and pitch your idea to a panel of judges.
          </p>
          <div className="mt-6"><Countdown deadline={C.registrationDeadline} /></div>
          <div className="mt-6 flex flex-wrap gap-3">
            <RegisterButton />
            <a href="#about" className="inline-flex items-center rounded-xl border border-violet-300 bg-white px-6 py-3 font-semibold text-violet-800 hover:bg-violet-50">Explore the Event</a>
          </div>
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
          {/* The idea bulb sits just above the mascot's raised finger. */}
          <div id="hero-bulb" className="pointer-events-none absolute left-[18%] top-[6%] z-20 w-[15%] h-auto">
            <Mascot name="bulb" sizes="120px" className="h-auto w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function About() {
  const points = [[BookOpen, "Learn modern tools"], [Code2, "Build a real product"], [Presentation, "Pitch to experienced judges"]] as const;
  return (
    <section id="about" className="scroll-mt-20 py-16">
      <div className={`${wrap} grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]`}>
        <div>
          <p className={eyebrow}>About the event</p>
          <h2 className={h2}>What is <span className="text-violet-600">BUILD-VERSE</span>?</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-violet-950/80">
            BUILD-VERSE is a hands-on innovation event organised by the {C.organiser}. It introduces students to modern development workflows, helps them turn ideas into product prototypes, and gives them a platform to pitch their solutions to a panel of judges.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {points.map(([Icon, text]) => (
              <li key={text} className={`${card} about-pill flex items-center gap-3 px-4 py-3 text-sm font-medium text-violet-950 transition-all duration-300 hover:border-violet-300 hover:shadow-md hover:-translate-y-0.5`}><Icon className="h-5 w-5 shrink-0 text-violet-600" aria-hidden />{text}</li>
            ))}
          </ul>
        </div>
        <div id="about-mascot-wrap" className="relative mx-auto w-full max-w-sm">
          <Mascot
            name="about"
            sizes="(min-width: 1024px) 400px, 70vw"
            className="relative z-10 h-auto w-full [filter:drop-shadow(0_16px_22px_rgba(46,16,101,0.16))]"
          />
          {/* Ground contact shadow beneath feet */}
          <div
            aria-hidden="true"
            className="pointer-events-none mx-auto -mt-4 h-4 w-3/5 rounded-[100%] bg-violet-950/20 blur-lg"
          />
        </div>
      </div>
    </section>
  );
}

export function Flow() {
  const steps = [
    ["01", "Learn", "Expert-led workshop on AI-assisted development workflows and modern tools.", "learn"],
    ["02", "Innovate", "Turn your ideas into working products using modern technologies.", "innovate"],
    ["03", "Pitch", "Demonstrate your product and present it to a panel of judges.", "pitch"],
  ] as const;
  return (
    <section id="flow" className="scroll-mt-20 py-16">
      <div className={wrap}>
        <p className={eyebrow}>Event flow</p>
        <h2 className={h2}>Learn. Innovate. Pitch.</h2>
        <p className="mt-3 text-violet-950/70">A complete journey from learning to building and finally showcasing your ideas.</p>
        <div className="mt-8 grid items-center gap-3 sm:gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {steps.map(([n, t, d, art], i) => (
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
                      name={art}
                      sizes="(min-width: 768px) 300px, 70vw"
                      className="relative z-10 h-44 w-auto object-contain [filter:drop-shadow(0_12px_16px_rgba(46,16,101,0.15))]"
                    />
                    {/* Ground shadow beneath mascot inside card */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none -mt-3.5 h-3 w-36 rounded-[100%] bg-violet-950/20 blur-md"
                    />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-violet-950">{t}</h3>
                  <p className="mt-2 text-violet-950/75">{d}</p>
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
      </div>
    </section>
  );
}

export function Themes() {
  return (
    <section id="themes" className="scroll-mt-20 py-16">
      <div className={wrap}>
        <p className={eyebrow}>Event themes</p>
        <h2 className={h2}>Choose a theme. Build a solution.</h2>
        <p className="mt-3 text-violet-950/70">Pick a theme that excites you and create a meaningful product.</p>
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {C.themes.map((t, i) => {
            const Icon = themeIcons[i % themeIcons.length];
            return (
              <li key={t.title} className={`${card} theme-card p-5 transition-all duration-300 hover:border-violet-300 hover:shadow-md hover:-translate-y-1 ${i === C.themes.length - 1 ? "col-span-2 md:col-span-1" : ""}`}>
                <Icon className="h-8 w-8 text-violet-600" aria-hidden />
                <h3 className="mt-3 font-bold text-violet-950">{t.title}</h3>
                <p className="mt-1 text-sm text-violet-950/75">{t.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Rules() {
  return (
    <section id="rules" className="scroll-mt-20 py-16">
      <div className={wrap}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={eyebrow}>Rules &amp; Participation</p>
            <h2 className={h2}>Play fair. Come solo or with a team.</h2>
            <p className="mt-3 text-violet-950/70">Everything you need to know about eligibility, team formation, and guidelines.</p>
          </div>
        </div>

        {/* Detailed guidelines list with mascot */}
        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className={`${card} p-6 sm:p-8`}>
            <h3 className="mb-3 text-lg font-bold text-violet-950">Event Guidelines</h3>
            <ol className="divide-y divide-violet-100">
              {C.rules.map((r, i) => (
                <li key={r} className="rule-item flex gap-4 py-3.5 first:pt-0 last:pb-0">
                  <span className="w-8 shrink-0 text-xl font-bold text-violet-600">{String(i + 1).padStart(2, "0")}</span>
                  <span className="leading-relaxed text-violet-950/85">{r}</span>
                </li>
              ))}
            </ol>
          </div>
          <div id="rules-mascot-wrap" className="mx-auto hidden flex-col items-center lg:flex">
            <div className="relative flex flex-col items-center">
              <Mascot
                name="rules"
                sizes="340px"
                className="relative z-10 h-auto w-full max-w-xs object-contain [filter:drop-shadow(0_16px_22px_rgba(46,16,101,0.16))]"
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
          <p className={eyebrow}>Prizes &amp; rewards</p>
          {C.prize.art ? (
            <Mascot name="prizeAmount" sizes="(min-width: 1024px) 520px, 90vw" className="-ml-3 mt-1 h-auto w-full max-w-[460px]" />
          ) : (
            <p className="mt-2 text-5xl font-extrabold text-violet-700 sm:text-6xl">{C.prize.headline}</p>
          )}
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-950">Total prize pool</p>
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
          <div id="trophy-img" className="relative z-10 w-full">
            <Mascot
              name="trophy"
              sizes="(min-width: 1024px) 520px, 90vw"
              className="h-auto w-full [filter:drop-shadow(0_8px_20px_rgba(217,119,6,0.1))]"
            />
          </div>
        </div>
      </div>

      <div className={`${wrap} mt-10`}>
        <div id="judges-card" className="grid items-center gap-6 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-950 via-indigo-950 to-violet-900 p-6 sm:p-8 md:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">Judges</p>
            {C.judges.length === 0 ? (
              <>
                <h3 className="mt-2 text-3xl font-bold text-white">To be revealed soon</h3>
                <p className="mt-2 max-w-md text-violet-100/85">An experienced panel of industry experts and professionals will evaluate the projects.</p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">Stay tuned</p>
              </>
            ) : (
              <ul className="mt-3 space-y-3">{C.judges.map((j) => <li key={j.name}><b className="text-white">{j.name}</b><br /><span className="text-sm text-violet-200">{j.title}</span></li>)}</ul>
            )}
          </div>
          {C.judges.length === 0 && <Mascot name="judges" sizes="(min-width: 768px) 520px, 90vw" className="mx-auto h-auto w-full max-w-md" />}
        </div>
      </div>
    </section>
  );
}

export function Timeline() {
  return (
    <section id="timeline" className="scroll-mt-20 py-16">
      <div className={wrap}>
        <p className={eyebrow}>Event timeline</p>
        <h2 className={h2}>Two days. From learning to pitching.</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {C.days.map((d, i) => (
            <li key={d.date} className={`${card} timeline-card p-6 transition-all duration-300 hover:border-violet-200 hover:shadow-md`}>
              <p className="text-sm font-semibold text-violet-600">Day {i + 1} · {d.label}</p>
              <h3 className="mt-1 text-xl font-bold text-violet-950">{d.title}</h3>
              <dl className="mt-3 space-y-1 text-sm text-violet-950/85">
                <div className="flex gap-2"><dt className="font-semibold">Time:</dt><dd>{d.time === "TBA" ? <span className="rounded bg-amber-100 px-1.5 font-semibold text-amber-900">To be announced</span> : d.time}</dd></div>
                <div className="flex gap-2"><dt className="font-semibold">Mode:</dt><dd>{d.mode}</dd></div>
                {d.venue && <div className="flex gap-2"><dt className="font-semibold">Venue:</dt><dd>{d.venue}</dd></div>}
              </dl>
              <p className="mt-3 text-sm text-violet-950/70">{d.description}</p>
            </li>
          ))}
        </ol>
        {C.utkrisht.show && (
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <UtkrishtLogo className="h-16 w-auto" />
            <p className="text-sm text-violet-950/70">{C.utkrisht.text}.</p>
          </div>
        )}
      </div>
    </section>
  );
}

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
                <summary className="flex cursor-pointer list-none items-center gap-3 font-semibold text-violet-950">
                  <span className="text-violet-600">{String(i + 1).padStart(2, "0")}</span>{f.q}
                </summary>
                <p className="mt-3 pl-8 text-violet-950/80">{f.a}</p>
              </details>
            ))}
          </div>
          <div id="faq-mascot-wrap" className="relative mx-auto hidden w-full max-w-[440px] flex-col items-center lg:flex">
            <Mascot
              name="faq"
              sizes="(min-width: 1024px) 440px, 90vw"
              className="relative z-10 h-auto w-full object-contain [filter:drop-shadow(0_20px_28px_rgba(46,16,101,0.18))]"
            />
            {/* Ground shadow beneath standing mascot feet */}
            <div
              aria-hidden="true"
              className="pointer-events-none -mt-6 h-5 w-52 rounded-[100%] bg-violet-950/25 blur-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="final-cta" className="relative isolate overflow-hidden bg-gradient-to-b from-[#FAF8FF] via-violet-100 to-fuchsia-100">
      {/* Campus scene, file used as supplied. The picture has a fake "transparent" checkerboard baked in
          above and below the scenery, so only the scenery rows are shown (object-view-box), and the top fades out. */}
      <div id="campus-scene" className="absolute inset-x-0 bottom-0 -z-10 h-56 [mask-image:linear-gradient(to_bottom,transparent_0%,black_30%)] sm:aspect-[2170/410] sm:h-auto">
        <Image
          src="/buildverse/campus-scene.png"
          alt=""
          fill
          sizes="100vw"
          quality={80}
          className="object-cover object-[78%_bottom]"
          style={{ objectViewBox: "inset(27.6% 0 15.9% 0)" } as React.CSSProperties}
        />
      </div>
      <div className={`${wrap} relative grid min-h-[460px] items-end gap-6 pt-14 md:grid-cols-[auto_1fr_auto] md:min-h-[500px]`}>
        <div id="final-cta-mascot" className="order-2 mx-auto mb-8 w-44 self-end sm:mb-10 sm:w-56 md:order-none md:mb-12 md:w-60">
          <div className="relative flex flex-col items-center">
            <Mascot
              name="welcome"
              sizes="240px"
              className="relative z-10 h-auto w-full [filter:drop-shadow(0_16px_22px_rgba(46,16,101,0.22))]"
            />
            {/* Ground contact shadow on landscape terrain */}
            <div
              aria-hidden="true"
              className="pointer-events-none -mt-4 h-4 w-36 rounded-[100%] bg-violet-950/35 blur-md"
            />
          </div>
        </div>
        <div className="order-1 self-start pb-6 text-center md:order-none md:self-center md:pb-24 md:text-left">
          <p className={eyebrow}>Be a part of BUILD-VERSE 2026</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-violet-950 sm:text-4xl">Your idea deserves a bigger stage.</h2>
          <p className="mx-auto mt-3 max-w-xl text-violet-950/80 md:mx-0">Learn. Innovate. Pitch. Turn your ideas into real impact at BUILD-VERSE 2026.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
            <RegisterButton />
            <a href="#about" className="inline-flex items-center rounded-xl border border-violet-300 bg-white/90 px-6 py-3 font-semibold text-violet-800 hover:bg-white">Explore the Event</a>
          </div>
        </div>
        {C.utkrisht.show && (
          <div className="order-3 mx-auto mb-6 flex items-center gap-3 self-end rounded-2xl bg-white/85 px-4 py-3 shadow-sm backdrop-blur md:order-none md:mb-10">
            <UtkrishtLogo className="h-14 w-auto" />
          </div>
        )}
      </div>
    </section>
  );
}

export function BvFooter() {
  const contacts = C.contacts.filter((c) => c.phone.trim() !== "");
  return (
    <footer className="border-t border-violet-100 bg-white py-8 text-sm text-violet-950/80">
      <div className={`${wrap} flex flex-col gap-6 md:flex-row md:items-start md:justify-between`}>
        <div>
          <SbgLogo className="h-14" />
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-violet-950">Contact</p>
          {contacts.length === 0 && <p className="flex items-center gap-2"><Mail className="h-4 w-4" aria-hidden />Questions? Reach out through the SBG team on campus.</p>}
          {contacts.map((c) => <p key={c.name} className="flex items-center gap-2"><Phone className="h-4 w-4" aria-hidden />{c.name}: <a className="underline" href={`tel:${c.phone.replace(/\s/g, "")}`}>{c.phone}</a></p>)}
          {C.whatsappUrl && <a href={C.whatsappUrl} className="mt-1 inline-flex items-center gap-2 rounded-lg border border-violet-300 px-3 py-1.5 font-medium text-violet-800 hover:bg-violet-50"><MessageCircle className="h-4 w-4" aria-hidden />Join WhatsApp Community</a>}
        </div>
      </div>
    </footer>
  );
}
