"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EndingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const overlay = overlayRef.current;
    const text = textRef.current;
    if (!section || !overlay || !text) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        text.querySelectorAll(".end-reveal"),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      gsap.to(overlay, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 10%",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6"
    >
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-50 opacity-0"
        style={{ backgroundColor: "#03050C" }}
      />

      <div ref={textRef} className="mx-auto max-w-md space-y-8 text-center">
        <p className="end-reveal font-heading text-xl leading-relaxed text-white/80 md:text-2xl">
          You once called me your Moon.
        </p>

        <p className="end-reveal font-heading text-lg leading-relaxed text-white/40 md:text-xl">
          I&apos;ll always remember that.
        </p>

        <div className="end-reveal h-px w-12 bg-accent/20 mx-auto" />

        <p className="end-reveal font-heading text-xl text-white/60 md:text-2xl">
          Thank you dobu...
        </p>

        <p className="end-reveal font-body text-xs tracking-[0.2em] text-white/20">
          FOR READING
        </p>

        <p className="end-reveal text-white/5 font-heading text-2xl">&middot;</p>
      </div>
    </section>
  );
}
