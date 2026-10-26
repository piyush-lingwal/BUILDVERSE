import { ArtDivider } from "@/components/Decor";
import { Tracks } from "@/components/Tracks";
import { Header, Hero, About, Flow, Rules, Prizes, Timeline, Faqs, FinalCta, SectionDivider } from "@/components/Sections";
import { GsapMotion } from "@/components/GsapMotion";

// Registration open/closed is decided at request time, never baked in at build time.
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <GsapMotion />
      <Header />
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Flow />
        <ArtDivider name="plane-trail" />
        <Timeline />
        <ArtDivider name="star-trail" className="max-w-3xl mx-auto" />
        <Tracks />
        <SectionDivider />
        <Rules />
        <SectionDivider />
        <Prizes />
        <ArtDivider name="plane-trail-2" />
        <Faqs />
        <SectionDivider />
        <FinalCta />
      </main>
    </>
  );
}
