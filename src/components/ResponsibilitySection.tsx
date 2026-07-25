"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ResponsibilitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 30%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(
        el.querySelectorAll(".reveal"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.2, ease: "power3.out" }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6"
    >
      <div className="mx-auto max-w-md space-y-6">
        <p className="reveal font-heading text-xl text-white/90 md:text-2xl">
          Life has changed me.
        </p>
        <p className="reveal font-body text-sm leading-relaxed text-white/50 md:text-base">
          It taught me that real strength isn&apos;t pretending to be okay.
        </p>
        <div className="reveal h-px w-12 bg-accent/20" />
        <p className="reveal font-heading text-lg text-accent md:text-xl">
          It is taking responsibility.
        </p>
        <p className="reveal font-body text-sm leading-relaxed text-white/60 md:text-base">
          It is standing behind your words.
        </p>
        <p className="reveal font-body text-sm leading-relaxed text-white/60 md:text-base">
          It is protecting the people you care about.
        </p>
        <p className="reveal font-heading text-lg text-white/80 md:text-xl">
          It is becoming someone worthy of trust.
        </p>
      </div>
    </section>
  );
}
