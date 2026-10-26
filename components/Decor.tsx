import Image from "next/image";

// Decorative art (files in /public/buildverse/decor). All of it is aria-hidden: it carries no information.
const ART = {
  "ribbon-wave": { w: 1400, h: 250 },
  "plane-trail": { w: 1400, h: 356 },
  "ribbon-sparkle": { w: 1400, h: 226 },
  "ribbon-thin": { w: 1400, h: 245 },
  "plane-trail-2": { w: 1400, h: 289 },
  sparkles: { w: 900, h: 396 },
  "star-trail": { w: 900, h: 353 },
} as const;

export type DecorName = keyof typeof ART;

function Art({ name, className = "", sizes }: { name: DecorName; className?: string; sizes: string }) {
  const a = ART[name];
  return <Image src={`/buildverse/decor/${name}.webp`} alt="" width={a.w} height={a.h} sizes={sizes} className={className} />;
}

/** Full-width artwork used instead of the plain line between two sections. */
export function ArtDivider({ name, flip = false, className = "" }: { name: DecorName; flip?: boolean; className?: string }) {
  return (
    <div aria-hidden="true" className={`art-divider pointer-events-none relative -my-4 w-full overflow-hidden sm:-my-6 ${className}`}>
      <Art name={name} sizes="(min-width: 1280px) 1280px, 100vw" className={`mx-auto h-auto w-full max-w-[1400px] select-none ${flip ? "-scale-x-100" : ""}`} />
    </div>
  );
}

/** Soft floating sparkles for corners of a section. Hidden on small screens to keep them clean. */
export function SparkleCluster({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute hidden w-56 animate-twinkle opacity-80 md:block lg:w-72 ${className}`}>
      <Art name="sparkles" sizes="288px" className="h-auto w-full select-none" />
    </div>
  );
}

/** Small dashed star trail, used as an accent next to headings. */
export function StarTrail({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute hidden w-64 md:block ${className}`}>
      <Art name="star-trail" sizes="256px" className="h-auto w-full select-none" />
    </div>
  );
}
