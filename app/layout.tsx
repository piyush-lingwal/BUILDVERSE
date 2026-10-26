import type { Metadata } from "next";
import { Fredoka, Nunito, Pacifico } from "next/font/google";
import { BUILDVERSE as C } from "@/config/buildverse";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

// Display: Fredoka (rounded, curvy). Body: Nunito (soft, very readable). Accent: Pacifico (script, used sparingly).
const fredoka = Fredoka({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-fredoka", display: "swap" });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-nunito", display: "swap" });
const pacifico = Pacifico({ subsets: ["latin"], weight: "400", variable: "--font-pacifico", display: "swap" });

export const metadata: Metadata = {
  title: { default: `${C.name} | AWS Student Builders Group`, template: `%s | ${C.name}` },
  description: `${C.name}: a two-day hands-on innovation event. ${C.tagline} Workshop on 29 October, build and pitch on 30 October. ${C.eligibility}`,
  alternates: { canonical: "/" },
  openGraph: { title: C.name, description: `${C.tagline} ${C.eligibility}`, type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable} ${pacifico.variable} scroll-smooth`}>
      <body className="min-h-screen font-sans bg-[#FAF8FF] text-violet-950 [color-scheme:light]">
        <style>{`
          img {
            -webkit-user-drag: none;
            user-select: none;
            -webkit-user-select: none;
            pointer-events: none;
          }
        `}</style>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
