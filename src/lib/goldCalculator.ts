import { GoldPurity, ValuationResult } from "@/types";
import { DEMO_GOLD_RATES } from "./constants";

/**
 * Format numeric value to Indian numbering system (e.g., ₹1,25,000)
 */
export function formatIndianRupees(amount: number): string {
  const rounded = Math.round(amount);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rounded);
}

/**
 * Calculate estimated valuation based on weight, purity, and pledge status
 */
export function calculateGoldValue(
  weightInGrams: number,
  purity: GoldPurity,
  isPledged: boolean = false
): ValuationResult {
  const config = DEMO_GOLD_RATES[purity] || DEMO_GOLD_RATES["22K"];
  const ratePerGram = config.ratePerGram;
  
  // Formula: Weight × Applicable Gold Rate
  const rawEstimate = Math.max(0, weightInGrams) * ratePerGram;
  
  return {
    weight: weightInGrams,
    purity,
    ratePerGram,
    rawEstimate,
    formattedEstimate: formatIndianRupees(rawEstimate),
    isPledged,
  };
}

