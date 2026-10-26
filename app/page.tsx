import { ArtDivider } from "@/components/Decor";
import { Tracks } from "@/components/Tracks";
import { Header, Hero, About, Flow, Rules, Prizes, Timeline, Faqs, FinalCta, BvFooter, SectionDivider } from "@/components/Sections";
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
        <ArtDivider name="ribbon-wave" />
        <About />
        <SectionDivider />
        <Flow />
        <ArtDivider name="plane-trail" />
        <Tracks />
        <ArtDivider name="ribbon-sparkle" />
        <Rules />
        <ArtDivider name="ribbon-thin" />
        <Prizes />
        <ArtDivider name="star-trail" className="max-w-3xl mx-auto" />
        <Timeline />
        <ArtDivider name="plane-trail-2" />
        <Faqs />
        <SectionDivider />
        <FinalCta />
      </main>
      <BvFooter />
    </>
  );
}
