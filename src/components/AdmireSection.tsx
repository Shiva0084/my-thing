"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AdmireSection() {
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
          What I Admire
        </p>
        <p className="reveal font-body text-sm leading-relaxed text-white/60 md:text-base">
          I admire your kindness.
        </p>
        <p className="reveal font-body text-sm leading-relaxed text-white/60 md:text-base">
          I admire the way you choose positivity.
        </p>
        <p className="reveal font-body text-sm leading-relaxed text-white/60 md:text-base">
          I admire your strength.
        </p>
        <p className="reveal font-body text-sm leading-relaxed text-white/60 md:text-base">
          I admire your heart, your patience, your maturity.
        </p>
        <p className="reveal font-heading text-lg text-accent md:text-xl">
          I admire the peace you bring wherever you go.
        </p>
      </div>
    </section>
  );
}
