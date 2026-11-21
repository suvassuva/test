"use client";

import React from "react";
import { DEMO_GOLD_RATES } from "@/lib/constants";
import { formatIndianRupees } from "@/lib/goldCalculator";
import { TrendingUp, AlertCircle } from "lucide-react";

export const GoldRateTicker: React.FC<{ compact?: boolean }> = ({
  compact = false,
}) => {
  const rate22k = DEMO_GOLD_RATES["22K"].ratePerGram;
  const rate24k = DEMO_GOLD_RATES["24K"].ratePerGram;

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-xs font-medium text-gold-champagne bg-maroon-darkest/80 px-3 py-1.5 rounded-full border border-gold-metallic/30">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>22K: {formatIndianRupees(rate22k)}/g</span>
        <span className="text-gold-metallic/40">|</span>
        <span>24K: {formatIndianRupees(rate24k)}/g</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-maroon-velvet/50 border border-gold-metallic/25 shadow-inner backdrop-blur-md">
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-luxury-muted">
          Indicative Market Rates
        </span>
      </div>

      <div className="h-3 w-[1px] bg-gold-metallic/30" />

      <div className="flex items-center gap-4 text-xs tracking-wider">
        <span className="text-luxury-ivory font-medium">
          <strong className="text-gold-champagne">22K:</strong> {formatIndianRupees(rate22k)}
          <span className="text-[10px] text-luxury-muted">/g</span>
        </span>

        <span className="text-luxury-ivory font-medium">
          <strong className="text-gold-champagne">24K:</strong> {formatIndianRupees(rate24k)}
          <span className="text-[10px] text-luxury-muted">/g</span>
        </span>
      </div>

      <TrendingUp className="w-3.5 h-3.5 text-emerald-400 hidden sm:inline-block" />
    </div>
  );
};

