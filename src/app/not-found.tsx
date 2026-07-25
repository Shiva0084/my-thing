"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6" style={{ backgroundColor: "#03050C" }}>
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <svg
          viewBox="0 0 200 200"
          width={120}
          height={120}
          className="moon-glow"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="glow404" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C7B38D" stopOpacity={0.08} />
              <stop offset="100%" stopColor="#C7B38D" stopOpacity={0} />
            </radialGradient>
          </defs>
          <circle cx={100} cy={100} r={100} fill="url(#glow404)" />
          <circle cx={70} cy={100} r={70} fill="#03050C" />
          <circle cx={100} cy={100} r={70} fill="#F8F6EE" opacity={0.75} />
        </svg>
      </motion.div>

      <motion.h1
        className="font-heading text-5xl text-white/15 md:text-7xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        404
      </motion.h1>

      <motion.p
        className="mt-4 font-body text-xs tracking-[0.3em] text-white/15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        LOST IN THE DARK
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <Link
          href="/"
          className="group mt-10 inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 font-body text-sm text-white/40 transition-all duration-500 hover:border-accent/30 hover:text-accent"
        >
          <span className="inline-block transition-transform duration-500 group-hover:-translate-x-1">
            &larr;
          </span>
          Return
        </Link>
      </motion.div>
    </main>
  );
}
