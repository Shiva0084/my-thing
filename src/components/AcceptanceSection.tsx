"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AcceptanceSection() {
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
      <div className="mx-auto max-w-md space-y-6 text-center">
        <p className="reveal font-body text-sm leading-relaxed text-white/50 md:text-base">
          I don&apos;t expect anything from you.
        </p>
        <p className="reveal font-body text-sm leading-relaxed text-white/50 md:text-base">
          I don&apos;t expect an answer.
        </p>
        <p className="reveal font-body text-sm leading-relaxed text-white/50 md:text-base">
          I don&apos;t expect another chance.
        </p>
        <div className="reveal h-px w-12 bg-accent/20 mx-auto" />
        <p className="reveal font-heading text-lg text-accent md:text-xl">
          I only wanted to tell you the truth.
        </p>
        <div className="reveal h-px w-12 bg-accent/20 mx-auto" />
        <p className="reveal font-body text-sm leading-relaxed text-white/60 md:text-base">
          If life ever brings our paths together again...
        </p>
        <p className="reveal font-heading text-lg text-white/80 md:text-xl">
          I&apos;ll be grateful.
        </p>
        <p className="reveal font-body text-sm leading-relaxed text-white/50 md:text-base">
          If it doesn&apos;t...
        </p>
        <p className="reveal font-heading text-lg text-white/70 md:text-xl">
          I&apos;ll still wish you happiness.
        </p>
      </div>
    </section>
  );
}
