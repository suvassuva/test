import { GoldPurity, GoldRateConfig } from "@/types";

/**
 * Configurable demo gold rates for initial frontend showcase.
 * In production, these can be wired to a verified live market bullion API.
 * Configured with clear disclaimer as per architectural guidelines.
 */
export const DEMO_GOLD_RATES: Record<GoldPurity, GoldRateConfig> = {
  "24K": {
    purity: "24K",
    purityPercentage: 99.9,
    ratePerGram: 7650, // Demo configurable base rate (₹/g)
    purityFactor: 1.0,
    label: "24 Karat (99.9% Pure Gold)",
  },
  "22K": {
    purity: "22K",
    purityPercentage: 91.6,
    ratePerGram: 7010, // Demo configurable base rate (₹/g)
    purityFactor: 0.916,
    label: "22 Karat (91.6% Hallmark Gold)",
  },
  "18K": {
    purity: "18K",
    purityPercentage: 75.0,
    ratePerGram: 5740, // Demo configurable base rate (₹/g)
    purityFactor: 0.75,
    label: "18 Karat (75.0% Diamond/Fashion Gold)",
  },
};

export const BRAND_INFO = {
  name: "Attica Gold Company",
  tagline: "India's Most Trusted Organized Gold Buyers",
  helpline: "8880 300 300",
  officialUrl: "https://atticagoldcompany.com",
  certifications: [
    { label: "RBI-Approved Guidelines", icon: "Landmark" },
    { label: "BIS-Standard Testing", icon: "ShieldCheck" },
    { label: "ISO 9001:2015 Certified", icon: "Award" },
    { label: "12+ Years of Trust", icon: "Sparkles" },
  ],
  stats: [
    { value: 200, suffix: "+", label: "Branches Across South India" },
    { value: 1.5, suffix: " Cr+", label: "Customers Served", isDecimal: true },
    { value: 15, suffix: " Mins", label: "Average Transaction Time" },
    { value: 100, suffix: "%", label: "Transparent Valuation" },
  ],
};

export const VALUATION_DISCLAIMER =
  "Indicative estimate only. Final valuation depends on non-destructive German XRF purity testing, certified digital scale weight, applicable market deductions, and prevailing rates at transaction time.";

