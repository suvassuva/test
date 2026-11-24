"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GoldParticles } from "../effects/GoldParticles";
import {
  ChevronDown,
  Phone,
  ArrowRight,
  ShieldCheck,
  Scale,
  Clock,
  Award,
  Flame,
  CheckCircle2,
  Building,
  Lock,
} from "lucide-react";
import { BRAND_INFO } from "@/lib/constants";

interface HeroCanvasScrubProps {
  onOpenValuation?: () => void;
}

export const HeroCanvasScrub: React.FC<HeroCanvasScrubProps> = ({ onOpenValuation }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  // 4 High-Definition Storytelling Videos
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const video3Ref = useRef<HTMLVideoElement>(null);
  const video4Ref = useRef<HTMLVideoElement>(null);

  // 4 Story Narrative Text Blocks
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);

  // Bottom Scroll Progress Indicator
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const pin = pinRef.current;

    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    const v3 = video3Ref.current;
    const v4 = video4Ref.current;

    const t1 = text1Ref.current;
    const t2 = text2Ref.current;
    const t3 = text3Ref.current;
    const t4 = text4Ref.current;

    if (!container || !pin || !v1 || !v2 || !v3 || !v4 || !t1 || !t2 || !t3 || !t4) return;

    // Strict DOM property binding for continuous hardware-accelerated autoplay
    const setupAndPlay = (video: HTMLVideoElement) => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "true");
      video.setAttribute("webkit-playsinline", "true");
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const unlock = () => {
            video.play().catch(() => {});
            window.removeEventListener("click", unlock);
            window.removeEventListener("scroll", unlock);
          };
          window.addEventListener("click", unlock, { once: true });
          window.addEventListener("scroll", unlock, { once: true });
        });
      }
    };

    [v1, v2, v3, v4].forEach(setupAndPlay);

    const ctx = gsap.context(() => {
      // Pinned timeline with high dwell time (~3800px)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=3800",
          pin: pin,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      scrollTriggerInstance.current = tl.scrollTrigger as ScrollTrigger;

      // INITIAL STATES:
      gsap.set(v1, { opacity: 1, scale: 1 });
      gsap.set(v2, { opacity: 0, scale: 1.02 });
      gsap.set(v3, { opacity: 0, scale: 1.02 });
      gsap.set(v4, { opacity: 0, scale: 1.02 });

      // Text 1 active, Texts 2, 3, 4 waiting below with gentle blur
      gsap.set(t1, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)" });
      gsap.set(t2, { autoAlpha: 0, y: 35, scale: 0.97, filter: "blur(6px)" });
      gsap.set(t3, { autoAlpha: 0, y: 35, scale: 0.97, filter: "blur(6px)" });
      gsap.set(t4, { autoAlpha: 0, y: 35, scale: 0.97, filter: "blur(6px)" });

      // =========================================================================
      // DWELL & TRANSITIONS TIMELINE
      // Act 01 Dwell: 0.0 -> 1.8
      // Trans 1->2:  1.8 -> 2.8
      // Act 02 Dwell: 2.8 -> 4.5
      // Trans 2->3:  4.5 -> 5.5
      // Act 03 Dwell: 5.5 -> 7.2
      // Trans 3->4:  7.2 -> 8.2
      // Act 04 Dwell: 8.2 -> 10.0
      // =========================================================================

      // --- TRANSITION 1 (Heritage -> Handover) ---
      tl.to(
        t1,
        {
          autoAlpha: 0,
          y: -30,
          scale: 1.02,
          filter: "blur(5px)",
          duration: 0.9,
          ease: "power2.inOut",
        },
        1.8
      )
        .to(v1, { opacity: 0, duration: 1.0, ease: "power2.inOut" }, 1.8)
        .to(v2, { opacity: 1, scale: 1, duration: 1.0, ease: "power2.inOut" }, 1.8)
        .to(
          t2,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power2.out",
          },
          2.3
        )

        // --- TRANSITION 2 (Handover -> Karatmeter Purity Scan) ---
        .to(
          t2,
          {
            autoAlpha: 0,
            y: -30,
            scale: 1.02,
            filter: "blur(5px)",
            duration: 0.9,
            ease: "power2.inOut",
          },
          4.5
        )
        .to(v2, { opacity: 0, duration: 1.0, ease: "power2.inOut" }, 4.5)
        .to(v3, { opacity: 1, scale: 1, duration: 1.0, ease: "power2.inOut" }, 4.5)
        .to(
          t3,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power2.out",
          },
          5.0
        )

        // --- TRANSITION 3 (Karatmeter -> Instant Bank Credit Settlement) ---
        .to(
          t3,
          {
            autoAlpha: 0,
            y: -30,
            scale: 1.02,
            filter: "blur(5px)",
            duration: 0.9,
            ease: "power2.inOut",
          },
          7.2
        )
        .to(v3, { opacity: 0, duration: 1.0, ease: "power2.inOut" }, 7.2)
        .to(v4, { opacity: 1, scale: 1, duration: 1.0, ease: "power2.inOut" }, 7.2)
        .to(
          t4,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power2.out",
          },
          7.7
        );
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div id="hero" ref={containerRef} className="relative w-full bg-maroon-darkest">
      {/* Pinned Viewport Container */}
      <div
        ref={pinRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        {/* ========================================================= */}
        {/* 4 STORY VIDEOS LAYER (100% UNOBSTRUCTED CINEMATIC VIEW)   */}
        {/* ========================================================= */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* VIDEO 1: Act 01 - Heritage Gold Craftsmanship & 24K Bullion */}
          <video
            ref={video1Ref}
            src="/media/videos/hero-buying-heritage.mp4"
            poster="/media/images/preview-buy-act01.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.08] saturate-[1.10] will-change-transform"
          />

          {/* VIDEO 2: Act 02 - Dignified Handover in Private Cabin */}
          <video
            ref={video2Ref}
            src="/media/videos/hero-handover-clean.mp4"
            poster="/media/images/preview-act01.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.08] saturate-[1.10] will-change-transform"
          />

          {/* VIDEO 3: Act 03 - Precision German Karatmeter XRF Testing */}
          <video
            ref={video3Ref}
            src="/media/videos/hero-karatmeter-clean.mp4"
            poster="/media/images/preview-act02.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.08] saturate-[1.10] will-change-transform"
          />

          {/* VIDEO 4: Act 04 - Instant Bank Settlement & Official Certificate */}
          <video
            ref={video4Ref}
            src="/media/videos/hero-settlement-clean.mp4"
            poster="/media/images/preview-act03.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.08] saturate-[1.10] will-change-transform"
          />

          {/* Luxury Image Fallback */}
          <noscript>
            <Image
              src="/media/images/attica-heritage-necklace-silk.jpg"
              alt="Attica Gold Luxury Valuation"
              fill
              priority
              className="object-cover"
            />
          </noscript>

          {/* Subtle cinematic gradient only at top/bottom edges for navbar & footer contrast */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(18, 5, 5, 0.35) 75%, rgba(14, 1, 1, 0.75) 100%)",
            }}
          />

          {/* Cinematic lower-third shadow vignette to ensure editorial readability */}
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-maroon-darkest/95 via-maroon-darkest/50 to-transparent pointer-events-none z-[1]" />

          {/* Floating Gold Particles */}
          <GoldParticles particleCount={20} />
        </div>

        {/* ========================================================= */}
        {/* EDITORIAL LOWER-THIRD LUXURY GLASS CARDS (NO TEXT CLASH)  */}
        {/* ========================================================= */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end items-center px-4 sm:px-6 md:px-8 pb-14 sm:pb-18 lg:pb-22 pointer-events-none">
          <div className="relative w-full max-w-3xl flex items-center justify-center min-h-[300px] sm:min-h-[320px]">

            {/* ----------------- ACT 01: HERITAGE & BULLION ----------------- */}
            <div
              ref={text1Ref}
              className="w-full rounded-2xl sm:rounded-3xl bg-maroon-darkest/85 backdrop-blur-xl border border-gold-metallic/35 shadow-[0_16px_50px_rgba(0,0,0,0.9)] p-5 sm:p-7 md:p-8 flex flex-col items-center justify-center text-center pointer-events-auto"
            >
              {/* Floating Headline */}
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-light text-luxury-ivory tracking-tight leading-[1.2] mb-2 sm:mb-3 max-w-2xl">
                Ancestral Gold —{" "}
                <span className="gold-gradient-text font-normal block sm:inline">
                  Your Shield in an Emergency.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm md:text-base text-luxury-ivory/90 font-light max-w-xl mx-auto leading-relaxed mb-4 sm:mb-6">
                Every traditional necklace and sacred ornament holds generations of honor. When urgent medical or sudden financial needs arise, unlock maximum daily market value without falling into high-interest debt traps.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onOpenValuation}
                  className="gold-gradient-btn px-6 sm:px-7 py-3 rounded-full text-maroon-darkest font-semibold tracking-wider text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-gold-glow uppercase w-full sm:w-auto cursor-pointer active:scale-95 transition-transform"
                >
                  <span>Get Instant Valuation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`tel:${BRAND_INFO.helpline.replace(/\s+/g, "")}`}
                  className="px-5 sm:px-6 py-3 rounded-full border border-gold-metallic/40 text-gold-champagne hover:bg-gold-metallic/20 uppercase tracking-wider text-xs sm:text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors w-full sm:w-auto bg-maroon-darkest/75 backdrop-blur-md"
                >
                  <Phone className="w-4 h-4 text-gold-metallic" />
                  <span>Call {BRAND_INFO.helpline}</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="hidden sm:flex items-center justify-center gap-5 mt-4 pt-3 text-xs text-luxury-ivory/80 border-t border-gold-metallic/15 w-full">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-gold-metallic" />
                  <span>Ancestral Gold Honored</span>
                </div>
                <span className="text-gold-metallic/40">•</span>
                <div className="flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-gold-metallic" />
                  <span>Instant Emergency Relief</span>
                </div>
                <span className="text-gold-metallic/40">•</span>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-gold-metallic" />
                  <span>Highest Market Rates</span>
                </div>
              </div>
            </div>

            {/* ----------------- ACT 02: DIGNIFIED HANDOVER ----------------- */}
            <div
              ref={text2Ref}
              className="absolute inset-0 w-full rounded-2xl sm:rounded-3xl bg-maroon-darkest/85 backdrop-blur-xl border border-gold-metallic/35 shadow-[0_16px_50px_rgba(0,0,0,0.9)] p-5 sm:p-7 md:p-8 flex flex-col items-center justify-center text-center pointer-events-auto"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-light text-luxury-ivory tracking-tight leading-[1.2] mb-2 sm:mb-3 max-w-2xl">
                Respecting Your Heirlooms —{" "}
                <span className="gold-gradient-text font-normal block sm:inline">
                  In Private Executive Cabins.
                </span>
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-luxury-ivory/90 font-light max-w-xl mx-auto leading-relaxed mb-4 sm:mb-6">
                Handing over family gold is an emotional step that deserves absolute privacy. In our secure, soundproof cabins across 200+ branches, your ornaments never leave your sight. We also assist with compassionate discretion to release high-interest pledged gold.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                <a
                  href={`tel:${BRAND_INFO.helpline.replace(/\s+/g, "")}`}
                  className="gold-gradient-btn px-6 sm:px-8 py-3 rounded-full text-maroon-darkest font-semibold tracking-wider text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-gold-glow uppercase w-full sm:w-auto"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Valuation Desk: {BRAND_INFO.helpline}</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="hidden sm:flex items-center justify-center gap-5 mt-4 pt-3 text-xs text-luxury-ivory/80 border-t border-gold-metallic/15 w-full">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-gold-metallic" />
                  <span>100% Confidential Cabins</span>
                </div>
                <span className="text-gold-metallic/40">•</span>
                <div className="flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-gold-metallic" />
                  <span>Release Pledged Gold Assistance</span>
                </div>
                <span className="text-gold-metallic/40">•</span>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-gold-metallic" />
                  <span>Dignified Care</span>
                </div>
              </div>
            </div>

            {/* ----------------- ACT 03: PURITY SCAN ----------------- */}
            <div
              ref={text3Ref}
              className="absolute inset-0 w-full rounded-2xl sm:rounded-3xl bg-maroon-darkest/85 backdrop-blur-xl border border-gold-metallic/35 shadow-[0_16px_50px_rgba(0,0,0,0.9)] p-5 sm:p-7 md:p-8 flex flex-col items-center justify-center text-center pointer-events-auto"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-light text-luxury-ivory tracking-tight leading-[1.2] mb-2 sm:mb-3 max-w-2xl">
                German Karatmeter Testing —{" "}
                <span className="gold-gradient-text font-normal block sm:inline">
                  Never Melted, Never Damaged.
                </span>
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-luxury-ivory/90 font-light max-w-xl mx-auto leading-relaxed mb-4 sm:mb-6">
                Sentimental ornaments should never be scratched, filed, or melted down. Certified German XRF technology tests exact 22K/24K purity on-screen in 45 seconds right before your eyes. Zero melting losses, zero hidden deductions.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                <a
                  href={`tel:${BRAND_INFO.helpline.replace(/\s+/g, "")}`}
                  className="gold-gradient-btn px-6 sm:px-8 py-3 rounded-full text-maroon-darkest font-semibold tracking-wider text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-gold-glow uppercase w-full sm:w-auto"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Valuation Desk: {BRAND_INFO.helpline}</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="hidden sm:flex items-center justify-center gap-5 mt-4 pt-3 text-xs text-luxury-ivory/80 border-t border-gold-metallic/15 w-full">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-gold-metallic" />
                  <span>Zero Melting Damage</span>
                </div>
                <span className="text-gold-metallic/40">•</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-metallic" />
                  <span>German XRF Precision</span>
                </div>
                <span className="text-gold-metallic/40">•</span>
                <div className="flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-gold-metallic" />
                  <span>Exact 0.001g Balances</span>
                </div>
              </div>
            </div>

            {/* ----------------- ACT 04: INSTANT PAYMENT ----------------- */}
            <div
              ref={text4Ref}
              className="absolute inset-0 w-full rounded-2xl sm:rounded-3xl bg-maroon-darkest/85 backdrop-blur-xl border border-gold-metallic/35 shadow-[0_16px_50px_rgba(0,0,0,0.9)] p-5 sm:p-7 md:p-8 flex flex-col items-center justify-center text-center pointer-events-auto"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-light text-luxury-ivory tracking-tight leading-[1.2] mb-2 sm:mb-3 max-w-2xl">
                Instant Bank Credit in Minutes —{" "}
                <span className="gold-gradient-text font-normal block sm:inline">
                  Peace of Mind Restored.
                </span>
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-luxury-ivory/90 font-light max-w-xl mx-auto leading-relaxed mb-4 sm:mb-6">
                When an emergency strikes, your family cannot afford to wait. Funds are credited directly to your bank account via instant IMPS before you step out of our doors, backed by official stamped documentation and 1.5+ Crore satisfied families.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                <a
                  href={`tel:${BRAND_INFO.helpline.replace(/\s+/g, "")}`}
                  className="gold-gradient-btn px-6 sm:px-8 py-3 rounded-full text-maroon-darkest font-semibold tracking-wider text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-gold-glow uppercase w-full sm:w-auto"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Helpline: {BRAND_INFO.helpline}</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="hidden sm:flex items-center justify-center gap-5 mt-4 pt-3 text-xs text-luxury-ivory/80 border-t border-gold-metallic/15 w-full">
                <div className="flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-gold-metallic" />
                  <span>Direct Bank Credit via IMPS</span>
                </div>
                <span className="text-gold-metallic/40">•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gold-metallic" />
                  <span>Emergency Settled Under 10 Mins</span>
                </div>
                <span className="text-gold-metallic/40">•</span>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-gold-metallic" />
                  <span>1.5+ Crore Families Helped</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* BOTTOM GOLD SCROLL INDICATOR                             */}
        {/* ========================================================= */}
        <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-20 flex flex-col items-center pointer-events-none">
          <div className="flex items-center gap-1.5 mb-1.5 text-gold-champagne/80 text-[9px] sm:text-[11px] uppercase tracking-[0.25em] font-medium drop-shadow-md">
            <span>Scroll to Experience</span>
            <ChevronDown className="w-3 h-3 animate-bounce text-gold-champagne" />
          </div>

          {/* Mini Progress Bar */}
          <div className="w-24 sm:w-36 h-[2px] bg-maroon-velvet/80 rounded-full overflow-hidden border border-gold-metallic/25 shadow-inner">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-gold-metallic via-gold-champagne to-gold-bright w-0 transition-all duration-75 ease-out shadow-gold-glow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
