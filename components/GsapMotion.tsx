"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function GsapMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Respect users who ask for less motion: leave the page static.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Phones/tablets: keep one-shot entrances, drop endless loops and scroll-scrubbed parallax (battery + jank).
    const lite = window.matchMedia("(max-width: 1023px), (pointer: coarse)").matches;
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      // 1. Hero Content Cascading Staggered Entrance
      gsap.fromTo(
        "#hero-content > *",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power2.out",
          clearProps: "all",
        }
      );

      // 2. Hero Mascot Levitation (Mascot, desk, plant and idea bulb float together)
      gsap.to("#hero-mascot-wrap", {
        y: -10,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Idea bulb subtle inspiring pulse
      gsap.to("#hero-bulb", {
        scale: 1.08,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Hero contact shadow breathing in sync with mascot
      gsap.to("#hero-shadow", {
        scaleX: 0.9,
        opacity: 0.75,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 3. About Section: Feature pills stagger & mascot float
      gsap.fromTo(
        ".about-pill",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#about",
            start: "top 88%",
            once: true,
          },
          clearProps: "transform,opacity",
        }
      );

      gsap.to("#about-mascot-wrap", {
        y: -8,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 4. Flow Section: Stagger reveal of cards + pulsing directional arrows
      gsap.fromTo(
        ".flow-card",
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#flow",
            start: "top 88%",
            once: true,
          },
          clearProps: "transform,opacity",
        }
      );

      // Directional cascading flow wave (fading from back to front to guide the event journey)
      const mm = gsap.matchMedia();

      // Desktop: Flow wave sweeps horizontally left to right (Learn -> Innovate -> Pitch)
      mm.add("(min-width: 768px)", () => {
        const arrows = gsap.utils.toArray<HTMLElement>(".flow-arrow");
        if (arrows.length === 0) return;

        gsap.set(arrows, { opacity: 0.35, x: -8 });

        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 0.3,
          scrollTrigger: {
            trigger: "#flow",
            start: "top 90%",
            toggleActions: "play pause resume pause",
          },
        });

        arrows.forEach((arrow, idx) => {
          const startTime = idx * 0.45;
          tl.to(
            arrow,
            {
              opacity: 1,
              x: 8,
              duration: 0.65,
              ease: "power2.out",
              filter: "drop-shadow(0 0 10px rgba(124,58,237,0.5))",
            },
            startTime
          ).to(
            arrow,
            {
              opacity: 0.35,
              x: -8,
              duration: 0.5,
              ease: "power1.inOut",
              filter: "drop-shadow(0 0 0px rgba(124,58,237,0))",
            },
            startTime + 0.55
          );
        });
      });

      // Mobile: Flow wave sweeps vertically top to bottom
      mm.add("(max-width: 767px)", () => {
        const arrows = gsap.utils.toArray<HTMLElement>(".flow-arrow");
        if (arrows.length === 0) return;

        gsap.set(arrows, { opacity: 0.35, y: -8 });

        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 0.3,
          scrollTrigger: {
            trigger: "#flow",
            start: "top 90%",
            toggleActions: "play pause resume pause",
          },
        });

        arrows.forEach((arrow, idx) => {
          const startTime = idx * 0.45;
          tl.to(
            arrow,
            {
              opacity: 1,
              y: 8,
              duration: 0.65,
              ease: "power2.out",
              filter: "drop-shadow(0 0 10px rgba(124,58,237,0.5))",
            },
            startTime
          ).to(
            arrow,
            {
              opacity: 0.35,
              y: -8,
              duration: 0.5,
              ease: "power1.inOut",
              filter: "drop-shadow(0 0 0px rgba(124,58,237,0))",
            },
            startTime + 0.55
          );
        });
      });

      // 5. Tracks Section: Staggered bento cards
      gsap.fromTo(
        ".track-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#tracks",
            start: "top 88%",
            once: true,
          },
          clearProps: "transform,opacity",
        }
      );

      // 6. Rules Section: Sequential item slide-in + mascot float
      gsap.fromTo(
        ".rule-item",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.06,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#rules",
            start: "top 88%",
            once: true,
          },
          clearProps: "transform,opacity",
        }
      );

      gsap.to("#rules-mascot-wrap", {
        y: -7,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 7. Prizes Section: Staggered info + organic trophy floating
      gsap.fromTo(
        "#prizes-info > *",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#prizes",
            start: "top 88%",
            once: true,
          },
          clearProps: "transform,opacity",
        }
      );

      gsap.to("#trophy-img", {
        y: -10,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to("#trophy-shadow", {
        scale: 0.92,
        opacity: 0.7,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.fromTo(
        ".speaker-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#speakers",
            start: "top 88%",
            once: true,
          },
          clearProps: "transform,opacity",
        }
      );

      // 8. Timeline Section: Day 1 and Day 2 stagger cards
      gsap.fromTo(
        ".timeline-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#timeline",
            start: "top 88%",
            once: true,
          },
          clearProps: "transform,opacity",
        }
      );

      // 9. FAQs Section: Stagger accordion items
      gsap.fromTo(
        ".faq-card",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.45,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#faqs",
            start: "top 88%",
            once: true,
          },
          clearProps: "transform,opacity",
        }
      );

      gsap.to("#faq-mascot-wrap", {
        y: -8,
        duration: 3.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 10. Final CTA: Footer mascot remains grounded and static on desktop view

      // 10b. Artwork dividers: gentle fade + rise, once
      gsap.utils.toArray<HTMLElement>(".art-divider").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", clearProps: "transform,opacity", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
      });

      // 11. Section Dividers: expanding subtle line animation
      gsap.utils.toArray<HTMLElement>(".section-divider").forEach((divider) => {
        gsap.fromTo(
          divider.querySelectorAll(".section-divider-line"),
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: divider,
              start: "top 92%",
              once: true,
            },
            clearProps: "transform",
          }
        );
      });

      if (lite) {
        gsap.globalTimeline.getChildren(false, true, false).forEach((t) => {
          const tw = t as gsap.core.Tween;
          if (tw.repeat() === -1) tw.progress(0).kill();
          else if (tw.scrollTrigger && tw.vars.scrollTrigger && (tw.vars.scrollTrigger as ScrollTrigger.Vars).scrub) {
            tw.scrollTrigger.kill();
            tw.progress(0).kill();
          }
        });
      }
    });

    // Initial ScrollTrigger recalculation once React finishes painting
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return null;
}
