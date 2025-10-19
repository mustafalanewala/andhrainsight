"use client";

import BreakingNews from "@/components/BreakingNews";
import Hero from "@/components/Hero";
import Ad from "@/components/Ad";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(100%_50%_at_50%_0%,_rgba(30,164,255,0.2)_0%,_transparent_60%),_linear-gradient(to_bottom,_rgba(155,89,255,0.15),_transparent_40%),_var(--background)]">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Ad slot="homepage-banner" format="banner" className="mb-8" />
      </div>
      <BreakingNews />
    </div>
  );
}
