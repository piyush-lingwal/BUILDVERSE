"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Native scrolling is smoother on touch devices and for reduced-motion users; skip Lenis there.
    const native = window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches;
    if (native) {
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
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

    // Intercept in-page hash links for fluid, smooth scrolling with navbar offset
    // Handles both '#section' and '/#section' href formats
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;
      // Normalise '/#section' → '#section'
      const hash = href.startsWith("/#") ? href.slice(1) : href.startsWith("#") ? href : null;
      if (!hash || hash.length < 2) return;
      try {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          e.preventDefault();
          // Measure the actual sticky header height at click time so the section
          // lands precisely at the bottom edge of the navbar on any screen size.
          const navbarEl = document.querySelector("header");
          const navbarHeight = navbarEl ? navbarEl.offsetHeight : 70;
          lenis.scrollTo(targetElement as HTMLElement, { offset: -navbarHeight });
          history.pushState(null, "", hash);
        }
      } catch {
        // Ignore invalid selector
      }
    };

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
