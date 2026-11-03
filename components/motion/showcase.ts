// The showpiece sections: Winners (with a confetti burst), the pinned Event Flow story, Tracks, and
// Prizes & Rewards.
import { gsap, ScrollTrigger, batchReveal, onEnter, riseIn, scrambleIn, strokes, tame, whileVisible, type Kit } from "./core";

export function showcaseMotion(k: Kit): void {
  winners(k);
  flow(k);
  tracks(k);
  prizes(k);
  kiroPills(k);
}

const CONFETTI = ["#fbbf24", "#f472b6", "#a78bfa", "#34d399", "#fde68a", "#c4b5fd", "#ffffff"];

/** A one-time celebration from the trophy, with Physics2D giving every piece its own arc. */
function confetti(k: Kit, panel: HTMLElement, origin: HTMLElement): void {
  const layer = document.createElement("div");
  layer.setAttribute("aria-hidden", "true");
  layer.style.cssText = "position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:30";
  panel.appendChild(layer);
  k.cleanup(() => layer.remove());
  const p = panel.getBoundingClientRect();
  const o = origin.getBoundingClientRect();
  const x = o.left - p.left + o.width / 2;
  const y = o.top - p.top + o.height * 0.35;
  const count = k.fine ? 56 : 30;
  for (let i = 0; i < count; i++) {
    const bit = document.createElement("i");
    const w = gsap.utils.random(6, 11);
    const h = gsap.utils.random(8, 15);
    bit.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:${CONFETTI[i % CONFETTI.length]};border-radius:${i % 3 === 0 ? "50%" : "2px"}`;
    layer.appendChild(bit);
    gsap.timeline({ onComplete: () => bit.remove() })
      .to(bit, {
        duration: gsap.utils.random(1.8, 2.8),
        physics2D: { velocity: gsap.utils.random(320, 680), angle: gsap.utils.random(205, 335), gravity: 820 },
        rotation: gsap.utils.random(-900, 900),
        rotationX: gsap.utils.random(-360, 360),
        ease: "none",
      })
      .to(bit, { autoAlpha: 0, duration: 0.6 }, "-=0.7");
  }
}

/** The panel opens, the trophy drops in with a bounce and bursts into confetti, then the team cards flip in. */
function winners(k: Kit): void {
  const section = k.q("#winners");
  if (!section) return;
  const panel = k.q("[data-winners-panel]", section);
  const head = k.q("[data-winners-head]", section);
  const trophy = k.q("[data-winners-trophy]", section);
  if (panel && k.below(panel)) {
    gsap.fromTo(
      panel,
      { clipPath: "inset(10% 6% 10% 6% round 2rem)", y: 70 },
      { clipPath: "inset(0% 0% 0% 0% round 2rem)", y: 0, duration: 1.3, ease: "bv.out", clearProps: "clipPath,transform", scrollTrigger: { trigger: panel, start: "top 85%", once: true } },
    );
  }

  // The trophy keeps floating once it has landed, only while the section is on screen.
  const intro = !!(head && trophy && panel && k.below(head));
  let landed = !intro;
  const float = trophy ? gsap.to(trophy, { y: -8, rotation: 3, duration: 2.6, ease: "sine.inOut", repeat: -1, yoyo: true, paused: true }) : null;
  const seen = float
    ? ScrollTrigger.create({ trigger: section, start: "top bottom", end: "bottom top", onToggle: (s) => (s.isActive && landed ? float.resume() : float.pause()) })
    : null;

  if (intro && head && trophy && panel) {
    const tl = onEnter(head, "top 80%", {
      onComplete: () => {
        landed = true;
        if (seen?.isActive) float?.resume();
      },
    });
    tl.from(trophy, { autoAlpha: 0, y: -140, rotation: -18, scale: 0.6, duration: 1.3, ease: "bounce.out" }, 0.2);
    const text = trophy.nextElementSibling;
    if (text) tl.from(text.children, { autoAlpha: 0, y: 24, stagger: 0.1, duration: 0.7, ease: "bv.out" }, 0.45);
    tl.call(() => confetti(k, panel, trophy), undefined, 1.05);
  }

  const cards = k.qa("[data-winner-card]", section);
  tame(cards);
  batchReveal(k, cards, { rotationY: -70, x: -40, transformPerspective: 1300, transformOrigin: "0% 50%" }, {
    stagger: { each: 0.18 },
    duration: 1.1,
    keepTransform: k.fine,
    then: (batch) => batch.forEach((card, i) => {
      const [pill, ...rest] = Array.from(card.children);
      const members = card.querySelectorAll("ul > li");
      const tl = gsap.timeline({ delay: 0.35 + i * 0.18, defaults: { ease: "bv.out" } });
      if (pill) tl.from(pill, { scale: 0, rotation: -12, duration: 0.6, ease: "back.out(2.4)" });
      if (rest.length) tl.from(rest, { autoAlpha: 0, y: 14, stagger: 0.06, duration: 0.5 }, "<0.1");
      if (members.length) tl.from(members, { autoAlpha: 0, x: -12, stagger: 0.06, duration: 0.45 }, "<0.2");
    }),
  });
}

/**
 * Event Flow. Desktop: "Learn" arrives with the stage, then the stage is pinned and the scroll itself brings
 * in "Innovate" and "Pitch", one after the other. Elsewhere: a staggered reveal. The arrows keep pointing the way.
 */
function flow(k: Kit): void {
  const section = k.q("#flow");
  const stage = section ? k.q("[data-flow-stage]", section) : null;
  if (!section || !stage) return;
  const cards = k.qa(".flow-card", stage);
  const arrows = k.qa(".flow-arrow", stage);
  tame(cards);
  tame(k.qa("[data-flow-num]", stage));
  const canPin = k.fine && window.innerHeight >= 680 && stage.offsetHeight < window.innerHeight * 0.78 && k.below(stage);
  if (canPin) {
    pinnedFlow(stage, cards, arrows);
  } else {
    batchReveal(k, cards, { y: 60, rotationX: -18, transformPerspective: 1000, transformOrigin: "50% 100%" }, { stagger: { each: 0.16 } });
    batchReveal(k, arrows, { scale: 0.4, rotation: -30 }, { stagger: { each: 0.16 }, ease: "back.out(2)", delay: 0.3 });
  }
  riseIn(k, stage.nextElementSibling, 0.1);
  const sideways = window.matchMedia("(min-width: 768px)").matches;
  arrows.forEach((arrow, i) => {
    const img = arrow.querySelector("img");
    if (!img) return;
    tame([img]);
    whileVisible(section, gsap.to(img, { [sideways ? "x" : "y"]: 9, duration: 0.75, ease: "sine.inOut", repeat: -1, yoyo: true, delay: i * 0.35 }));
  });
}

function pinnedFlow(stage: HTMLElement, cards: HTMLElement[], arrows: HTMLElement[]): void {
  const [first, ...rest] = cards;
  // "Learn" arrives as soon as the stage scrolls in, so the stage is never an empty block...
  if (first) flowCardIn(onEnter(stage, "top 85%", { defaults: { ease: "bv.out", duration: 1 } }), first, 0);
  // ...then the stage holds still while the scroll itself brings in each next phase after its arrow.
  const tl = gsap.timeline({
    defaults: { ease: "power3.out", duration: 1 },
    scrollTrigger: {
      trigger: stage,
      start: "center 55%",
      end: () => `+=${Math.round(window.innerHeight * 0.9)}`,
      pin: true,
      scrub: 0.7,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });
  rest.forEach((card, i) => {
    const at = i * 1.3;
    const arrow = arrows[i];
    if (arrow) tl.from(arrow, { autoAlpha: 0, x: -50, scale: 0.4, duration: 0.6, ease: "back.out(2)" }, at);
    flowCardIn(tl, card, at + 0.3);
  });
  tl.to({}, { duration: 0.4 });
}

/** One phase card assembling itself: the card rises and turns up, then its number, art and copy follow. */
function flowCardIn(tl: gsap.core.Timeline, card: HTMLElement, at: number): void {
  tl.from(card, { autoAlpha: 0, y: 110, rotationX: -32, transformPerspective: 1100, transformOrigin: "50% 100%" }, at);
  const num = card.querySelector("[data-flow-num]");
  const art = card.querySelector("[data-flow-art]");
  const texts = card.querySelectorAll("[data-flow-text]");
  if (num) tl.from(num, { autoAlpha: 0, scale: 1.8, x: 30, duration: 0.8 }, at + 0.25);
  if (art) tl.from(art, { autoAlpha: 0, y: 50, scale: 0.7, rotation: -10, duration: 0.9, ease: "back.out(1.7)" }, at + 0.3);
  if (texts.length) tl.from(texts, { autoAlpha: 0, y: 22, stagger: 0.12, duration: 0.6 }, at + 0.45);
}

/** Theme cards fall into a 3D grid stagger; each icon pops and draws itself, its number decodes, its chips follow. */
function tracks(k: Kit): void {
  const section = k.q("#tracks");
  if (!section) return;
  riseIn(k, k.q("h2 ~ p ~ p", section), 0.25);
  riseIn(k, k.q("ul + p", section), 0.1);
  const cards = k.qa("li.track-card", section);
  tame(cards.map((li) => li.querySelector("button")).filter((b): b is HTMLButtonElement => !!b));
  batchReveal(k, cards, { y: 80, rotationX: -22, transformPerspective: 1200, transformOrigin: "50% 0%" }, {
    stagger: { each: 0.12, grid: "auto", from: "start" },
    then: (batch) => batch.forEach((li, i) => {
      const icon = li.querySelector("[data-track-icon]");
      const num = li.querySelector("[data-track-num]");
      const chips = li.querySelectorAll("[data-track-chips] > li");
      const tl = gsap.timeline({ delay: 0.25 + i * 0.12 });
      if (icon) tl.from(icon, { scale: 0, rotation: -70, duration: 0.8, ease: "back.out(2.4)" }, 0);
      const lines = strokes(icon?.querySelector("svg"));
      if (lines.length) tl.from(lines, { drawSVG: 0, duration: 0.9, stagger: 0.06, ease: "power2.inOut" }, 0.15);
      if (num) tl.to(num, { duration: 0.9, ease: "none", scrambleText: { text: num.textContent ?? "", chars: "0123456789", speed: 0.7 } }, 0.1);
      if (chips.length) tl.from(chips, { autoAlpha: 0, y: 10, scale: 0.8, stagger: 0.05, duration: 0.45, ease: "back.out(2)" }, 0.3);
    }),
  });
}

/** "Powered by KIRO" pills pop in and the KIRO mark gives a small wiggle (the hero pill is part of the intro). */
function kiroPills(k: Kit): void {
  for (const pill of k.qa("[data-kiro-pill]")) {
    if (pill.closest("#hero") || !k.below(pill)) continue;
    const logo = pill.querySelector("img");
    const tl = onEnter(pill, "top 92%");
    tl.from(pill, { autoAlpha: 0, scale: 0.6, duration: 0.8, ease: "back.out(2.2)", clearProps: "transform,opacity,visibility" });
    if (logo) tl.fromTo(logo, { rotation: 0 }, { rotation: 8, duration: 1, ease: "bv.wiggle" }, 0.3);
  }
}

/** The prize art springs in, the trophy drops and bounces, and the reward cards flip open one by one. */
function prizes(k: Kit): void {
  const section = k.q("#prizes");
  if (!section) return;
  const art = k.q("[data-prize-art]", section);
  const artImg = art?.querySelector("img");
  if (artImg && k.below(artImg)) {
    gsap.from(artImg, { autoAlpha: 0, scale: 0.45, rotation: -8, duration: 1.5, ease: "elastic.out(1, 0.55)", scrollTrigger: { trigger: artImg, start: "top 88%", once: true } });
  }
  const label = art?.querySelector("p:last-child");
  if (label instanceof HTMLElement && k.below(label)) scrambleIn(label);
  riseIn(k, k.q("#prizes-info > [data-prize-art] + p", section), 0.2);

  // The trophy and its glow keep floating once the trophy has landed, only while the section is visible.
  const trophy = k.q("#trophy-img", section);
  const shadow = k.q("#trophy-shadow", section);
  const ghost = k.q("#prizes-trophy-column .kiro-float", section);
  const trophyArt = trophy?.querySelector("img");
  const loops = gsap.timeline({ repeat: -1, yoyo: true, paused: true, defaults: { duration: 2.8, ease: "sine.inOut" } });
  if (trophyArt) loops.to(trophyArt, { y: -12, rotation: 2 }, 0);
  if (shadow) loops.to(shadow, { scale: 0.9, opacity: 0.7 }, 0);
  let landed = !(trophy && k.below(trophy));
  const seen = ScrollTrigger.create({ trigger: section, start: "top bottom", end: "bottom top", onToggle: (s) => (s.isActive && landed ? loops.resume() : loops.pause()) });
  if (trophy && !landed) {
    const tl = onEnter(trophy, "top 85%", {
      onComplete: () => {
        landed = true;
        if (seen.isActive) loops.resume();
      },
    });
    tl.from(trophy, { autoAlpha: 0, y: -160, rotation: -14, duration: 1.3, ease: "bounce.out" });
    if (shadow) tl.from(shadow, { scale: 0.2, autoAlpha: 0, duration: 1 }, 0.5);
    // The KIRO ghost floats with its own CSS animation, so only its opacity is animated here.
    if (ghost) tl.from(ghost, { autoAlpha: 0, duration: 0.8 }, 0.9);
  }

  const rewards = k.q("#rewards", section);
  if (!rewards) return;
  const cards = k.qa("[data-reward-card]", rewards);
  tame(cards);
  batchReveal(k, cards, { rotationY: -45, x: -30, transformPerspective: 1200, transformOrigin: "0% 50%" }, {
    stagger: { each: 0.12, from: "start" },
    keepTransform: k.fine,
    then: (batch) => batch.forEach((card, i) => {
      const items = card.querySelectorAll(":scope > ul > li");
      const badges = card.querySelectorAll("img");
      const tl = gsap.timeline({ delay: 0.3 + i * 0.12 });
      if (items.length) tl.from(items, { autoAlpha: 0, x: -14, stagger: 0.08, duration: 0.5, ease: "bv.out" }, 0);
      if (badges.length) tl.from(badges, { scale: 0, rotation: -40, duration: 0.7, ease: "back.out(2.2)", stagger: { each: 0.08, from: "random" } }, 0.2);
    }),
  });
  riseIn(k, k.q("[data-reward-banner]", rewards), 0.1);
}
