"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const apologies = [
  {
    to: "You",
    text: "I failed to be the person you deserved. I was lost in my own pain, and I took it out on you. That was my mistake. No excuses. Mai nahi samajh paya sab kuch yaar, mujhe yaad hai ki maine bola tha ki mai dur nahi hone dunga and I mean that and you are a very own part of me and maine bohot galat kiye tere saath aur khudke saath bhi",
  },
  {
    to: "Your Mother",
    text: "She welcomed me like family. I broke that trust. I carry that regret with me. She deserved better from me. Also maine jo hal kara tera vo unhone hee sambhala and most importantly tujhe sambhala.",
  },
  {
    to: "Your Maasi",
    text: "Her kindness and warmth never went unnoticed. I wasn't worthy of her trust. I am sorry for that. She trusted me, she gave me her car and allowed you to go out with me, and I made her scold you, and puri galti meri thi and maine tera aur unka relation bigada.",
  },
];

export default function ApologySection() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      el.querySelectorAll(".apology-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 50%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 py-24">
      <p className="font-heading mb-12 text-xl text-accent md:text-2xl">
        An Apology
      </p>

      <div ref={cardsRef} className="flex w-full max-w-md flex-col gap-4">
        {apologies.map((item) => (
          <div
            key={item.to}
            className="apology-card glass rounded-2xl p-6 transition-all duration-500"
          >
            <h3 className="font-heading mb-3 text-lg text-white">
              {item.to}
            </h3>
            <p className="font-body text-sm leading-relaxed text-white/50">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
