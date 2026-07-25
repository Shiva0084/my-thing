"use client";

import { useEffect, useState } from "react";

interface MoonProps {
  phase?: number;
}

export default function Moon({ phase = 0 }: MoonProps) {
  const r = 90;
  const cx = 100;
  const cy = 100;
  const feather = 20;

  const [glowBoost, setGlowBoost] = useState(0);

  const accelerated = Math.min(1, phase * 1.176);
  const illumination = 0.05 + 0.95 * Math.pow(accelerated, 0.6);

  const pushFactor = Math.max(0, Math.min(1, (illumination - 0.85) / 0.15));
  const extraPush = pushFactor * (feather + 15);

  const baseOffset = -2 * r * illumination;
  const offset = baseOffset - extraPush;
  const isFull = illumination >= 0.97;

  useEffect(() => {
    let rafId: number;
    let timeout: ReturnType<typeof setTimeout>;

    const breathe = () => {
      const delay = 15000 + Math.random() * 10000;
      timeout = setTimeout(() => {
        setGlowBoost(0.05);
        rafId = requestAnimationFrame(() => {
          setGlowBoost(0);
        });
        breathe();
      }, delay);
    };

    breathe();

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full"
      aria-hidden="true"
      style={{
        filter: `
          drop-shadow(0 0 ${60 + glowBoost * 400}px rgba(199, 179, 141, ${0.1 + glowBoost}))
          drop-shadow(0 0 ${120 + glowBoost * 500}px rgba(199, 179, 141, ${0.06 + glowBoost * 0.5}))
        `,
      }}
    >
      <defs>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C7B38D" stopOpacity={0.06} />
          <stop offset="50%" stopColor="#C7B38D" stopOpacity={0.03} />
          <stop offset="100%" stopColor="#C7B38D" stopOpacity={0} />
        </radialGradient>

        <radialGradient id="moonSurface" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#F8F6EE" />
          <stop offset="100%" stopColor="#EBE7DA" />
        </radialGradient>

        <radialGradient id="shadowEdge" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" />
          <stop offset="70%" stopColor="#000" />
          <stop offset="100%" stopColor="#fff" />
        </radialGradient>

        {!isFull && (
          <mask id="phaseMask">
            <rect x="0" y="0" width="200" height="200" fill="white" />
            <circle
              cx={cx + offset}
              cy={cy}
              r={r + feather}
              fill="url(#shadowEdge)"
            />
          </mask>
        )}
      </defs>

      <circle cx={cx} cy={cy} r={r * 1.6} fill="url(#moonGlow)" />

      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="url(#moonSurface)"
        mask={isFull ? undefined : "url(#phaseMask)"}
      />
    </svg>
  );
}
