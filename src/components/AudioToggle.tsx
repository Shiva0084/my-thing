"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioToggle() {
  const [available, setAvailable] = useState(false);
  const [muted, setMuted] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopFade = useCallback(() => {
    if (fadeIntervalRef.current !== null) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  const fadeTo = useCallback(
    (target: number, onDone?: () => void) => {
      const audio = audioRef.current;
      if (!audio) return;
      stopFade();

      const startVol = audio.volume;
      const diff = target - startVol;
      const steps = 40;
      let step = 0;

      fadeIntervalRef.current = setInterval(() => {
        step++;
        audio.volume = startVol + diff * (step / steps);
        if (step >= steps) {
          audio.volume = target;
          stopFade();
          onDone?.();
        }
      }, 50);
    },
    [stopFade]
  );

  useEffect(() => {
    let cancelled = false;

    fetch("/audio/ambient.mp3", { method: "HEAD" })
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        if (cancelled) return;
        const audio = new Audio("/audio/ambient.mp3");
        audio.loop = true;
        audio.preload = "auto";
        audio.volume = 0;
        audioRef.current = audio;
        setAvailable(true);
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });

    return () => {
      cancelled = true;
      stopFade();
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [stopFade]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (muted) {
      const promise = audio.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            setMuted(false);
            fadeTo(0.18);
          })
          .catch(() => {});
      } else {
        setMuted(false);
        fadeTo(0.18);
      }
    } else {
      fadeTo(0, () => {
        audio.pause();
        setMuted(true);
      });
    }
  }, [muted, fadeTo]);

  if (!available) return null;

  return (
    <button
      onClick={toggle}
      className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full glass text-white/70 hover:text-white transition-colors"
      aria-label={muted ? "Play music" : "Mute music"}
    >
      {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
    </button>
  );
}
