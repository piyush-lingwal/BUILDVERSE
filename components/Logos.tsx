import Image from "next/image";

// The three official logos, used exactly as supplied (files in /public/buildverse).

/** The SBG file has a large transparent margin; crop it with CSS only (the file itself is untouched). */
const SBG = { size: 6250, x: 625, y: 2217, w: 4958, h: 1816 };

export function SbgLogo({ className = "h-10" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="AWS Student Builder Group, Tulas University, Dehradun"
      className={`relative block shrink-0 overflow-hidden ${className}`}
      style={{ aspectRatio: `${SBG.w} / ${SBG.h}` }}
    >
      <Image
        src="/buildverse/sbg-logo.png"
        alt=""
        width={SBG.size}
        height={SBG.size}
        sizes="320px"
        quality={90}
        className="absolute max-w-none"
        style={{
          width: `${(SBG.size / SBG.w) * 100}%`,
          left: `${(-SBG.x / SBG.w) * 100}%`,
          top: `${(-SBG.y / SBG.h) * 100}%`,
        }}
      />
    </span>
  );
}

export function BuildVerseLogo({ className = "" }: { className?: string }) {
  return (
    <Image src="/buildverse/build-verse-logo.png" alt="BUILD-VERSE 2026" width={2172} height={724} sizes="(min-width: 1024px) 560px, 90vw" quality={90} priority className={className} />
  );
}

export function UtkrishtLogo({ className = "" }: { className?: string }) {
  return (
    <Image src="/buildverse/utkrisht-logo.png" alt="Utkrisht 2026: Discovering Bharat" width={2000} height={913} sizes="240px" quality={90} className={className} />
  );
}

export function UtkrishtLogoWhite({ className = "" }: { className?: string }) {
  return (
    <Image src="/buildverse/utkrisht-logo-white.png" alt="Utkrisht 2026: Discovering Bharat" width={1380} height={532} sizes="240px" className={className} />
  );
}
