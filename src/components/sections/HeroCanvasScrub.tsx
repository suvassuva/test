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

          {/* Floating Gold Particles */}
          <GoldParticles particleCount={20} />
        </div>

        {/* ========================================================= */}
        {/* FLOATING EDITORIAL TYPOGRAPHY (WITHOUT BACKGROUND CARD)    */}
        {/* ========================================================= */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 pointer-events-none">
          <div className="relative w-full max-w-4xl flex items-center justify-center">

            {/* ----------------- ACT 01: HERITAGE & BULLION ----------------- */}
            <div
              ref={text1Ref}
              className="w-full flex flex-col items-center justify-center text-center pointer-events-auto px-2 sm:px-6"
            >
              {/* Floating Headline with Cinematic Drop Shadow */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-luxury-ivory tracking-tight leading-[1.18] mb-3 sm:mb-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] max-w-3xl">
                Generations of Gold —{" "}
                <span className="gold-gradient-text font-normal block sm:inline">
                  Honored with Absolute Trust.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-base md:text-lg text-luxury-ivory/95 font-normal sm:font-light max-w-xl sm:max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                Every piece of jewellery holds family memories and generational security. Whether acquiring certified 999 24K bullion coins or unlocking the value of family gold, experience transparent daily market rates in an atmosphere of respect.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onOpenValuation}
                  className="gold-gradient-btn px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-maroon-darkest font-semibold tracking-wider text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-gold-glow uppercase w-full sm:w-auto drop-shadow-xl cursor-pointer active:scale-95 transition-transform"
                >
                  <span>Get Instant Valuation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`tel:${BRAND_INFO.helpline.replace(/\s+/g, "")}`}
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-gold-metallic/50 text-gold-champagne hover:bg-gold-metallic/20 uppercase tracking-wider text-xs sm:text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors w-full sm:w-auto bg-maroon-darkest/75 backdrop-blur-md drop-shadow-xl"
                >
                  <Phone className="w-4 h-4 text-gold-metallic" />
                  <span>Call {BRAND_INFO.helpline}</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="hidden sm:flex items-center justify-center gap-6 mt-8 pt-5 text-xs text-luxury-ivory/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-gold-metallic" />
                  <span>BIS 916 Hallmarked</span>
                </div>
                <span className="text-gold-metallic/40">•</span>
                <div className="flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-gold-metallic" />
                  <span>Certified 999 24K Bullion</span>
                </div>
                <span className="text-gold-metallic/40">•</span>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-gold-metallic" />
                  <span>100% Transparent Rates</span>
                </div>
              </div>
            </div>

            {/* ----------------- ACT 02: DIGNIFIED HANDOVER ----------------- */}
            <div
              ref={text2Ref}
              className="absolute inset-0 w-full flex flex-col items-center justify-center text-center pointer-events-auto px-2 sm:px-6"
            >
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-luxury-ivory tracking-tight leading-[1.18] mb-3 sm:mb-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] max-w-3xl">
                White-Glove Handover —{" "}
                <span className="gold-gradient-text font-normal block sm:inline">
                  In Complete Confidentiality.
                </span>
              </h2>

              <p className="text-xs sm:text-base md:text-lg text-luxury-ivory/95 font-normal sm:font-light max-w-xl sm:max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                No crowded showroom counters, no inquisitive onlookers. Step into our secured private cabins where your jewellery never leaves your sight. Gold is weighed openly on calibrated 0.001g digital balances where every milligram counts.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
                <a
                  href={`tel:${BRAND_INFO.helpline.replace(/\s+/g, "")}`}
                  className="gold-gradient-btn px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-maroon-darkest font-semibold tracking-wider text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-gold-glow uppercase w-full sm:w-auto drop-shadow-xl"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Valuation Desk: {BRAND_INFO.helpline}</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="hidden sm:flex items-center justify-center gap-6 mt-8 pt-5 text-xs text-luxury-ivory/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-gold-metallic" />
                  <span>Soundproof Private Cabins</span>
                </div>
                <span className="text-gold-metallic/40">•</span>
                <div className="flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-gold-metallic" />
                  <span>Calibrated 0.001g Balances</span>
                </div>
                <span className="text-gold-metallic/40">•</span>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-gold-metallic" />
                  <span>Release Pledged Bank Gold</span>
                </div>
              </div>
            </div>

            {/* ----------------- ACT 03: PURITY SCAN ----------------- */}
            <div
              ref={text3Ref}
              className="absolute inset-0 w-full flex flex-col items-center justify-center text-center pointer-events-auto px-2 sm:px-6"
            >
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-luxury-ivory tracking-tight leading-[1.18] mb-3 sm:mb-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] max-w-3xl">
                100% Scientific Precision —{" "}
                <span className="gold-gradient-text font-normal block sm:inline">
                  Without Melting a Milligram.
                </span>
              </h2>

              <p className="text-xs sm:text-base md:text-lg text-luxury-ivory/95 font-normal sm:font-light max-w-xl sm:max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                Never allow your cherished ornaments to be scratched, filed, or melted. Our computerized German Karatmeter uses high-precision X-Ray Fluorescence to analyze exact purity in 45 seconds right in front of you. Zero damage, zero arbitrary deductions.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
                <a
                  href={`tel:${BRAND_INFO.helpline.replace(/\s+/g, "")}`}
                  className="gold-gradient-btn px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-maroon-darkest font-semibold tracking-wider text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-gold-glow uppercase w-full sm:w-auto drop-shadow-xl"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Valuation Desk: {BRAND_INFO.helpline}</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="hidden sm:flex items-center justify-center gap-6 mt-8 pt-5 text-xs text-luxury-ivory/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-gold-metallic" />
                  <span>Zero Melting Damage</span>
                </div>
                <span className="text-gold-metallic/40">•</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-metallic" />
                  <span>German XRF Spectrometry</span>
                </div>
                <span className="text-gold-metallic/40">•</span>
                <div className="flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-gold-metallic" />
                  <span>45-Second Exact Karatage</span>
                </div>
              </div>
            </div>

            {/* ----------------- ACT 04: INSTANT PAYMENT ----------------- */}
            <div
              ref={text4Ref}
              className="absolute inset-0 w-full flex flex-col items-center justify-center text-center pointer-events-auto px-2 sm:px-6"
            >
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-luxury-ivory tracking-tight leading-[1.18] mb-3 sm:mb-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] max-w-3xl">
                Immediate Bank Settlement —{" "}
                <span className="gold-gradient-text font-normal block sm:inline">
                  Credited in Under 20 Minutes.
                </span>
              </h2>

              <p className="text-xs sm:text-base md:text-lg text-luxury-ivory/95 font-normal sm:font-light max-w-xl sm:max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                Experience instant financial liquidity without delays. Your funds are credited directly to your bank account via instant IMPS or RTGS before you exit our branch, backed by official stamped documentation and 12+ years of trust.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
                <a
                  href={`tel:${BRAND_INFO.helpline.replace(/\s+/g, "")}`}
                  className="gold-gradient-btn px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-maroon-darkest font-semibold tracking-wider text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-gold-glow uppercase w-full sm:w-auto drop-shadow-xl"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Helpline: {BRAND_INFO.helpline}</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="hidden sm:flex items-center justify-center gap-6 mt-8 pt-5 text-xs text-luxury-ivory/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                <div className="flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-gold-metallic" />
                  <span>Direct Bank Credit via IMPS</span>
                </div>
                <span className="text-gold-metallic/40">•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gold-metallic" />
                  <span>Official Stamped Certificate</span>
                </div>
                <span className="text-gold-metallic/40">•</span>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-gold-metallic" />
                  <span>1.5+ Crore Customers</span>
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
