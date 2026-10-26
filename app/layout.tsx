import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { BUILDVERSE as C } from "@/config/buildverse";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"], variable: "--font-poppins", display: "swap" });

export const metadata: Metadata = {
  title: { default: `${C.name} | AWS Student Builders Group`, template: `%s | ${C.name}` },
  description: `${C.name}: a two-day hands-on innovation event. ${C.tagline} Workshop on 29 October, build and pitch on 30 October. ${C.eligibility}`,
  alternates: { canonical: "/" },
  openGraph: { title: C.name, description: `${C.tagline} ${C.eligibility}`, type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
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
