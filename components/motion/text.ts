// Section headings (SplitText), their eyebrows (ScrambleText) and leads, and the number count-ups.
import { gsap, ScrollTrigger, SplitText, riseIn, scrambleIn, type Kit } from "./core";

export function textMotion(k: Kit): void {
  const headings = k.qa("main section h2, #rewards h3").filter((h) => !h.closest("#hero"));
  for (const h of headings) {
    const eyebrow = h.previousElementSibling;
    const lead = h.nextElementSibling;
    if (eyebrow instanceof HTMLElement && eyebrow.tagName === "P" && k.below(eyebrow)) scrambleIn(eyebrow);
    if (k.below(h)) splitHeading(k, h);
    if (lead instanceof HTMLElement && lead.tagName === "P") riseIn(k, lead, 0.2);
  }
  countUps(k);
}

/**
 * Characters (words on touch devices) rise and turn into place, staggered. SplitText keeps the heading's
 * accessible name with aria-label and re-splits after the web fonts load or the layout changes.
 */
function splitHeading(k: Kit, h: HTMLElement): void {
  const fromCenter = !!h.closest("#final-cta");
  const split = SplitText.create(h, {
    type: k.fine ? "words,chars" : "words",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(k.fine ? self.chars : self.words, {
        autoAlpha: 0,
        yPercent: 80,
        rotationX: -80,
        transformPerspective: 700,
        transformOrigin: "50% 100%",
        duration: k.fine ? 0.9 : 0.7,
        ease: "back.out(1.4)",
        stagger: { each: k.fine ? 0.022 : 0.06, from: fromCenter ? "center" : "start" },
        scrollTrigger: { trigger: h, start: "top 86%", once: true },
      });
    },
  });
  k.cleanup(() => split.revert());
}

/** Numbers count up from zero as they come into view, then the original text is put back exactly. */
function countUps(k: Kit): void {
  for (const el of k.qa("[data-count]")) {
    if (!k.below(el)) continue;
    const original = el.textContent ?? "";
    const end = Number(original.replace(/[^\d]/g, ""));
    if (!Number.isFinite(end) || end <= 0) continue;
    const inr = el.dataset.count === "inr";
    const step = inr ? 50 : 1;
    const show = (n: number) => (inr ? `₹${n.toLocaleString("en-IN")}` : String(n));
    const counter = { value: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          value: end,
          duration: inr ? 1.6 : 1.1,
          ease: "power2.out",
          onUpdate: () => { el.textContent = show(Math.round(counter.value / step) * step); },
          onComplete: () => { el.textContent = original; },
        });
      },
    });
    // If the motion tier changes mid-count (a resize), put the real number back.
    k.cleanup(() => { if (el.textContent !== original) el.textContent = original; });
  }
}
