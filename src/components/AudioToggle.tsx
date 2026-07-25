"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [available, setAvailable] = useState(false);
  const [ready, setReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/audio/ambient.mp3", { method: "HEAD" })
      .then((res) => {
        if (cancelled) return;
        if (res.ok) {
          const audio = new Audio("/audio/ambient.mp3");
          audio.loop = true;
          audio.preload = "metadata";
          audio.volume = 0;
          audioRef.current = audio;
          setAvailable(true);
          setReady(true);
        } else {
          setReady(true);
        }
      })
      .catch(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const stopFadeInterval = useCallback(() => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  const fadeIn = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    stopFadeInterval();
    audio.volume = 0;

    audio.play().catch(() => {});

    let vol = 0;
    const target = 0.3;
    const steps = 40;
    const step = target / steps;

    fadeIntervalRef.current = setInterval(() => {
      vol = Math.min(target, vol + step);
      audio.volume = vol;
      if (vol >= target) {
        stopFadeInterval();
      }
    }, 50);
  }, [stopFadeInterval]);

  const fadeOut = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    stopFadeInterval();
    let vol = audio.volume;
    const steps = 40;
    const step = vol / steps;

    fadeIntervalRef.current = setInterval(() => {
      vol = Math.max(0, vol - step);
      audio.volume = vol;
      if (vol <= 0) {
        audio.pause();
        stopFadeInterval();
      }
    }, 50);
  }, [stopFadeInterval]);

  const toggle = () => {
    if (isPlaying) {
      fadeOut();
      setIsPlaying(false);
    } else {
      fadeIn();
      setIsPlaying(true);
    }
  };

  if (!ready || !available) return null;

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full glass text-white/60 hover:text-white/90 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isPlaying ? "Mute music" : "Play music"}
    >
      {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </motion.button>
  );
}
