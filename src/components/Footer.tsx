"use client";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-center gap-4 border-t border-white/[0.02] px-6 py-12">
      <svg width="14" height="14" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx={65} cy={50} r={35} fill="#03050C" />
        <circle cx={50} cy={50} r={35} fill="#F8F6EE" opacity={0.8} />
      </svg>
      <p className="font-body text-[10px] tracking-[0.2em] text-white/10">
        2026
      </p>
    </footer>
  );
}
