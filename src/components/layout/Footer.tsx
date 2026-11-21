import React from "react";
import Image from "next/image";
import { BRAND_INFO, VALUATION_DISCLAIMER } from "@/lib/constants";
import { Phone, MapPin, ShieldCheck, ArrowUpRight, Globe, FileCheck, Banknote } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-maroon-darkest border-t border-gold-metallic/20 text-luxury-muted pt-12 sm:pt-16 pb-8 sm:pb-12 overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-48 bg-maroon-burgundy/20 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        {/* Main Fully Responsive 4-Column Grid:
            - Mobile (<640px): 1 column (vertical stack with comfortable touch spacing)
            - Tablet (640px - 1023px): 2x2 balanced columns (sm:grid-cols-2)
            - Desktop (>=1024px): 4 equal, spacious columns (lg:grid-cols-4)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-10 xl:gap-14 2xl:gap-16 pb-10 sm:pb-12 border-b border-gold-metallic/15">
          {/* Col 1: Brand & Heritage */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <a
                href="#"
                className="inline-block group focus:outline-none"
                aria-label="Attica Gold Company Home"
              >
                <Image
                  src="/media/brand/attica-logo-official.png"
                  alt="Attica Gold Company"
                  width={624}
                  height={198}
                  className="h-11 sm:h-14 md:h-16 w-auto object-contain drop-shadow-[0_3px_16px_rgba(212,175,55,0.45)] brightness-110 transition-transform duration-300 group-hover:scale-105"
                />
              </a>

              <p className="text-xs sm:text-sm text-luxury-muted/90 leading-relaxed font-light mt-3 sm:mt-4 max-w-sm">
                India&apos;s premier organized gold buying company. Bringing
                corporate transparency, non-destructive German XRF testing, and
                instant settlements to over 200+ branches across South India.
              </p>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-maroon-velvet/40 border border-gold-metallic/25 text-xs text-gold-champagne/95 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-gold-metallic shrink-0" />
                <span className="font-medium tracking-wide">ISO 9001:2015 &amp; BIS Certified Process</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services & Trust */}
          <div className="flex flex-col pt-0 sm:pt-1">
            <h4 className="text-xs sm:text-sm font-serif uppercase tracking-widest text-gold-champagne mb-4 sm:mb-5 font-semibold">
              Services &amp; Trust
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
              <li>
                <a
                  href={`tel:${BRAND_INFO.helpline.replace(/\s+/g, "")}`}
                  className="py-1 hover:text-gold-champagne transition-colors inline-flex items-center gap-1 group text-luxury-muted/90"
                >
                  <span>Instant Gold Valuation</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-gold-metallic" />
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BRAND_INFO.helpline.replace(/\s+/g, "")}`}
                  className="py-1 hover:text-gold-champagne transition-colors inline-flex items-center gap-1 group text-luxury-muted/90"
                >
                  <span>Release Pledged Gold</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-gold-metallic" />
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BRAND_INFO.helpline.replace(/\s+/g, "")}`}
                  className="py-1 hover:text-gold-champagne transition-colors inline-flex items-center gap-1 group text-luxury-muted/90"
                >
                  <span>German Karatmeter (XRF)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-gold-metallic" />
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BRAND_INFO.helpline.replace(/\s+/g, "")}`}
                  className="py-1 hover:text-gold-champagne transition-colors inline-flex items-center gap-1 group text-luxury-muted/90"
                >
                  <span>Spot Bank Settlement</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-gold-metallic" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Support */}
          <div className="flex flex-col pt-0 sm:pt-1">
            <h4 className="text-xs sm:text-sm font-serif uppercase tracking-widest text-gold-champagne mb-4 sm:mb-5 font-semibold">
              Customer Support
            </h4>
            <div className="space-y-4 text-xs sm:text-sm">
              {/* Helpline */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-metallic/10 border border-gold-metallic/25 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-gold-metallic" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-gold-champagne/70 font-medium">
                    24/7 Toll-Free Helpline
                  </span>
                  <a
                    href={`tel:${BRAND_INFO.helpline.replace(/\s+/g, "")}`}
                    className="text-gold-champagne font-semibold text-sm sm:text-base hover:text-gold-bright transition-colors"
                  >
                    {BRAND_INFO.helpline}
                  </a>
                </div>
              </div>

              {/* Headquarters */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-metallic/10 border border-gold-metallic/25 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-gold-metallic" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-gold-champagne/70 font-medium">
                    Corporate Headquarters
                  </span>
                  <span className="text-luxury-ivory font-light text-xs">
                    Bengaluru, Karnataka, India
                  </span>
                </div>
              </div>

              {/* Official Website */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-metallic/10 border border-gold-metallic/25 flex items-center justify-center shrink-0 mt-0.5">
                  <Globe className="w-3.5 h-3.5 text-gold-metallic" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-gold-champagne/70 font-medium">
                    Official Website
                  </span>
                  <a
                    href={BRAND_INFO.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-luxury-muted hover:text-gold-champagne transition-colors"
                  >
                    atticagoldcompany.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Compliance & KYC */}
          <div className="flex flex-col pt-0 sm:pt-1">
            <h4 className="text-xs sm:text-sm font-serif uppercase tracking-widest text-gold-champagne mb-4 sm:mb-5 font-semibold">
              Compliance &amp; KYC
            </h4>
            <div className="space-y-3.5 text-xs text-luxury-muted/90 font-light">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-metallic/10 border border-gold-metallic/25 flex items-center justify-center shrink-0 mt-0.5">
                  <FileCheck className="w-3.5 h-3.5 text-gold-metallic" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-gold-champagne/70 font-medium">
                    Mandatory ID Proof
                  </span>
                  <p className="text-xs text-luxury-muted/80 leading-relaxed mt-0.5">
                    Valid government photo ID (Aadhaar, PAN, or Voter ID) and address proof required for all valuation transactions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-metallic/10 border border-gold-metallic/25 flex items-center justify-center shrink-0 mt-0.5">
                  <Banknote className="w-3.5 h-3.5 text-gold-metallic" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-gold-champagne/70 font-medium">
                    Transparent Settlement
                  </span>
                  <p className="text-xs text-luxury-muted/80 leading-relaxed mt-0.5">
                    Direct bank payment via IMPS / RTGS / Cheque or instant cash settlement within statutory limits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="py-5 sm:py-6 text-[11px] sm:text-xs text-luxury-muted/70 leading-relaxed text-left border-b border-gold-metallic/10">
          <p>
            <strong className="text-gold-champagne/90">Disclaimer:</strong>{" "}
            {VALUATION_DISCLAIMER} All market rate tickers and calculations shown on this preview
            use configurable indicative parameters. Pledged gold release is executed strictly subject
            to loan document verification and owner authorization.
          </p>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-luxury-muted text-center sm:text-left">
            &copy; {new Date().getFullYear()} Attica Gold Company. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 sm:gap-x-6 gap-y-2 text-xs text-luxury-muted/80">
            <a href="#" className="hover:text-gold-champagne transition-colors">
              Privacy Policy
            </a>
            <span className="text-white/20">•</span>
            <a href="#" className="hover:text-gold-champagne transition-colors">
              Terms &amp; Conditions
            </a>
            <span className="text-white/20">•</span>
            <a href="#" className="hover:text-gold-champagne transition-colors">
              Purity Standards
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
