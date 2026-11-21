"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import { Phone, Calculator } from "lucide-react";
import { BRAND_INFO } from "@/lib/constants";

interface NavbarProps {
  onOpenValuation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenValuation }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "py-3 sm:py-3.5 md:py-4 bg-maroon-darkest/95 backdrop-blur-xl border-b border-gold-metallic/25 shadow-maroon-depth"
            : "py-3.5 sm:py-5 md:py-6 bg-gradient-to-b from-maroon-darkest/95 via-maroon-deep/60 to-transparent"
        }`}
      >
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Official Attica Gold Company Brand Logo */}
            <a
              href="#"
              className="flex items-center group focus:outline-none shrink-0 py-1"
              aria-label="Attica Gold Company Home"
            >
              <div className="relative h-11 sm:h-14 md:h-16 flex items-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/media/brand/attica-logo-official.png"
                  alt="Attica Gold Company"
                  width={624}
                  height={198}
                  priority
                  className="h-11 sm:h-14 md:h-16 w-auto object-contain drop-shadow-[0_3px_16px_rgba(212,175,55,0.45)] brightness-110"
                />
              </div>
            </a>



            {/* Right: Actions */}
            <div className="hidden md:flex items-center gap-3 sm:gap-4 shrink-0">
              <a
                href={`tel:${BRAND_INFO.helpline.replace(/\s+/g, "")}`}
                className="flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-wider text-luxury-muted hover:text-gold-champagne transition-colors px-4 py-2.5 rounded-full border border-gold-metallic/20 hover:border-gold-metallic/50 bg-maroon-velvet/40 backdrop-blur-sm"
              >
                <Phone className="w-4 h-4 text-gold-metallic" />
                <span className="font-semibold">{BRAND_INFO.helpline}</span>
              </a>

              <button
                type="button"
                onClick={onOpenValuation}
                className="gold-gradient-btn px-6 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-maroon-darkest inline-flex items-center gap-2.5 shadow-gold-glow cursor-pointer active:scale-95 transition-transform"
              >
                <Calculator className="w-4 h-4" />
                <span>Instant Valuation</span>
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 md:hidden">
              <a
                href={`tel:${BRAND_INFO.helpline.replace(/\s+/g, "")}`}
                className="gold-gradient-btn px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-maroon-darkest inline-flex items-center gap-1.5 shadow-gold-glow"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
            </div>
          </div>


        </div>
      </header>
    </>
  );
};
