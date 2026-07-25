"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CloudEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);

  const clouds: {
    blur: number; size: number; opacity: number; top: string;
    left?: string; right?: string; moveX: number; moveY: number;
  }[] = [
    { blur: 140, size: 520, opacity: 0.012, top: "8%", left: "-10%", moveX: 50, moveY: 10 },
    { blur: 100, size: 420, opacity: 0.02, top: "22%", right: "-12%", moveX: -60, moveY: -8 },
    { blur: 160, size: 360, opacity: 0.008, top: "38%", left: "8%", moveX: 40, moveY: 14 },
    { blur: 80, size: 480, opacity: 0.016, top: "15%", left: "25%", moveX: -30, moveY: -14 },
    { blur: 120, size: 320, opacity: 0.01, top: "32%", right: "2%", moveX: -45, moveY: 8 },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
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

      layersRef.current.forEach((ref, i) => {
        if (!ref) return;
        const c = clouds[i];
        tl.to(ref, { x: c.moveX, y: c.moveY, opacity: c.opacity * 1.6, duration: 1 }, 0);
        tl.to(ref, { opacity: c.opacity * 0.2, duration: 0.5, ease: "power2.out" }, 0.8);
      });
    }, container);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setRef = (i: number) => (el: HTMLDivElement | null) => {
    layersRef.current[i] = el;
  };

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      {clouds.map((c, i) => (
        <div
          key={i}
          ref={setRef(i)}
          className="cloud absolute rounded-full"
          style={{
            top: c.top,
            left: c.left,
            right: c.right,
            width: c.size,
            height: c.size * 0.65,
            background: `radial-gradient(ellipse at center, rgba(199, 179, 141, ${c.opacity}) 0%, transparent 70%)`,
            filter: `blur(${c.blur}px)`,
            transform: "translateZ(0)",
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
