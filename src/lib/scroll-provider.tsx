"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollContextType {
  progress: number;
  lenisRef: React.MutableRefObject<Lenis | null>;
}

const ScrollContext = createContext<ScrollContextType>({
  progress: 0,
  lenisRef: { current: null },
});

export function useScroll() {
  return useContext(ScrollContext);
}

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", (e) => {
      setProgress(Math.max(0, Math.min(1, e.progress)));
      ScrollTrigger.update();
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenisRef.current = null;
      lenis.destroy();
      gsap.ticker.lagSmoothing(1);
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ progress, lenisRef }}>
      {children}
    </ScrollContext.Provider>
  );
}
