"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BUILDVERSE as C } from "@/config/buildverse";
import { useRegistrationOpen } from "./useRegistrationOpen";
import { useCurrentTime } from "./useCurrentTime";
import { isFormClickable } from "@/lib/state";
import { SbgLogo } from "./Logos";

export const NAV_ITEMS = [
  { label: "About", id: "about" },
  { label: "Event Flow", id: "flow" },
  { label: "Timeline", id: "timeline" },
  { label: "Tracks", id: "tracks" },
  { label: "Rules", id: "rules" },
  { label: "Prizes & Rewards", id: "prizes" },
  { label: "FAQs", id: "faqs" },
  { label: "Contact", id: "contact" },
] as const;

export function Header() {
  const [activeSection, setActiveSection] = useState<string>("");
  const open = useRegistrationOpen();
  const now = useCurrentTime();
  const form2Open = now !== 0 && isFormClickable(now, C.forms.progressReport.opensAt);
  const form1Open = now !== 0 && isFormClickable(now, C.forms.ideaSubmission.opensAt);
  const mobileNav = useRef<HTMLElement>(null);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    // Use IntersectionObserver with top offset to track section in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection((prev) => (prev !== entry.target.id ? entry.target.id : prev));
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach((s) => observer.observe(s));

    // Clear active section if scrolled to top
    const handleScroll = () => {
      if (window.scrollY < 80) {
        setActiveSection((prev) => (prev !== "" ? "" : prev));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // The mobile tab strip scrolls sideways. Keep the active tab centred in it so it never hides off-screen.
  // Only the strip is scrolled (never the page), and only by its own scrollLeft.
  useEffect(() => {
    const nav = mobileNav.current;
    if (!nav || nav.scrollWidth <= nav.clientWidth) return;
    const el = activeSection ? nav.querySelector<HTMLElement>(`[data-nav="${activeSection}"]`) : null;
    const left = el ? el.offsetLeft - (nav.clientWidth - el.offsetWidth) / 2 : 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    nav.scrollTo({ left: Math.max(0, left), behavior: reduce ? "auto" : "smooth" });
  }, [activeSection]);

  return (
    <header className="sticky top-0 z-40 border-b border-violet-100 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="BUILD-VERSE 2026 home">
          <SbgLogo className="h-11 sm:h-12" />
        </Link>

        {/* Desktop Nav with active section highlighting */}
        <nav aria-label="Sections" className="hidden items-center gap-1.5 min-[1100px]:flex">
          {NAV_ITEMS.map(({ label, id }) => {
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={`/#${id}`}
                aria-current={isActive ? "location" : undefined}
                className={`whitespace-nowrap rounded-xl px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "border border-violet-200/90 bg-violet-100 font-semibold text-violet-900 shadow-xs"
                    : "text-violet-900/75 hover:bg-violet-50 hover:text-violet-950"
                }`}
              >
                {label}
              </a>
            );
          })}
        </nav>

        {open ? (
          <a
            href={C.registrationFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="!px-4 !py-2.5 text-sm min-h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
          >
            Register Now <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        ) : form2Open ? (
          <a
            href={C.forms.progressReport.url}
            target="_blank"
            rel="noopener noreferrer"
            className="!px-4 !py-2.5 text-xs sm:text-sm min-h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            <span>Submit Progress (Form 2)</span> <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        ) : form1Open ? (
          <a
            href={C.forms.ideaSubmission.url}
            target="_blank"
            rel="noopener noreferrer"
            className="!px-4 !py-2.5 text-xs sm:text-sm min-h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            <span>Submit Idea (Form 1)</span> <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        ) : (
          <span className="!px-4 !py-2.5 text-sm min-h-11 inline-flex items-center justify-center rounded-xl bg-violet-200 font-semibold text-violet-700">
            Registration closed
          </span>
        )}
      </div>

      {/* Mobile Scrollable Nav with active section highlighting */}
      <nav ref={mobileNav} aria-label="Sections (mobile)" className="no-scrollbar relative flex gap-1 overflow-x-auto border-t border-violet-100 px-2 py-1 min-[1100px]:hidden">
        {NAV_ITEMS.map(({ label, id }) => {
          const isActive = activeSection === id;
          return (
            <a
              key={id}
              href={`/#${id}`}
              data-nav={id}
              aria-current={isActive ? "location" : undefined}
              className={`flex min-h-10 shrink-0 items-center rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
                isActive
                  ? "border border-violet-200/90 bg-violet-100 font-semibold text-violet-900 shadow-xs"
                  : "text-violet-900/75 active:text-violet-950"
              }`}
            >
              {label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
