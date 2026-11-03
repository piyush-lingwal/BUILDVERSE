// Interactions: 3D tilt with a pointer spotlight on cards, magnetic buttons, a smooth FAQ accordion,
// the tracks dialog choreography and small playful details.
import { gsap, ScrollTrigger, type Kit } from "./core";

export function interactionMotion(k: Kit): void {
  accordion(k);
  trackDialog(k);
  // Pointer effects only where there is a real hover-capable pointer.
  if (!k.fine || !window.matchMedia("(hover: hover)").matches) return;
  for (const t of TILT) for (const el of k.qa(t.selector)) tilt(k, el, t);
  magnetic(k);
  faqLook(k);
  contactWiggle(k);
}

interface TiltSpec {
  selector: string;
  max: number;
  lift: number;
  spot?: string;
}

const TILT: TiltSpec[] = [
  { selector: ".about-pill", max: 7, lift: 3 },
  { selector: "li.track-card > button", max: 7, lift: 6 },
  { selector: ".speaker-card", max: 5, lift: 8 },
  { selector: "[data-reward-card]", max: 6, lift: 5 },
  { selector: "[data-winner-card]", max: 6, lift: 5, spot: "rgba(253, 230, 138, 0.16)" },
  { selector: "#contact [data-tilt]", max: 6, lift: 4 },
];

const COLOR_TRANSITIONS = "color, background-color, border-color, box-shadow";

let refreshTimer: ReturnType<typeof setTimeout> | undefined;
/** Layout below changed (an FAQ opened or closed): re-measure every ScrollTrigger once it settles. */
function refreshSoon(): void {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 120);
}

/** A card leans toward the pointer in 3D, lifts slightly and carries a soft spotlight under the cursor. */
function tilt(k: Kit, el: HTMLElement, t: TiltSpec): void {
  const positioned = getComputedStyle(el).position !== "static";
  gsap.set(el, { transformPerspective: 900, transitionProperty: COLOR_TRANSITIONS, ...(positioned ? {} : { position: "relative" }) });
  el.classList.add("gsap-spot");
  if (t.spot) el.style.setProperty("--spot-color", t.spot);
  const rx = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3.out" });
  const ry = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3.out" });
  // Speaker posters also shift inside their frame, opposite to the pointer, for depth.
  const art = el.matches(".speaker-card") ? el.querySelector<HTMLElement>("[data-speaker-poster] img") : null;
  const ax = art ? gsap.quickTo(art, "x", { duration: 0.8, ease: "power3.out" }) : null;
  const ay = art ? gsap.quickTo(art, "y", { duration: 0.8, ease: "power3.out" }) : null;

  const move = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry((px - 0.5) * 2 * t.max);
    rx((0.5 - py) * 2 * t.max);
    el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    ax?.((0.5 - px) * 16);
    ay?.((0.5 - py) * 16);
  };
  const enter = () => {
    el.style.setProperty("--spot", "1");
    gsap.to(el, { y: -t.lift, scale: 1.015, duration: 0.45, ease: "power3.out", overwrite: "auto" });
    if (art) gsap.to(art, { scale: 1.08, duration: 0.8, ease: "power3.out", overwrite: "auto" });
  };
  const leave = () => {
    el.style.setProperty("--spot", "0");
    rx(0);
    ry(0);
    ax?.(0);
    ay?.(0);
    gsap.to(el, { y: 0, scale: 1, duration: 0.9, ease: "elastic.out(1, 0.55)", overwrite: "auto" });
    if (art) gsap.to(art, { scale: 1, duration: 0.8, ease: "power3.out", overwrite: "auto" });
  };
  el.addEventListener("pointermove", move);
  el.addEventListener("pointerenter", enter);
  el.addEventListener("pointerleave", leave);
  k.cleanup(() => {
    el.removeEventListener("pointermove", move);
    el.removeEventListener("pointerenter", enter);
    el.removeEventListener("pointerleave", leave);
    el.classList.remove("gsap-spot");
    for (const p of ["--mx", "--my", "--spot", "--spot-color"]) el.style.removeProperty(p);
  });
}

/** Call-to-action buttons are drawn toward the pointer, press in on click and spring back (elastic). */
function magnetic(k: Kit): void {
  for (const el of k.qa("[data-magnetic]")) {
    gsap.set(el, { transitionProperty: COLOR_TRANSITIONS });
    const icon = el.querySelector("svg");
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      gsap.to(el, { x: dx * 0.3, y: dy * 0.4, duration: 0.5, ease: "power3.out", overwrite: "auto" });
      if (icon) gsap.to(icon, { x: dx * 0.12 + 3, duration: 0.5, ease: "power3.out", overwrite: "auto" });
    };
    const leave = () => {
      gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.9, ease: "elastic.out(1, 0.4)", overwrite: "auto" });
      if (icon) gsap.to(icon, { x: 0, duration: 0.6, ease: "power3.out", overwrite: "auto" });
    };
    const down = () => gsap.to(el, { scale: 0.95, duration: 0.15, ease: "power2.out", overwrite: "auto" });
    const up = () => gsap.to(el, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)", overwrite: "auto" });
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointerup", up);
    k.cleanup(() => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointerup", up);
    });
  }
}

/** The puzzled FAQ mascot turns its head toward the pointer while the FAQ section is on screen. */
function faqLook(k: Kit): void {
  const section = k.q("#faqs");
  const art = k.q("#faq-mascot-wrap img");
  if (!section || !art) return;
  gsap.set(art, { transformOrigin: "50% 90%" });
  const turn = gsap.quickTo(art, "rotation", { duration: 0.9, ease: "power3.out" });
  const move = (e: PointerEvent) => {
    const r = art.getBoundingClientRect();
    turn(gsap.utils.clamp(-9, 9, (e.clientX - (r.left + r.width / 2)) / 45));
  };
  ScrollTrigger.create({
    trigger: section,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => {
      if (self.isActive) window.addEventListener("pointermove", move, { passive: true });
      else {
        window.removeEventListener("pointermove", move);
        turn(0);
      }
    },
  });
  k.cleanup(() => window.removeEventListener("pointermove", move));
}

/** Hovering a contact card makes its phone icon ring. */
function contactWiggle(k: Kit): void {
  for (const a of k.qa("#contact [data-tilt]")) {
    const icon = a.querySelector("span");
    if (!icon) continue;
    const ring = () => gsap.fromTo(icon, { rotation: 0 }, { rotation: 14, duration: 0.9, ease: "bv.wiggle", overwrite: true });
    a.addEventListener("pointerenter", ring);
    k.cleanup(() => a.removeEventListener("pointerenter", ring));
  }
}

/** FAQ answers open and close with a smooth height animation; native <details> behaviour stays intact. */
function accordion(k: Kit): void {
  for (const details of k.qa<HTMLDetailsElement>("details.faq-card")) {
    const summary = details.querySelector("summary");
    const body = summary?.nextElementSibling;
    if (!summary || !(body instanceof HTMLElement)) continue;
    const gap = getComputedStyle(body).marginTop;
    let closing = false;
    const reset = () => gsap.set(body, { clearProps: "height,marginTop,opacity,visibility,overflow" });
    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      gsap.killTweensOf(body);
      if (!details.open || closing) {
        if (!closing) gsap.set(body, { height: 0, marginTop: 0, autoAlpha: 0, overflow: "hidden" });
        closing = false;
        details.open = true;
        gsap.to(body, { height: "auto", marginTop: gap, autoAlpha: 1, duration: 0.45, ease: "bv.out", onComplete: () => { reset(); refreshSoon(); } });
      } else {
        closing = true;
        gsap.set(body, { overflow: "hidden" });
        gsap.to(body, {
          height: 0, marginTop: 0, autoAlpha: 0, duration: 0.32, ease: "power2.in",
          onComplete: () => { closing = false; details.open = false; reset(); refreshSoon(); },
        });
      }
    };
    summary.addEventListener("click", onClick);
    k.cleanup(() => {
      summary.removeEventListener("click", onClick);
      gsap.killTweensOf(body);
      reset();
    });
  }
}

/** When a track theme opens (or Prev / Next is used), its tracks cascade in and the theme icon spins into place. */
function trackDialog(k: Kit): void {
  const dialog = k.q<HTMLDialogElement>("#tracks dialog");
  if (!dialog) return;
  let frame = 0;
  const play = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      if (!dialog.open) return;
      const items = dialog.querySelectorAll("li");
      const tile = dialog.querySelector("header span");
      if (items.length) gsap.fromTo(items, { autoAlpha: 0, y: 26, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: "bv.out", stagger: { each: 0.07, from: "start" }, overwrite: true, clearProps: "transform,opacity,visibility" });
      if (tile) gsap.fromTo(tile, { rotation: -90, scale: 0.4 }, { rotation: 0, scale: 1, duration: 0.7, ease: "back.out(2.2)", overwrite: true, clearProps: "transform" });
    });
  };
  const watcher = new MutationObserver(play);
  watcher.observe(dialog, { attributes: true, attributeFilter: ["open"], childList: true, subtree: true });
  k.cleanup(() => {
    watcher.disconnect();
    cancelAnimationFrame(frame);
  });
}
