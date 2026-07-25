"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const dialogues = [
  { speaker: "Male", text: "Chand dikh raha hai?" },
  { speaker: "Female", text: "Nahi." },
  { speaker: "Male", text: "Mujhe bhi nahi dikh raha." },
  { speaker: "Male", text: "Made for each other hai hum dono." },
];

export default function MovieDialogueSection() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let delay = 600;
    dialogues.forEach((_, i) => {
      const t = setTimeout(() => setActiveIndex(i), delay);
      timers.push(t);
      delay += 2200;
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(3,5,12,0.2) 0%, rgba(3,5,12,0.7) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-sm space-y-8 text-center">
        {dialogues.map((d, i) => (
          <motion.div
            key={i}
            className="space-y-1"
            initial={{ opacity: 0, y: 16 }}
            animate={
              activeIndex >= i
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 16 }
            }
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <p className="font-body text-[10px] tracking-[0.3em] text-white/15 uppercase">
              {d.speaker}
            </p>
            <p className="font-dialogue text-lg italic leading-relaxed text-white/70 md:text-xl">
              {d.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
