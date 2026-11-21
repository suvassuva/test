"use client";

import React, { useEffect, useState } from "react";

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const currentScroll = window.scrollY;
      setProgress((currentScroll / totalScroll) * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 bg-black/40 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-gold-metallic via-gold-champagne to-gold-bright transition-all duration-75 ease-out shadow-gold-glow"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

