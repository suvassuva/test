"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export const Preloader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 10;
      });
    }, 70);

    return () => clearInterval(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-maroon-darkest transition-opacity duration-700 ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center max-w-xs text-center px-6">
        {/* Official Attica Gold Logo */}
        <div className="mb-6 py-2">
          <Image
            src="/media/brand/attica-logo-official.png"
            alt="Attica Gold Company"
            width={624}
            height={198}
            className="h-14 sm:h-16 w-auto object-contain drop-shadow-[0_4px_20px_rgba(212,175,55,0.4)] brightness-110"
            priority
          />
        </div>

        <div className="w-52 h-[2px] bg-maroon-velvet rounded-full overflow-hidden relative mb-4">
          <div
            className="h-full bg-gradient-to-r from-gold-metallic via-gold-champagne to-gold-bright transition-all duration-150 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <span className="text-[10px] uppercase tracking-[0.3em] text-gold-champagne/80 font-serif">
          Experience Pure Transparency • {Math.min(progress, 100)}%
        </span>
      </div>
    </div>
  );
};
