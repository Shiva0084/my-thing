"use client";

import { type ReactNode } from "react";
import dynamic from "next/dynamic";
import { ScrollProvider } from "@/lib/scroll-provider";

const LoadingScreen = dynamic(
  () => import("@/components/LoadingScreen"),
  { ssr: false }
);

const ScrollProgress = dynamic(
  () => import("@/components/ScrollProgress"),
  { ssr: false }
);

const CloudEffect = dynamic(
  () => import("@/components/CloudEffect"),
  { ssr: false }
);

const CustomCursor = dynamic(
  () => import("@/components/CustomCursor"),
  { ssr: false }
);

const AudioToggle = dynamic(
  () => import("@/components/AudioToggle"),
  { ssr: false }
);

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ScrollProvider>
      <LoadingScreen />
      <ScrollProgress />
      <CloudEffect />
      <CustomCursor />
      <AudioToggle />
      {children}
    </ScrollProvider>
  );
}
