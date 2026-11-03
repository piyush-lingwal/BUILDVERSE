import { ArtDivider } from "@/components/Decor";
import { Tracks } from "@/components/Tracks";
import { Header, Hero, About, Flow, Rules, Prizes, Speakers, Timeline, Faqs, Contact, FinalCta, SectionDivider, BvFooter } from "@/components/Sections";
import { GsapMotion } from "@/components/GsapMotion";
import { Winners } from "@/components/Winners";
import { BUILDVERSE as C } from "@/config/buildverse";

// Static page: built once and served from the CDN. Registration open/closed is decided in the browser
// (see components/useRegistrationOpen.ts), so nothing here depends on the request time.
export default function HomePage() {
  return (
    <>
      <GsapMotion />
      <Header />
      <main>
        <Hero />
        <SectionDivider />
        {C.eventConcluded && (
          <>
            <Winners />
            <SectionDivider />
          </>
        )}
        <About />
        <SectionDivider />
        <Flow />
        <ArtDivider name="plane-trail" />
        <Timeline />
        <ArtDivider name="star-trail" className="max-w-3xl mx-auto" />
        <Tracks />
        <SectionDivider />
        <Speakers />
        <SectionDivider />
        <Rules />
        <SectionDivider />
        <Prizes />
        <ArtDivider name="plane-trail-2" />
        <Faqs />
        <Contact />
        <SectionDivider />
        <FinalCta />
      </main>
      <BvFooter />
    </>
  );
}
