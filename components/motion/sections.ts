// Entrances and ambient motion for the content sections: dividers, About, Speakers, Rules, FAQs,
// Contact and the closing call to action.
import { gsap, batchReveal, onEnter, riseIn, strokes, tame, whileVisible, type Kit } from "./core";

export function sectionMotion(k: Kit): void {
  dividers(k);
  artDividers(k);
  about(k);
  speakers(k);
  rules(k);
  faqs(k);
  contact(k);
  finalCta(k);
  sparkles(k);
}

/** The divider lines draw out from the centre, the diamond spins into place and the dots pop. */
function dividers(k: Kit): void {
  for (const div of k.qa(".section-divider")) {
    if (!k.below(div)) continue;
    const lines = k.qa(".section-divider-line", div);
    const marks = lines[0]?.nextElementSibling ? Array.from(lines[0].nextElementSibling.children) : [];
    const [dotA, diamond, dotB] = marks;
    const tl = onEnter(div, "top 92%", { defaults: { ease: "bv.inOut" } });
    tl.from(lines, { scaleX: 0, duration: 1.2 });
    if (diamond) tl.from(diamond, { scale: 0, rotation: -315, duration: 1, ease: "back.out(2.6)" }, 0.15);
    if (dotA && dotB) tl.from([dotA, dotB], { scale: 0, duration: 0.5, ease: "back.out(3)", stagger: { each: 0.12, from: "center" } }, 0.35);
  }
}

/** The plane and star trails are drawn across the page by the scroll itself, and drift slightly on desktop. */
function artDividers(k: Kit): void {
  for (const div of k.qa(".art-divider")) {
    const img = div.querySelector("img");
    if (!img) continue;
    if (k.below(div)) {
      gsap.fromTo(img, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: div, start: "top 95%", end: "center 55%", scrub: k.fine ? 0.6 : true } });
    }
    if (k.fine) gsap.fromTo(img, { xPercent: -3 }, { xPercent: 3, ease: "none", scrollTrigger: { trigger: div, start: "top bottom", end: "bottom top", scrub: 1 } });
  }
}

/** A mascot that floats while its section is visible and, on desktop, drifts against the scroll. */
function mascotLife(k: Kit, section: Element, wrap: HTMLElement, float: gsap.TweenVars, drift = 40): void {
  const art = wrap.querySelector("img");
  if (art) whileVisible(section, gsap.to(art, { duration: 3.4, ease: "sine.inOut", repeat: -1, yoyo: true, ...float }));
  if (k.fine) gsap.fromTo(wrap, { y: drift }, { y: -drift, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.8 } });
}

function about(k: Kit): void {
  const section = k.q("#about");
  if (!section) return;
  // The first paragraph is the heading's lead (see text.ts); the second follows a beat later.
  k.qa("h2 ~ p", section).slice(1).forEach((p) => riseIn(k, p, 0.25));
  const pills = k.qa(".about-pill", section);
  tame(pills);
  batchReveal(k, pills, { y: 36, scale: 0.86 }, {
    ease: "back.out(1.7)",
    stagger: { each: 0.12, from: "start" },
    keepTransform: k.fine,
    // Each pill's icon draws its own strokes once the pill has landed.
    then: (batch) => batch.forEach((pill, i) => {
      const lines = strokes(pill.querySelector("svg"));
      if (lines.length) gsap.from(lines, { drawSVG: 0, duration: 1, ease: "power2.inOut", stagger: 0.08, delay: 0.3 + i * 0.12 });
    }),
  });
  const mascot = k.q("#about-mascot-wrap", section);
  if (!mascot) return;
  if (k.below(mascot)) {
    gsap.from(mascot, { autoAlpha: 0, x: -90, rotation: -8, duration: 1.6, ease: "elastic.out(1, 0.75)", scrollTrigger: { trigger: mascot, start: "top 85%", once: true } });
  }
  mascotLife(k, section, mascot, { y: -10 });
}

/** Posters are unveiled from the bottom while the photo settles; the details and links follow in turn. */
function speakers(k: Kit): void {
  const cards = k.qa(".speaker-card");
  tame(cards);
  tame(k.qa(".speaker-card [data-speaker-poster] img"));
  batchReveal(k, cards, { y: 90, rotation: 1.5 }, {
    stagger: { each: 0.16 },
    keepTransform: k.fine,
    then: (batch) => batch.forEach((card, i) => {
      const poster = k.q("[data-speaker-poster]", card);
      const photo = poster?.querySelector("img");
      const info = k.qa("[data-speaker-meta] > div:first-child > *", card);
      const links = k.qa("a[href*='linkedin']", card);
      const tl = gsap.timeline({ delay: i * 0.16 });
      if (poster) tl.fromTo(poster, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "bv.inOut", clearProps: "clipPath" }, 0);
      if (photo) tl.from(photo, { scale: 1.3, duration: 1.6, ease: "bv.out" }, 0);
      if (info.length) tl.from(info, { autoAlpha: 0, y: 18, stagger: 0.08, duration: 0.6, ease: "bv.out" }, 0.45);
      if (links.length) tl.from(links, { autoAlpha: 0, scale: 0.7, stagger: 0.07, duration: 0.5, ease: "back.out(2)" }, 0.8);
    }),
  });
}

/** The panel rises, the rules slide in one after another and each number badge spins into place. */
function rules(k: Kit): void {
  const section = k.q("#rules");
  if (!section) return;
  riseIn(k, k.q("[data-rules-panel]", section), 0);
  batchReveal(k, k.qa(".rule-item", section), { x: -46 }, {
    stagger: { each: 0.08 },
    then: (batch) => {
      const badges = batch.map((li) => li.firstElementChild).filter((b): b is Element => !!b);
      if (badges.length) gsap.from(badges, { scale: 0, rotation: -120, duration: 0.7, ease: "back.out(2.6)", stagger: 0.08, delay: 0.12 });
    },
  });
  const mascot = k.q("#rules-mascot-wrap", section);
  if (!mascot) return;
  if (k.below(mascot)) {
    gsap.from(mascot, { autoAlpha: 0, x: 90, rotation: 10, duration: 1.6, ease: "elastic.out(1, 0.7)", scrollTrigger: { trigger: mascot, start: "top 85%", once: true } });
  }
  mascotLife(k, section, mascot, { y: -9, rotation: 1.5, duration: 3.6 }, 30);
}

/** Questions cascade in like cards being dealt; the mascot pops up and keeps bobbing. */
function faqs(k: Kit): void {
  const section = k.q("#faqs");
  if (!section) return;
  const cards = k.qa("details.faq-card", section);
  tame(cards);
  batchReveal(k, cards, { y: 30, rotationX: -24, transformPerspective: 900, transformOrigin: "50% 0%" }, { stagger: { each: 0.07 } });
  const mascot = k.q("#faq-mascot-wrap", section);
  if (!mascot) return;
  if (k.below(mascot)) {
    gsap.from(mascot, { autoAlpha: 0, scale: 0.5, rotation: -14, transformOrigin: "50% 100%", duration: 1.5, ease: "elastic.out(1, 0.6)", scrollTrigger: { trigger: mascot, start: "top 85%", once: true } });
  }
  const art = mascot.querySelector("img");
  if (art) whileVisible(section, gsap.to(art, { y: -10, duration: 3.3, ease: "sine.inOut", repeat: -1, yoyo: true }));
}

/** Contact cards rise in turn and each phone icon gives a little ring (CustomWiggle). */
function contact(k: Kit): void {
  const links = k.qa("#contact ul > li > a");
  tame(links);
  batchReveal(k, links, { y: 46, scale: 0.94 }, {
    stagger: { each: 0.12 },
    keepTransform: k.fine,
    then: (batch) => batch.forEach((a, i) => {
      const icon = a.querySelector("span");
      if (icon) gsap.fromTo(icon, { rotation: 0 }, { rotation: 16, duration: 1.1, ease: "bv.wiggle", delay: 0.35 + i * 0.12 });
    }),
  });
}

/** The closing scene: the campus panorama settles in, the mascot rises from the hills and waves. */
function finalCta(k: Kit): void {
  const section = k.q("#final-cta");
  if (!section) return;
  const actions = k.q("[data-cta-actions]", section);
  if (actions && k.below(actions)) {
    gsap.from(actions.children, {
      autoAlpha: 0, y: 30, scale: 0.9, stagger: 0.12, duration: 0.8, ease: "back.out(1.7)",
      clearProps: "transform,opacity,visibility",
      scrollTrigger: { trigger: actions, start: "top 92%", once: true },
    });
  }
  const mascot = k.q("#final-cta-mascot", section);
  const wave = mascot?.querySelector("img");
  if (mascot && k.below(mascot)) {
    gsap.from(mascot, { autoAlpha: 0, yPercent: 70, duration: 1.2, ease: "back.out(1.6)", scrollTrigger: { trigger: section, start: "top 60%", once: true } });
  }
  if (wave) whileVisible(section, gsap.fromTo(wave, { rotation: -4 }, { rotation: 4, transformOrigin: "50% 100%", duration: 1.6, ease: "sine.inOut", repeat: -1, yoyo: true }));
  const logo = k.q("[data-cta-logo]", section);
  if (logo && k.below(logo)) {
    gsap.from(logo, { autoAlpha: 0, y: 30, duration: 1, delay: 0.3, ease: "bv.out", scrollTrigger: { trigger: section, start: "top 60%", once: true } });
  }
  const scene = k.qa("#campus-scene img", section);
  if (k.fine && scene.length) {
    gsap.fromTo(scene, { scale: 1.16, yPercent: 7 }, { scale: 1.01, yPercent: 0, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom bottom", scrub: 1 } });
  }
}

/** The corner sparkles drift and turn slowly while their section is on screen. */
function sparkles(k: Kit): void {
  k.qa("[data-sparkle] img").forEach((img, i) => {
    const holder = img.closest("section") ?? img;
    whileVisible(holder, gsap.to(img, { rotation: i % 2 ? -8 : 8, y: -10, duration: 4.5, ease: "sine.inOut", repeat: -1, yoyo: true }));
  });
}
