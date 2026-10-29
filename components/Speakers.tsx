import Image from "next/image";
import { ExternalLink, Linkedin, Building2, Monitor } from "lucide-react";

const eyebrow = "font-tech text-xs font-medium uppercase tracking-[0.18em] text-violet-600 before:mr-2 before:text-violet-400 before:content-['//'] sm:text-sm";
const h2 = "mt-2 font-serif italic text-4xl font-normal tracking-tight text-violet-950 sm:text-5xl lg:text-6xl";
const wrap = "mx-auto w-full max-w-6xl px-4 sm:px-6";

export const SPEAKERS_DATA = [
  {
    name: "Mohit Raj",
    role: "Software Development Engineer at Amazon Web Services (AWS)",
    sessionTitle: "Building with AI: From Idea to Product",
    date: "29 October 2026",
    time: "11:30 AM – 12:30 PM",
    mode: "Hybrid",
    venue: "New Seminar Hall, Tulas University",
    posterSrc: "/buildverse/speakers/mohit-raj.webp",
    alt: "Mohit Raj - Software Development Engineer at AWS",
    links: [
      { name: "Mohit Raj", url: "https://www.linkedin.com/in/mohit-raj-570a6a1b2/" },
    ],
  },
  {
    name: "Sudha Subramaniam",
    role: "AWS Community Builder in AI Engineering · Application & Migration Architect at IBM",
    sessionTitle: "AI Engineering & Generative AI in Practice",
    date: "29 October 2026",
    time: "7:00 PM – 8:00 PM",
    mode: "Online",
    venue: "Google Meet",
    posterSrc: "/buildverse/speakers/sudha.webp",
    alt: "Sudha Subramaniam - AWS Community Builder in AI Engineering, Architect at IBM",
    links: [
      { name: "Sudha Subramaniam", url: "https://www.linkedin.com/in/sudhast/" },
    ],
  },
  {
    name: "HackOn 6.0 Champions",
    subtitle: "Apoorva Jain · Sweksha Misra · Shalini Singh",
    role: "Winners of HackOn with Amazon 6.0 · NIT Jamshedpur",
    sessionTitle: "Think Like a Hackathon Winner",
    date: "29 October 2026",
    time: "8:00 PM – 9:00 PM",
    mode: "Online",
    venue: "Google Meet",
    posterSrc: "/buildverse/speakers/hackon-winners.webp",
    alt: "HackOn with Amazon 6.0 Winners - Apoorva Jain, Sweksha Misra, Shalini Singh from NIT Jamshedpur",
    links: [
      { name: "Apoorva", url: "https://www.linkedin.com/in/apoorva-jain-07a81128a/" },
      { name: "Sweksha", url: "https://www.linkedin.com/in/sweksha-misra-68a9121a7/" },
      { name: "Shalini", url: "https://www.linkedin.com/in/shalini-singh-6358a728a/" },
    ],
  },
] as const;

export function Speakers() {
  return (
    <section id="speakers" className="scroll-mt-20 py-16">
      <div className={wrap}>
        <div className="flex flex-col items-center text-center">
          <p className={eyebrow}>Guest Speakers &amp; Mentors</p>
          <h2 className={h2}>Learn from Industry Champions</h2>
          <p className="mt-3 max-w-2xl text-base text-violet-950/75">
            Meet the AWS engineers, cloud architects, and national hackathon winners joining BUILD-VERSE 2026 to mentor and inspire participants.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {SPEAKERS_DATA.map((sp) => (
            <div
              key={sp.name}
              className="speaker-card group relative flex flex-col overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-950/10"
            >
              {/* Poster Image */}
              <div className="relative aspect-[1050/1492] w-full overflow-hidden bg-violet-950/5">
                <Image
                  src={sp.posterSrc}
                  alt={sp.alt}
                  width={1050}
                  height={1492}
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-violet-950/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Card Meta & Links */}
              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                <div>
                  <h3 className="font-poppins text-lg font-bold text-violet-950 sm:text-xl group-hover:text-violet-700 transition-colors">
                    {sp.name}
                  </h3>
                  {"subtitle" in sp && sp.subtitle && (
                    <p className="mt-0.5 text-xs font-semibold text-violet-600">
                      {sp.subtitle}
                    </p>
                  )}
                  <p className="mt-1 text-xs leading-relaxed text-violet-950/75 sm:text-sm">
                    {sp.role}
                  </p>

                  {/* Topic & Session Details */}
                  <div className="mt-3.5 rounded-xl border border-violet-100 bg-violet-50/60 p-3.5">
                    <p className="text-xs font-medium text-violet-900/90 sm:text-sm">
                      <span className="font-bold text-violet-700">Topic:</span> {sp.sessionTitle}
                    </p>

                    {/* Below Topic: Date, Time, Mode */}
                    <div className="mt-2.5 space-y-1.5 border-t border-violet-200/60 pt-2.5 text-xs text-violet-950">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-violet-700 w-12 shrink-0">Date:</span>
                        <span className="font-medium text-violet-950">{sp.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-violet-700 w-12 shrink-0">Time:</span>
                        <span className="font-tech font-bold text-violet-900">{sp.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-violet-700 w-12 shrink-0">Mode:</span>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                            sp.mode === "Hybrid"
                              ? "border-violet-300/60 bg-violet-100/80 text-violet-900"
                              : "border-sky-300/60 bg-sky-100/80 text-sky-900"
                          }`}
                        >
                          {sp.mode === "Hybrid" ? (
                            <Building2 className="h-3 w-3" aria-hidden />
                          ) : (
                            <Monitor className="h-3 w-3" aria-hidden />
                          )}
                          {sp.mode}
                        </span>
                        {sp.venue && (
                          <span className="text-[11px] text-violet-950/70 truncate">
                            · {sp.venue}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* LinkedIn Actions */}
                <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-violet-100/80 pt-4">
                  <span className="text-[11px] font-medium text-violet-950/60">Connect:</span>
                  {sp.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-1.5 rounded-lg border border-violet-200/90 bg-white px-2.5 py-1 text-xs font-semibold text-violet-900 shadow-xs transition-colors hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white"
                    >
                      <Linkedin className="h-3.5 w-3.5 text-[#0A66C2] transition-colors group-hover/link:text-white" aria-hidden />
                      <span>{link.name}</span>
                      <ExternalLink className="h-3 w-3 opacity-50 transition-opacity group-hover/link:opacity-100 group-hover/link:text-white" aria-hidden />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

