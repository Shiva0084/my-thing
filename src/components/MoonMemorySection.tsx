"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MoonMemorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 40%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(
        el.querySelectorAll(".reveal"),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.4, ease: "power3.out" }
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
        <p className="reveal font-heading text-xl leading-relaxed text-white/80 md:text-2xl">
          You saw me as your Moon.
        </p>
        <p className="reveal font-body text-base leading-relaxed text-white/40 md:text-lg">
          I didn&apos;t understand what that meant back then.
        </p>
        <p className="reveal font-heading text-xl leading-relaxed text-accent md:text-2xl">
          But I do now.
        </p>
        <p className="reveal font-heading text-xl leading-relaxed text-accent md:text-2xl">
          But I want to mean and feel it now.
        </p>
      </div>
    </section>
  );
}
