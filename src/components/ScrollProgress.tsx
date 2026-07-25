"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useScroll } from "@/lib/scroll-provider";

export default function ScrollProgress() {
  const { progress } = useScroll();
  const motionValue = useMotionValue(0);

  useEffect(() => {
    motionValue.set(progress);
  }, [progress, motionValue]);

  const scaleX = useSpring(motionValue, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-accent/50"
      style={{ scaleX }}
    />
  );
}
