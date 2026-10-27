import Image from "next/image";

// The official mascot art, used as supplied (files in /public/buildverse/mascot).
const ART = {
  hero: { src: "hero-desk.webp", w: 1400, h: 933, alt: "The AWS cloud mascot at a laptop, pointing up with an idea" },
  bulb: { src: "lightbulb.webp", w: 480, h: 480 },
  rules: { src: "checklist.webp", w: 917, h: 1100 },
  innovate: { src: "laptop-desk.webp", w: 1321, h: 1191 },
  faq: { src: "confused.webp", w: 1100, h: 1100 },
  about: { src: "tablet-tiles.webp", w: 1178, h: 1335 },
  welcome: { src: "wave.webp", w: 1303, h: 1207 },
  learn: { src: "tablet-idea.webp", w: 1389, h: 1132 },
  pitch: { src: "pitch.webp", w: 1319, h: 1192 },
  judges: { src: "judges-silhouettes.webp", w: 1400, h: 788, alt: "Three silhouettes with question marks: the judges will be revealed soon" },
  trophy: { src: "trophy-win.webp", w: 733, h: 1100 },
  prizeAmount: { src: "prize-amount.webp", w: 1400, h: 467, alt: "₹1,50,000+ total prize pool" },
  arrows: { src: "forward-arrows.webp", w: 604, h: 540 },
} as const;

export type MascotName = keyof typeof ART;

/** Decorative by default (empty alt); the hero describes itself. */
export function Mascot({ name, className = "", sizes = "(min-width: 1024px) 480px, 80vw", priority = false }: { name: MascotName; className?: string; sizes?: string; priority?: boolean }) {
  const a = ART[name];
  return (
    <Image
      src={`/buildverse/mascot/${a.src}`}
      alt={"alt" in a ? a.alt : ""}
      width={a.w}
      height={a.h}
      sizes={sizes}
      quality={85}
      priority={priority}
      className={className}
    />
  );
}
