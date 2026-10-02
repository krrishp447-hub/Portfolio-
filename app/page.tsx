import { About } from "@/components/About";
import { AnimeFlow } from "@/components/AnimeFlow";
import { Brain } from "@/components/Brain";
import { Build } from "@/components/Build";
import { Contact } from "@/components/Contact";
import { CustomCursor } from "@/components/CustomCursor";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Now } from "@/components/Now";
import { Petals } from "@/components/Petals";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Stats } from "@/components/Stats";
import { Work } from "@/components/Work";

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <Navigation />
      <Petals />

      <main id="main">
        <Hero />
        <AnimeFlow />
        <Stats />
        <About />
        <Work />
        <Brain />
        <Build />
        <Now />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
