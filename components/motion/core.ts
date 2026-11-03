// Shared GSAP setup for the site's motion system. Imported only by client components.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { CustomEase } from "gsap/CustomEase";
import { CustomWiggle } from "gsap/CustomWiggle";

export { gsap, ScrollTrigger, SplitText };

let registered = false;

/** Registers every plugin once and defines the site's custom eases. */
export function registerMotion(): void {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, DrawSVGPlugin, Physics2DPlugin, CustomEase, CustomWiggle);
  CustomEase.create("bv.out", "0.16, 1, 0.3, 1");
  CustomEase.create("bv.inOut", "0.65, 0, 0.35, 1");
  CustomWiggle.create("bv.wiggle", { wiggles: 6, type: "easeOut" });
  registered = true;
}

export type Tier = "fine" | "coarse";
export type Job = () => void;

export interface Kit {
  /** One block of the page (a section or a divider); queries include the block itself. */
  root: HTMLElement;
  /** "fine": desktop with a mouse (richer, scroll-linked effects). "coarse": phones, tablets, touch. */
  tier: Tier;
  fine: boolean;
  q<T extends Element = HTMLElement>(selector: string, scope?: ParentNode): T | null;
  qa<T extends Element = HTMLElement>(selector: string, scope?: ParentNode): T[];
  /** True when the element starts below the fold, so hiding it before its entrance is never visible. */
  below(el: Element | null | undefined): el is Element;
  /** Registers teardown work (listeners, observers, DOM nodes) for when the media context reverts. */
  cleanup(fn: () => void): void;
  /** Splits heavy setup: the job runs right after the current one, possibly in the next idle slice. */
  later(job: Job): void;
}

/** Bumped at the start of every setup slice: layout measured in an earlier slice may be stale. */
let slice = 0;

export function createKit(root: HTMLElement, tier: Tier, later: (job: Job) => void = (job) => job()): Kit & { dispose(): void } {
  const fold = window.innerHeight * 0.96;
  const jobs: (() => void)[] = [];
  // The block's own box, measured once per slice: deciding "below the fold" from it avoids a forced
  // layout for every element (only a block that straddles the fold measures its elements one by one).
  let box: { slice: number; top: number; bottom: number } | null = null;
  return {
    root,
    tier,
    fine: tier === "fine",
    q: <T extends Element = HTMLElement>(s: string, scope: ParentNode = root) =>
      scope === root && root.matches(s) ? (root as unknown as T) : scope.querySelector<T>(s),
    qa: <T extends Element = HTMLElement>(s: string, scope: ParentNode = root) => {
      const found = Array.from(scope.querySelectorAll<T>(s));
      return scope === root && root.matches(s) ? [root as unknown as T, ...found] : found;
    },
    below: (el: Element | null | undefined): el is Element => {
      if (!el) return false;
      if (box?.slice !== slice) {
        const r = root.getBoundingClientRect();
        box = { slice, top: r.top, bottom: r.bottom };
      }
      if (box.top > fold) return true;
      if (box.bottom <= fold) return false;
      return el.getBoundingClientRect().top > fold;
    },
    cleanup: (fn) => { jobs.push(fn); },
    later,
    dispose: () => {
      for (const fn of jobs.splice(0).reverse()) {
        try { fn(); } catch { /* keep tearing down the rest */ }
      }
    },
  };
}

const NEUTRAL: Record<string, number> = {
  x: 0, y: 0, xPercent: 0, yPercent: 0, rotation: 0, rotationX: 0, rotationY: 0,
  scale: 1, scaleX: 1, scaleY: 1, autoAlpha: 1, opacity: 1,
};

/** CSS hover transitions on animated cards would lag behind GSAP: keep them for colours and shadows only. */
export function tame(els: Element[]): void {
  if (els.length) gsap.set(els, { transitionProperty: "color, background-color, border-color, box-shadow, text-decoration-color, fill, stroke" });
}

export interface RevealOptions {
  start?: string;
  stagger?: gsap.TweenVars["stagger"];
  duration?: number;
  ease?: string;
  delay?: number;
  /** Keep GSAP's transform after the entrance (the element is also tilted by the pointer). */
  keepTransform?: boolean;
  /** Extra choreography for the items of a batch, called as the batch enters (index order). */
  then?: (batch: Element[]) => void;
}

/**
 * ScrollTrigger.batch entrance: items that scroll in together are staggered together.
 * Only items below the fold are hidden first, so nothing on screen at load ever blinks.
 */
export function batchReveal(k: Kit, targets: Element[], from: gsap.TweenVars, o: RevealOptions = {}): Element[] {
  const els = targets.filter((el) => k.below(el));
  if (!els.length) return els;
  const to: gsap.TweenVars = {};
  for (const key of Object.keys(from)) if (key in NEUTRAL) to[key] = NEUTRAL[key];
  gsap.set(els, { autoAlpha: 0, ...from });
  ScrollTrigger.batch(els, {
    start: o.start ?? "top 88%",
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        autoAlpha: 1,
        ...to,
        duration: o.duration ?? (k.fine ? 0.95 : 0.7),
        ease: o.ease ?? "bv.out",
        stagger: o.stagger ?? 0.1,
        delay: o.delay ?? 0,
        overwrite: "auto",
        clearProps: o.keepTransform ? "opacity,visibility" : "transform,opacity,visibility",
      });
      o.then?.(batch);
    },
  });
  return els;
}

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>";

/** Decodes a short label in place with ScrambleText as it scrolls into view. The final text is unchanged. */
export function scrambleIn(el: HTMLElement, start = "top 90%"): void {
  const text = el.textContent ?? "";
  if (!text.trim()) return;
  gsap.set(el, { autoAlpha: 0 });
  ScrollTrigger.create({
    trigger: el,
    start,
    once: true,
    onEnter: () => {
      gsap.timeline()
        .to(el, { autoAlpha: 1, duration: 0.3, clearProps: "opacity,visibility" }, 0)
        .to(el, { duration: 1, ease: "none", scrambleText: { text, chars: SCRAMBLE_CHARS, revealDelay: 0.2, speed: 0.55 } }, 0);
    },
  });
}

/** A one-shot fade-up for a block of text, used for lead paragraphs and notes. */
export function riseIn(k: Kit, el: Element | null | undefined, delay = 0.1): void {
  if (!k.below(el)) return;
  gsap.from(el, {
    autoAlpha: 0,
    y: 24,
    duration: 0.9,
    ease: "bv.out",
    delay,
    clearProps: "transform,opacity,visibility",
    scrollTrigger: { trigger: el, start: "top 92%", once: true },
  });
}

/** Runs an ambient loop only while its section is on screen; paused otherwise, so it costs nothing. */
export function whileVisible(trigger: Element, anim: gsap.core.Animation): void {
  anim.pause();
  ScrollTrigger.create({ trigger, start: "top bottom", end: "bottom top", onToggle: (self) => (self.isActive ? anim.resume() : anim.pause()) });
}

/** A one-shot timeline that plays when its trigger scrolls into view. */
export function onEnter(trigger: Element, start = "top 85%", vars: gsap.TimelineVars = {}): gsap.core.Timeline {
  return gsap.timeline({ ...vars, scrollTrigger: { trigger, start, once: true } });
}

/** Every stroke inside an inline SVG icon (lucide), for DrawSVG line-drawing. */
export function strokes(svg: Element | null | undefined): Element[] {
  return svg ? Array.from(svg.querySelectorAll("path, line, circle, rect, polyline, polygon, ellipse")) : [];
}

/** Longest stretch of setup work in one go; the browser gets to paint and handle input between slices. */
const SLICE_MS = 8;

/**
 * Prepares the page's motion a few jobs at a time, one short slice per frame, in page order (which keeps
 * ScrollTrigger's pin maths right), so loading stays responsive and the hero intro stays smooth.
 * Everything created runs inside the media context, so it is reverted with it.
 */
export function createQueue(context: gsap.Context) {
  const queue: Job[] = [];
  const front: Job[] = [];
  let frame = 0;
  let timer = 0;
  let stopped = false;
  let done: (() => void) | undefined;
  // One slice right after each painted frame. (Idle callbacks were tried: on a slow phone they can be
  // starved for seconds while the hero is animating.)
  const schedule = () => {
    frame = requestAnimationFrame(() => { timer = window.setTimeout(run, 0); });
  };
  function run() {
    if (stopped) return;
    slice++;
    const until = performance.now() + SLICE_MS;
    context.add(() => {
      do {
        const job = queue.shift();
        if (!job) break;
        try {
          job();
        } catch (error) {
          // A failed job only loses its own effect; the queue keeps going.
          if (process.env.NODE_ENV !== "production") console.error("[motion] setup job failed:", error);
        }
        // Jobs queued with later() go first, in the order they were added.
        if (front.length) queue.unshift(...front.splice(0));
      } while (performance.now() < until);
    });
    if (queue.length) schedule();
    else done?.();
  }
  return {
    add: (job: Job) => { queue.push(job); },
    later: (job: Job) => { front.push(job); },
    start: (onDone: () => void) => {
      done = onDone;
      schedule();
    },
    stop: () => {
      stopped = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    },
  };
}
