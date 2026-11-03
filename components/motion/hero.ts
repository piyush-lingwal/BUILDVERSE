// Hero: an intro timeline that starts from the first frame painted before hydration, ambient loops,
// pointer depth on desktop and a scroll-out as the visitor moves on.
import { gsap, whileVisible, type Kit } from "./core";

/** After this, the CSS fallback in globals.css has already revealed the hero, so it is not hidden again. */
const INTRO_CUTOFF_MS = 2400;

/** Runs at once, before the first frame is released: returns whether the intro is playing. */
export function heroIntro(k: Kit): boolean {
  const hero = k.q("#hero");
  if (!hero || performance.now() >= INTRO_CUTOFF_MS) return false;
  playIntro(k, hero, document.querySelector<HTMLElement>('header[data-intro="header"]'));
  return true;
}

/** Queued with the rest of the setup: the ambient loops and, on desktop, pointer depth and the scroll-out. */
export function heroMotion(k: Kit, introPlayed: boolean): void {
  const hero = k.q("#hero");
  if (!hero) return;
  ambient(k, hero, introPlayed ? 1.5 : 0);
  if (k.fine) {
    pointerDepth(k, hero);
    scrollOut(hero);
  }
}

function playIntro(k: Kit, hero: HTMLElement, header: HTMLElement | null): void {
  const lcp = k.qa('[data-intro="lcp"]', hero);
  const faded = k.qa('[data-intro]:not([data-intro="lcp"])', hero);
  const tagline = k.q("[data-hero-tagline]", hero);
  const actions = k.q("[data-hero-actions]", hero);
  const kiro = k.q("[data-kiro-pill]", hero);
  const status = k.q("[data-hero-status]", hero);

  // Exactly the frame the CSS painted before hydration, now held by GSAP.
  gsap.set(lcp, { y: 28, scale: 0.97 });
  if (header) gsap.set(header, { yPercent: -100 });
  gsap.set(faded, { autoAlpha: 0 });

  const tl = gsap.timeline({ defaults: { ease: "bv.out", duration: k.fine ? 1 : 0.8 }, delay: 0.05 });
  if (header) tl.to(header, { yPercent: 0, duration: 0.9, clearProps: "transform" }, 0);
  tl.to(lcp, { y: 0, scale: 1, duration: 1.3, stagger: 0.12, clearProps: "transform" }, 0);

  faded.forEach((el, i) => {
    const at = 0.15 + i * 0.09;
    if (el === tagline) {
      // "Learn. Innovate. Pitch." decodes itself, in keeping with the mono, technical type.
      tl.set(el, { autoAlpha: 1 }, at).to(el, { duration: 1.1, ease: "none", scrambleText: { text: el.textContent ?? "", chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ.", revealDelay: 0.15, speed: 0.6 } }, at);
    } else if (kiro && el.contains(kiro)) {
      tl.fromTo(el, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.8, ease: "back.out(2.2)", clearProps: "transform" }, at);
      const logo = kiro.querySelector("img");
      if (logo) tl.fromTo(logo, { rotation: 0 }, { rotation: 9, duration: 1, ease: "bv.wiggle" }, at + 0.35);
    } else if (el === actions) {
      tl.set(el, { autoAlpha: 1 }, at).from(el.children, { autoAlpha: 0, y: 24, scale: 0.92, stagger: 0.1, duration: 0.75, ease: "back.out(1.6)", clearProps: "transform,opacity,visibility" }, at);
    } else {
      tl.fromTo(el, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, clearProps: "transform" }, at);
    }
  });

  const badge = status?.querySelector("span");
  if (badge) tl.from(badge, { scale: 0, rotation: -180, duration: 0.8, ease: "back.out(2.5)" }, 0.75);
  const shadow = k.q("#hero-shadow", hero);
  if (shadow) tl.from(shadow, { scaleX: 0.3, autoAlpha: 0, duration: 1.2 }, 0.2);
  const bulb = k.q("#hero-bulb", hero);
  if (bulb) tl.from(bulb, { scale: 0, autoAlpha: 0, duration: 0.9, ease: "back.out(3)" }, 0.6);
}

/** The mascot floats, its shadow breathes and the idea bulb glows, only while the hero is on screen. */
function ambient(k: Kit, hero: HTMLElement, delay: number): void {
  const mascot = k.q("#hero-mascot", hero);
  const shadow = k.q("#hero-shadow", hero);
  const bulb = k.q("#hero-bulb", hero);
  const loop = gsap.timeline({ repeat: -1, yoyo: true, delay, defaults: { duration: 3.2, ease: "sine.inOut" } });
  if (mascot) loop.to(mascot, { y: -12 }, 0);
  if (shadow) loop.to(shadow, { scaleX: 0.86, opacity: 0.7 }, 0);
  if (bulb) loop.to(bulb, { scale: 1.14, duration: 1.6, repeat: 1, yoyo: true }, 0);
  whileVisible(hero, loop);
}

/** Desktop: the scene leans toward the pointer and a soft light follows it. */
function pointerDepth(k: Kit, hero: HTMLElement): void {
  const mascot = k.q("#hero-mascot", hero);
  const bulb = k.q("#hero-bulb", hero);
  const content = k.q("#hero-content", hero);
  const glow = k.q("[data-hero-glow]", hero);
  const to = (el: Element | null, prop: string, duration = 0.8) => (el ? gsap.quickTo(el, prop, { duration, ease: "power3.out" }) : null);
  const mx = to(mascot, "x");
  const mr = to(mascot, "rotation");
  const bx = to(bulb, "x");
  const by = to(bulb, "y");
  const cx = to(content, "x", 1.1);
  const gx = to(glow, "x", 1.2);
  const gy = to(glow, "y", 1.2);
  const half = glow ? glow.offsetWidth / 2 : 0;

  const move = (e: PointerEvent) => {
    const r = hero.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    mx?.(nx * 28);
    mr?.(nx * 4);
    bx?.(nx * 46);
    by?.(ny * 30);
    cx?.(nx * -10);
    gx?.(e.clientX - r.left - half);
    gy?.(e.clientY - r.top - half);
  };
  const enter = () => {
    if (glow) gsap.to(glow, { autoAlpha: 1, duration: 0.6, overwrite: "auto" });
  };
  const leave = () => {
    mx?.(0);
    mr?.(0);
    bx?.(0);
    by?.(0);
    cx?.(0);
    if (glow) gsap.to(glow, { autoAlpha: 0, duration: 0.8, overwrite: "auto" });
  };
  hero.addEventListener("pointermove", move);
  hero.addEventListener("pointerenter", enter);
  hero.addEventListener("pointerleave", leave);
  k.cleanup(() => {
    hero.removeEventListener("pointermove", move);
    hero.removeEventListener("pointerenter", enter);
    hero.removeEventListener("pointerleave", leave);
  });
}

/** Desktop: as the hero scrolls away, the mascot sinks and shrinks while the copy lifts and dims. */
function scrollOut(hero: HTMLElement): void {
  const art = hero.querySelector("#hero-mascot img");
  const content = hero.querySelector("#hero-content");
  if (art) gsap.to(art, { yPercent: 14, scale: 0.92, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 } });
  if (content) gsap.to(content, { y: -70, opacity: 0.35, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 } });
}
