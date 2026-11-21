"use client";

import React, { useState } from "react";
import { useLenisScroll } from "@/hooks/useLenisScroll";
import { Preloader } from "@/components/layout/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { HeroCanvasScrub } from "@/components/sections/HeroCanvasScrub";
import { ValuationModal } from "@/components/ui/ValuationModal";

export default function Home() {
  // Initialize Lenis smooth scroll synchronized with GSAP ScrollTrigger
  useLenisScroll();
  const [isValuationOpen, setIsValuationOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-maroon-darkest text-luxury-ivory selection:bg-gold-metallic selection:text-maroon-darkest">
      {/* Luxury Cinematic Preloader */}
      <Preloader />

      {/* Top Gold Progress Indicator */}
      <ScrollProgress />

      {/* Desktop Custom Gold Cursor */}
      <CustomCursor />

      {/* Fixed Glassmorphic Luxury Navigation */}
      <Navbar onOpenValuation={() => setIsValuationOpen(true)} />

      {/* Cinematic Hero Canvas Scrub Experience */}
      <HeroCanvasScrub onOpenValuation={() => setIsValuationOpen(true)} />

      {/* Luxury Footer */}
      <Footer />

      {/* Instant Valuation Modal Form */}
      <ValuationModal
        isOpen={isValuationOpen}
        onClose={() => setIsValuationOpen(false)}
      />
    </main>
  );
}
