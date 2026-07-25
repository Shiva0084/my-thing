"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 120;

    const interval = setInterval(() => {
      frame++;
      setProgress(Math.min(1, frame / totalFrames));

      if (frame >= totalFrames) {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 400);
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9997] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#03050C" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <svg
              viewBox="0 0 100 100"
              width={64}
              height={64}
              className="moon-glow"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="loadGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#C7B38D" stopOpacity={0.12} />
                  <stop offset="100%" stopColor="#C7B38D" stopOpacity={0} />
                </radialGradient>
              </defs>
              <circle cx={50} cy={50} r={50} fill="url(#loadGlow)" />
              <circle cx={30} cy={50} r={35} fill="#03050C" />
              <circle cx={50} cy={50} r={35} fill="#F8F6EE" opacity={0.85} />
            </svg>
          </motion.div>

          <div className="h-[1.5px] w-24 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: "#C7B38D" }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
