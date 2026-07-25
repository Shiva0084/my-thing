"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AudioToggle from "@/components/AudioToggle";

import Moon from "@/components/Moon";
import LandingSection from "@/components/LandingSection";
import MoonMemorySection from "@/components/MoonMemorySection";
import MovieDialogueSection from "@/components/MovieDialogueSection";
import TruthSection from "@/components/TruthSection";
import ResponsibilitySection from "@/components/ResponsibilitySection";
import ApologySection from "@/components/ApologySection";
import AdmireSection from "@/components/AdmireSection";
import GrowthSection from "@/components/GrowthSection";
import AcceptanceSection from "@/components/AcceptanceSection";
import EndingSection from "@/components/EndingSection";
import Footer from "@/components/Footer";
import { useScroll } from "@/lib/scroll-provider";

gsap.registerPlugin(ScrollTrigger);

function FixedMoon() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { progress } = useScroll();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const overlay = overlayRef.current;
    if (!wrapper || !overlay) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });

      tl.to(wrapper, { scale: 0.4, opacity: 0.5, y: -20, duration: 0.3 }, 0.05)
        .to(wrapper, { opacity: 0.2, duration: 0.1 }, 0.15)
        .to(wrapper, { opacity: 0.5, duration: 0.1 }, 0.25)
        .to(overlay, { opacity: 0.5, duration: 0.2 }, 0.12)
        .to(overlay, { opacity: 0, duration: 0.2 }, 0.28)
        .to(wrapper, { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.82);
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 flex items-start justify-center pt-[20vh] md:pt-[15vh]">
      <div
        ref={overlayRef}
        className="absolute inset-0 opacity-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 25%, rgba(3,5,12,0.85) 0%, transparent 60%)",
        }}
      />
      <div
        ref={wrapperRef}
        className="w-[180px] md:w-[240px] lg:w-[280px]"
      >
        <Moon phase={progress} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main
      className="relative min-h-screen"
      style={{ backgroundColor: "#03050C" }}
    >
      <FixedMoon />

      <AudioToggle />

      <div className="relative z-10">
        <LandingSection />
        <MoonMemorySection />
        <MovieDialogueSection />
        <TruthSection />
        <ResponsibilitySection />
        <ApologySection />
        <AdmireSection />
        <GrowthSection />
        <AcceptanceSection />
        <EndingSection />
        <Footer />
      </div>
    </main>
  );
}
