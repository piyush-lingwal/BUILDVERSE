import Image from "next/image";

// The official mascot art, used as supplied (files in /public/buildverse/mascot).
const ART = {
  hero: { src: "hero-desk.png", w: 1536, h: 1024, alt: "The AWS cloud mascot at a laptop, pointing up with an idea" },
  bulb: { src: "lightbulb.png", w: 1254, h: 1254 },
  rules: { src: "checklist.webp", w: 917, h: 1100 },
  innovate: { src: "laptop-desk.png", w: 1321, h: 1191 },
  faq: { src: "confused.webp", w: 1100, h: 1100 },
  about: { src: "tablet-tiles.png", w: 1178, h: 1335 },
  welcome: { src: "wave.png", w: 1303, h: 1207 },
  learn: { src: "tablet-idea.png", w: 1389, h: 1132 },
  pitch: { src: "pitch.png", w: 1288, h: 1221 },
  judges: { src: "judges-silhouettes.png", w: 1672, h: 941, alt: "Three silhouettes with question marks: the judges will be revealed soon" },
  trophy: { src: "trophy-win.webp", w: 733, h: 1100 },
  prizeAmount: { src: "prize-amount.png", w: 2172, h: 724, alt: "₹1,50,000+ total prize pool" },
  arrows: { src: "forward-arrows.png", w: 1672, h: 940 },
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
      priority={priority}
      className={className}
    />
  );
}
