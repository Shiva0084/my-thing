"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TruthSection() {
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
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.25, ease: "power3.out" }
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
        <p className="reveal font-heading text-xl text-accent md:text-2xl">
          I owe you the truth.
        </p>
        <p className="reveal font-body text-sm leading-relaxed text-white/50 md:text-base">
          The biggest mistake I made...
        </p>
        <p className="reveal font-body text-sm leading-relaxed text-white/70 md:text-base">
          Was telling you that everything I did came from guilt.
        </p>
        <p className="reveal font-heading text-xl text-white/90 md:text-2xl">
          That wasn&apos;t true.
        </p>
        <p className="reveal font-body text-sm leading-relaxed text-white/50 md:text-base">
          The truth was much more complicated.
        </p>
        <p className="reveal font-body text-sm leading-relaxed text-white/50 md:text-base">
          I was fighting battles inside myself.
        </p>
        <p className="reveal font-body text-sm leading-relaxed text-white/50 md:text-base">
          I was confused. I was overwhelmed.
        </p>
        <div className="reveal h-px w-12 bg-accent/20" />
        <p className="reveal font-body text-sm leading-relaxed text-white/60 md:text-base">
          But none of those things excuse hurting you.
        </p>
        <p className="reveal font-heading text-lg text-white/80 md:text-xl">
          That responsibility is mine.
        </p>
      </div>
    </section>
  );
}
