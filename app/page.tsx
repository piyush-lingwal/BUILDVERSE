import { Header, Hero, About, Flow, Themes, Rules, Prizes, Timeline, Faqs, FinalCta, BvFooter, SectionDivider } from "@/components/Sections";

// Registration open/closed is decided at request time, never baked in at build time.
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Flow />
        <SectionDivider />
        <Themes />
        <SectionDivider />
        <Rules />
        <SectionDivider />
        <Prizes />
        <SectionDivider />
        <Timeline />
        <SectionDivider />
        <Faqs />
        <SectionDivider />
        <FinalCta />
      </main>
      <BvFooter />
    </>
  );
}
