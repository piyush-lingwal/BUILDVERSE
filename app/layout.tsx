import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { BUILDVERSE as C } from "@/config/buildverse";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

// Primary: Poppins (geometric, modern, clean). Headings: Instrument Serif. Tech accent: JetBrains Mono.
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"], variable: "--font-poppins", display: "swap" });
const tech = JetBrains_Mono({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-tech", display: "swap" });

const instrumentSerif = localFont({
  src: [
    {
      path: "../public/buildverse/InstrumentSerif-Italic.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/buildverse/InstrumentSerif-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: `${C.name} | AWS Student Builders Group`, template: `%s | ${C.name}` },
  description: `${C.name}: a two-day hands-on innovation event. ${C.tagline} Workshop on 29 October, build and pitch on 30 October. ${C.eligibility}`,
  alternates: { canonical: "/" },
  openGraph: { title: C.name, description: `${C.tagline} ${C.eligibility}`, type: "website" },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/buildverse/Favicon.ico" },
    ],
    shortcut: "/favicon.ico",
    apple: "/buildverse/Favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${instrumentSerif.variable} ${tech.variable} scroll-smooth`}>
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
