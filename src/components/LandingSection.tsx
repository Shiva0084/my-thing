"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const lines = [
  { text: "Hi.", delay: 600 },
  { text: "This website was made for one person.", delay: 2200 },
  { text: "If you're reading this...", delay: 4200 },
  { text: "Thank you.", delay: 5800 },
];

export default function LandingSection() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [atTop, setAtTop] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setAtTop(latest < 5);
  });

  useEffect(() => {
    const timers = lines.map((line, i) =>
      setTimeout(() => setVisibleLines((prev) => [...prev, i]), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const allLinesVisible = visibleLines.length >= lines.length;

  return (
    <section className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6">
      <div className="mx-auto max-w-md space-y-5 text-center">
        {lines.map((line, i) => (
          <p
            key={i}
            className={`font-heading text-xl leading-relaxed text-white transition-all duration-1000 md:text-3xl ${
              visibleLines.includes(i)
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            } ${i === 0 ? "text-accent" : "text-white/80"}`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            {line.text}
          </p>
        ))}
      </div>

      {allLinesVisible && (
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ opacity: atTop ? 1 : 0, y: atTop ? 0 : 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ pointerEvents: atTop ? "auto" : "none" }}
        >
          <span className="font-body text-[10px] tracking-[0.3em] text-white/20 uppercase">
            Scroll
          </span>
          <div className="flex flex-col items-center">
            <span className="block h-3 w-px bg-white/20" />
            <span className="block h-6 w-px bg-white/10" />
          </div>
        </motion.div>
      )}
    </section>
  );
}
