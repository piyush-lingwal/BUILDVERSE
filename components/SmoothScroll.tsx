"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Breathing room between the bottom of the sticky navbar and a section's heading (eyebrow). */
const HEADING_GAP = 36;

/**
 * Where to scroll so the section's own content (its eyebrow and heading) sits just below the sticky navbar.
 * Computed directly, so it ignores CSS scroll-margin / scroll-padding (those used to be added on top of the offset
 * and made every jump land inside the previous section).
 */
function headingScrollTop(el: HTMLElement): number {
  const navbar = document.querySelector("header");
  const navbarHeight = navbar ? navbar.offsetHeight : 70;
  const padTop = Number.parseFloat(getComputedStyle(el).paddingTop) || 0;
  return Math.max(0, el.getBoundingClientRect().top + window.scrollY + padTop - navbarHeight - HEADING_GAP);
}

/**
 * Touch / reduced-motion scrolling without Lenis. A hand-rolled animation instead of `behavior: "smooth"`: the browser
 * can silently drop a long smooth scroll while the page is still settling, and this re-reads the target every frame,
 * so late layout changes cannot leave the jump short. Any wheel, touch or key input cancels it.
 */
function nativeScrollTo(el: HTMLElement, reduced: boolean) {
  const start = window.scrollY;
  if (reduced) {
    window.scrollTo({ top: headingScrollTop(el), behavior: "instant" });
    return;
  }
  const duration = 650;
  const t0 = performance.now();
  let cancelled = false;
  const cancel = () => { cancelled = true; };
  const events = ["wheel", "touchstart", "keydown"] as const;
  events.forEach((ev) => window.addEventListener(ev, cancel, { passive: true, once: true }));
  const frame = (now: number) => {
    if (cancelled) return;
    const t = Math.min(1, (now - t0) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    window.scrollTo({ top: start + (headingScrollTop(el) - start) * eased, behavior: "instant" });
    if (t < 1) requestAnimationFrame(frame);
    else events.forEach((ev) => window.removeEventListener(ev, cancel));
  };
  requestAnimationFrame(frame);
}

/** Click handler for in-page links ('#id' or '/#id'): scrolls with `scrollTo` and updates the hash. */
function makeAnchorHandler(scrollTo: (el: HTMLElement) => void) {
  return (e: MouseEvent) => {
    const link = (e.target as HTMLElement).closest("a");
    const href = link?.getAttribute("href");
    if (!href) return;
    const hash = href.startsWith("/#") ? href.slice(1) : href.startsWith("#") ? href : null;
    if (!hash || hash.length < 2) return;
    try {
      const el = document.querySelector<HTMLElement>(hash);
      if (!el) return;
      e.preventDefault();
      scrollTo(el);
      history.pushState(null, "", hash);
    } catch {
      // Ignore an invalid selector
    }
  };
}

export function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Native scrolling is smoother on touch devices and for reduced-motion users; skip Lenis there.
    const native = window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches;
    if (native) {
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const onClick = makeAnchorHandler((el) => nativeScrollTo(el, reduced));
      document.addEventListener("click", onClick);
      return () => {
        window.removeEventListener("load", onLoad);
        document.removeEventListener("click", onClick);
      };
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after initial mount and deferred asset loading
    const timer1 = setTimeout(() => ScrollTrigger.refresh(), 250);
    const timer2 = setTimeout(() => ScrollTrigger.refresh(), 750);
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    // Intercept in-page hash links so every menu jump lands on the section's heading.
    const handleAnchorClick = makeAnchorHandler((el) => lenis.scrollTo(headingScrollTop(el)));

    document.addEventListener("click", handleAnchorClick);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("load", handleLoad);
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
    };
  }, []);

  return null;
}
