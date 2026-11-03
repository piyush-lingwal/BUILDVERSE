"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { createKit, createQueue, gsap, registerMotion, ScrollTrigger, type Kit } from "./motion/core";
import { heroIntro, heroMotion } from "./motion/hero";
import { textMotion } from "./motion/text";
import { sectionMotion } from "./motion/sections";
import { showcaseMotion } from "./motion/showcase";
import { timelineMotion } from "./motion/timeline";
import { interactionMotion } from "./motion/interactions";

if (typeof window !== "undefined") {
  registerMotion();
  gsap.registerPlugin(useGSAP);
}

// Each module looks after one kind of motion inside a block of the page (a section or a divider). A failure
// in one never stops the others, and nothing is hidden unless its entrance has been set up, so content can
// never be left invisible.
const MODULES: [string, (k: Kit) => void][] = [
  ["text", textMotion],
  ["sections", sectionMotion],
  ["showcase", showcaseMotion],
  ["timeline", timelineMotion],
  ["interactions", interactionMotion],
];

function attempt(name: string, run: () => void): void {
  try {
    run();
  } catch (error) {
    if (process.env.NODE_ENV !== "production") console.error(`[motion] ${name} skipped:`, error);
  }
}

/**
 * The site's motion system, mounted once on the home page. gsap.matchMedia() gives three tiers:
 * reduced motion (nothing moves), touch and small screens (lighter entrances), and desktop with a mouse
 * (scroll-linked scenes, a pinned story, pointer effects). Everything is reverted when a tier changes.
 * Only the hero intro is set up straight away; the rest is prepared in idle moments, in page order.
 */
export function GsapMotion() {
  const progress = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const html = document.documentElement;
    const main = document.querySelector<HTMLElement>("main");
    const mm = gsap.matchMedia();

    mm.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        fine: "(min-width: 1024px) and (pointer: fine)",
        // The complement of "fine". matchMedia only calls back while at least one condition matches, so
        // this keeps phones, tablets and narrow windows covered (and re-runs the setup when a tier changes).
        coarse: "not all and (min-width: 1024px) and (pointer: fine)",
      },
      (context) => {
        const { reduce, fine } = context.conditions as { reduce: boolean; fine: boolean };
        if (reduce || !main) {
          html.classList.add("gsap-ready");
          return;
        }
        const queue = createQueue(context);
        const kits = Array.from(main.children, (block) => createKit(block as HTMLElement, fine ? "fine" : "coarse", queue.later));
        // The hero intro takes over the first frame painted before hydration...
        const hero = kits.find((k) => k.root.id === "hero");
        let introPlayed = false;
        if (hero) attempt("hero intro", () => { introPlayed = heroIntro(hero); });
        // ...and only then is the CSS pre-hydration state released.
        html.classList.add("gsap-ready");

        // Everything else is prepared a slice per frame, block by block in page order.
        const bar = progress.current;
        if (bar) {
          // Reading progress along the top edge.
          queue.add(() => { gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } }); });
        }
        if (hero) queue.add(() => attempt("hero", () => heroMotion(hero, introPlayed)));
        for (const k of kits) for (const [name, run] of MODULES) queue.add(() => attempt(name, () => run(k)));
        // Once everything exists, measure all trigger positions once more against the settled layout.
        queue.start(() => ScrollTrigger.refresh());
        return () => {
          queue.stop();
          for (const k of kits) k.dispose();
        };
      },
    );

    // If GSAP could not start at all, show the hero rather than waiting for the CSS fallback.
    if (!html.classList.contains("gsap-ready")) html.classList.add("gsap-ready");
    return () => mm.revert();
  });

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] motion-reduce:hidden">
      <span ref={progress} className="block h-full w-full origin-left scale-x-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400" />
    </div>
  );
}
