"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Award,
  Building2,
  Users,
  IndianRupee,
  Clock,
  Sparkles,
  PhoneCall,
} from "lucide-react";

interface PanIndiaTrustProps {
  onOpenValuation?: () => void;
}

export const PanIndiaTrust: React.FC<PanIndiaTrustProps> = ({ onOpenValuation }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  // Two 3D Cinematic Videos
  const videoScaleRef = useRef<HTMLVideoElement>(null);
  const videoLiquidRef = useRef<HTMLVideoElement>(null);

  // Two Story Narrative Phases
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const pin = pinRef.current;
    const vScale = videoScaleRef.current;
    const vLiquid = videoLiquidRef.current;
    const p1 = phase1Ref.current;
    const p2 = phase2Ref.current;

    if (!container || !pin || !vScale || !vLiquid || !p1 || !p2) return;

    // Strict DOM autoplay binding for mobile iOS Safari & Android hardware acceleration
    const setupVideo = (video: HTMLVideoElement) => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "true");
      video.setAttribute("webkit-playsinline", "true");
      video.play().catch(() => {
        const unlock = () => {
          video.play().catch(() => {});
          window.removeEventListener("touchstart", unlock);
          window.removeEventListener("click", unlock);
          window.removeEventListener("scroll", unlock);
        };
        window.addEventListener("touchstart", unlock, { once: true });
        window.addEventListener("click", unlock, { once: true });
        window.addEventListener("scroll", unlock, { once: true });
      });
    };

    setupVideo(vScale);
    setupVideo(vLiquid);

    const isMobile = window.innerWidth < 768;
    const scrubDistance = isMobile ? 1800 : 2200;

    const ctx = gsap.context(() => {
      // Initialize states: Phase 1 visible, Phase 2 hidden
      gsap.set(vScale, { opacity: 1 });
      gsap.set(vLiquid, { opacity: 0 });
      gsap.set(p1, { opacity: 1, y: 0, pointerEvents: "auto" });
      gsap.set(p2, { opacity: 0, y: 30, pointerEvents: "none" });

      // Pinned scrub timeline with smooth dwell and clean transition
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${scrubDistance}`,
          pin: pin,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // 0.0 - 0.35: Phase 1 lingers, user inspects 24K Coin, Scale, and Heritage Capsules
      tl.to({}, { duration: 0.35 });

      // 0.35 - 0.65: Clean crossfade transition
      tl.to(p1, { opacity: 0, y: -30, pointerEvents: "none", duration: 0.25, ease: "power2.inOut" }, 0.35)
        .to(vScale, { opacity: 0, duration: 0.3, ease: "power2.inOut" }, 0.35)
        .to(vLiquid, { opacity: 1, duration: 0.3, ease: "power2.inOut" }, 0.4)
        .to(p2, { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.25, ease: "power2.inOut" }, 0.45);

      // 0.65 - 1.0: Phase 2 lingers, user inspects Liquid Gold, Value, and Instant Payout
      tl.to({}, { duration: 0.35 });
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[220vh] sm:h-[250vh] bg-maroon-darkest overflow-visible"
      aria-label="Pan-India Trust Storytelling"
    >
      {/* 📌 PINNED FULLSCREEN CINEMATIC CANVAS (Uses dvh for mobile address bar safety) */}
      <div
        ref={pinRef}
        className="relative w-full h-screen h-[100dvh] overflow-hidden flex flex-col justify-between"
      >
        {/* ==================================================================== */}
        {/* 🎬 3D VIDEO LAYER 01: Sovereign Scale & Pan-India Reach               */}
        {/* ==================================================================== */}
        <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-0">
          <video
            ref={videoScaleRef}
            src="/media/videos/trust-gold-scale.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-[32%_center] sm:object-center scale-105 sm:scale-100 brightness-110 contrast-105"
          />
        </div>

        {/* ==================================================================== */}
        {/* 🎬 3D VIDEO LAYER 02: 24K Liquid Gold Purity & Instant Settlement    */}
        {/* ==================================================================== */}
        <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-0">
          <video
            ref={videoLiquidRef}
            src="/media/videos/trust-liquid-gold.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center scale-105 sm:scale-100 brightness-110 contrast-105"
          />
        </div>

        {/* ==================================================================== */}
        {/* 🌫️ SOFT CINEMATIC VIGNETTE (Gentle edges, leaving 90% center bright)  */}
        {/* ==================================================================== */}
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-darkest/85 via-transparent to-maroon-darkest/90 pointer-events-none z-[1]" />
        <div className="absolute inset-0 bg-black/15 pointer-events-none z-[1]" />

        {/* ==================================================================== */}
        {/* 🏛️ FOREGROUND NARRATIVE LAYERS (Clean, Centered, No Overlap)         */}
        {/* ==================================================================== */}
        <div className="relative w-full h-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 z-10">

          {/* ================================================================== */}
          {/* 📜 CHAPTER 01: HERITAGE & REACH                                     */}
          {/* ================================================================== */}
          <div
            ref={phase1Ref}
            className="absolute inset-0 px-4 sm:px-8 lg:px-16 flex flex-col justify-between pt-16 sm:pt-20 pb-8 sm:pb-12 pointer-events-auto"
          >
            {/* Header Text */}
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <div className="flex items-center gap-2 sm:gap-4 mb-2.5 sm:mb-4">
                <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-gold-metallic" />
                <span className="text-gold-metallic text-xs">✦</span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-gold-champagne uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  Trusted by Millions Across India
                </span>
                <span className="text-gold-metallic text-xs">✦</span>
                <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-gold-metallic" />
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-luxury-ivory font-light tracking-wide leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                A Legacy of Absolute Integrity & Instant Dignity
              </h2>

              <p className="mt-2.5 sm:mt-4 text-xs sm:text-sm md:text-base text-luxury-muted font-light max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                South India’s largest and most trusted pioneer in transparent, computerized gold valuation with on-the-spot bank transfer.
              </p>
            </div>

            {/* 3 Sleek Floating Capsules (Center stays 100% open) */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 lg:gap-6 max-w-5xl mx-auto w-full">
              {/* Capsule 1: 14+ Years */}
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-1.5 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-maroon-darkest/80 hover:bg-maroon-velvet/70 border border-gold-metallic/35 backdrop-blur-xl shadow-2xl transition-all duration-300">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full shrink-0 flex items-center justify-center bg-gradient-to-br from-[#A8151E] to-[#4A0404] border border-gold-metallic/50 shadow-md">
                  <Award className="w-4 h-4 sm:w-6 sm:h-6 text-luxury-ivory" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-base lg:text-lg font-serif font-bold text-luxury-ivory">
                    14+ Years
                  </h3>
                  <p className="text-[9px] sm:text-xs text-luxury-muted font-light">of Excellence Since 2011</p>
                </div>
              </div>

              {/* Capsule 2: 200+ Branches */}
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-1.5 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-maroon-darkest/80 hover:bg-maroon-velvet/70 border border-gold-metallic/35 backdrop-blur-xl shadow-2xl transition-all duration-300">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full shrink-0 flex items-center justify-center bg-gradient-to-br from-[#A8151E] to-[#4A0404] border border-gold-metallic/50 shadow-md">
                  <Building2 className="w-4 h-4 sm:w-6 sm:h-6 text-luxury-ivory" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-base lg:text-lg font-serif font-bold text-luxury-ivory">
                    200+ Branches
                  </h3>
                  <p className="text-[9px] sm:text-xs text-luxury-muted font-light">Across South India</p>
                </div>
              </div>

              {/* Capsule 3: 1.5 Crore+ Customers */}
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-1.5 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-maroon-darkest/80 hover:bg-maroon-velvet/70 border border-gold-metallic/35 backdrop-blur-xl shadow-2xl transition-all duration-300">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full shrink-0 flex items-center justify-center bg-gradient-to-br from-[#A8151E] to-[#4A0404] border border-gold-metallic/50 shadow-md">
                  <Users className="w-4 h-4 sm:w-6 sm:h-6 text-luxury-ivory" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-base lg:text-lg font-serif font-bold text-luxury-ivory">
                    1.5 Crore+
                  </h3>
                  <p className="text-[9px] sm:text-xs text-luxury-muted font-light">Happy Families</p>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================== */}
          {/* 📜 CHAPTER 02: LIQUIDITY & PURITY                                   */}
          {/* ================================================================== */}
          <div
            ref={phase2Ref}
            className="absolute inset-0 px-4 sm:px-8 lg:px-16 flex flex-col justify-between pt-16 sm:pt-20 pb-8 sm:pb-12 pointer-events-auto"
          >
            {/* Header Text */}
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <div className="flex items-center gap-2 sm:gap-4 mb-2.5 sm:mb-4">
                <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-gold-metallic" />
                <span className="text-gold-metallic text-xs">✦</span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-gold-champagne uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  Immediate Liquidity • Zero Deductions
                </span>
                <span className="text-gold-metallic text-xs">✦</span>
                <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-gold-metallic" />
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-luxury-ivory font-light tracking-wide leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                100% Scientific Precision Converted in Minutes
              </h2>

              <p className="mt-2.5 sm:mt-4 text-xs sm:text-sm md:text-base text-luxury-muted font-light max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                Pure 24K value unlocked directly in front of you. Non-destructive German XRF testing with instant bank settlement.
              </p>
            </div>

            {/* 2 Sleek Value Capsules + Quick Action CTA */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4 lg:gap-6 max-w-5xl mx-auto w-full items-center">
              {/* Capsule 1: Highest Price */}
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-1.5 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-maroon-darkest/80 hover:bg-maroon-velvet/70 border border-gold-metallic/35 backdrop-blur-xl shadow-2xl transition-all duration-300">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full shrink-0 flex items-center justify-center bg-gradient-to-br from-[#A8151E] to-[#4A0404] border border-gold-metallic/50 shadow-md">
                  <IndianRupee className="w-4 h-4 sm:w-6 sm:h-6 text-luxury-ivory" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-base lg:text-lg font-serif font-bold text-luxury-ivory">
                    Highest Price
                  </h3>
                  <p className="text-[9px] sm:text-xs text-luxury-muted font-light">Live Bullion Rate</p>
                </div>
              </div>

              {/* Capsule 2: Instant Payment */}
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-1.5 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-maroon-darkest/80 hover:bg-maroon-velvet/70 border border-gold-metallic/35 backdrop-blur-xl shadow-2xl transition-all duration-300">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full shrink-0 flex items-center justify-center bg-gradient-to-br from-[#A8151E] to-[#4A0404] border border-gold-metallic/50 shadow-md">
                  <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-luxury-ivory" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-base lg:text-lg font-serif font-bold text-luxury-ivory">
                    Instant Pay
                  </h3>
                  <p className="text-[9px] sm:text-xs text-luxury-muted font-light">&lt; 3 Mins IMPS/RTGS</p>
                </div>
              </div>

              {/* CTA Capsule */}
              <div className="col-span-2 sm:col-span-1 flex flex-col gap-1.5 sm:gap-2">
                <button
                  onClick={onOpenValuation}
                  className="w-full inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-gold-champagne via-gold-bright to-gold-metallic text-maroon-darkest font-semibold text-[11px] sm:text-xs tracking-wider uppercase shadow-gold-glow active:scale-95 transition-transform duration-200"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Instant Valuation</span>
                </button>
                <a
                  href="tel:8880300300"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg sm:rounded-xl bg-maroon-velvet/50 hover:bg-maroon-velvet border border-gold-metallic/25 text-gold-champagne text-[10px] sm:text-xs font-medium transition-colors"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>24/7 Helpline: 8880 300 300</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
