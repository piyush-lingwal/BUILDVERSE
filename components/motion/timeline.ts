// The event timeline: the dark panel opens, the phase strip flips in, and the route is drawn stage by
// stage as the visitor scrolls (scrubbed spine, popping nodes, cards that slide in with their details).
import { gsap, batchReveal, onEnter, riseIn, tame, whileVisible, type Kit } from "./core";

export function timelineMotion(k: Kit): void {
  const section = k.q("#timeline");
  const panel = section ? k.q(".timeline-card", section) : null;
  if (!section || !panel) return;

  if (k.below(panel)) {
    gsap.fromTo(
      panel,
      { clipPath: "inset(10% 6% 10% 6% round 2rem)", y: 80 },
      { clipPath: "inset(0% 0% 0% 0% round 2rem)", y: 0, duration: 1.3, ease: "bv.out", clearProps: "clipPath,transform", scrollTrigger: { trigger: panel, start: "top 85%", once: true } },
    );
  }
  // The two coloured glows drift slowly behind the route (desktop, while visible).
  if (k.fine) {
    k.qa(":scope > .blur-3xl", panel).forEach((blob, i) => {
      whileVisible(panel, gsap.to(blob, { x: i ? -60 : 70, y: i ? -40 : 50, scale: 1.15, duration: 7 + i * 2, ease: "sine.inOut", repeat: -1, yoyo: true }));
    });
  }

  const status = k.q("[data-tl-status]", panel);
  if (k.below(status)) {
    gsap.from(status, { autoAlpha: 0, y: 14, duration: 0.7, ease: "bv.out", delay: 0.4, clearProps: "transform,opacity,visibility", scrollTrigger: { trigger: panel, start: "top 80%", once: true } });
  }
  batchReveal(k, k.qa("[data-tl-phase]", panel), { y: 40, rotationX: -65, transformPerspective: 900, transformOrigin: "50% 0%" }, { stagger: { each: 0.14, from: "start" }, delay: 0.3, start: "top 90%" });

  tame(k.qa("[data-tl-card]", panel));
  // Each day and each stage is its own small setup job, in page order.
  for (const row of k.qa("[data-tl-day], [data-tl-step]", panel)) {
    k.later(() => (row.matches("[data-tl-day]") ? dayHeader(k, row) : stage(k, row)));
  }
  k.later(() => riseIn(k, k.q("[data-tl-attribution]", section)));
}

/** The spine segment grows with scroll, so the route is drawn exactly as fast as it is read. */
function drawLine(k: Kit, trigger: Element): void {
  const line = k.q("[data-tl-line]", trigger);
  if (!line) return;
  gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, transformOrigin: "50% 0%", ease: "none", scrollTrigger: { trigger, start: "top 80%", end: "bottom 80%", scrub: k.fine ? 0.4 : true } });
}

function dayHeader(k: Kit, day: HTMLElement): void {
  drawLine(k, day);
  if (!k.below(day)) return;
  const diamond = k.q("[data-tl-diamond]", day);
  const numeral = k.q("[data-tl-numeral]", day);
  const meta = k.q("[data-tl-daymeta]", day);
  const art = k.q("[data-tl-dayart]", day);
  const tl = onEnter(day, "top 82%", { defaults: { ease: "bv.out" } });
  if (diamond) tl.from(diamond, { scale: 0, rotation: -315, duration: 0.9, ease: "back.out(3)" }, 0);
  if (numeral) {
    tl.from(numeral, { autoAlpha: 0, yPercent: 35, duration: 0.7 }, 0.1)
      .to(numeral, { duration: 1, ease: "none", scrambleText: { text: numeral.textContent ?? "", chars: "0123456789", speed: 0.6 } }, 0.1);
  }
  if (meta) tl.from(meta.children, { autoAlpha: 0, y: 18, stagger: 0.08, duration: 0.6 }, 0.25);
  if (art) tl.from(art, { autoAlpha: 0, x: 70, rotation: 8, duration: 1.3, ease: "elastic.out(1, 0.6)" }, 0.3);
}

function stage(k: Kit, step: HTMLElement): void {
  drawLine(k, step);
  if (!k.below(step)) return;
  const node = k.q("[data-tl-node]", step);
  const time = k.q("[data-tl-time]", step);
  const card = k.q("[data-tl-card]", step);
  const tl = onEnter(step, "top 82%", { defaults: { ease: "bv.out" } });
  if (node) tl.from(node, { scale: 0, rotation: -120, duration: 0.8, ease: "back.out(2.4)" }, 0);
  if (time) tl.from(time, { autoAlpha: 0, x: -30, duration: 0.7 }, 0.1);
  if (!card) return;
  tl.from(card, { autoAlpha: 0, x: 60, rotationY: -10, transformPerspective: 1200, transformOrigin: "0% 50%", duration: 0.9, clearProps: "transform" }, 0.1)
    .from(card.children, { autoAlpha: 0, y: 14, stagger: 0.07, duration: 0.55 }, 0.3);
  const sessions = k.qa("[data-tl-session]", card);
  if (sessions.length) tl.from(sessions, { autoAlpha: 0, x: 24, stagger: 0.08, duration: 0.5 }, 0.55);
}
