"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useSpring(0, { damping: 25, stiffness: 350 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 350 });
  const trailX = useSpring(0, { damping: 18, stiffness: 180 });
  const trailY = useSpring(0, { damping: 18, stiffness: 180 });

  useEffect(() => {
    // Only enable for desktop mice
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    setIsEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "button, a, input, select, textarea, [role='button'], .interactive"
      );
      setIsHovered(!!interactive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, trailX, trailY]);

  if (!isEnabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Primary Tiny Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gold-champagne -translate-x-1/2 -translate-y-1/2 shadow-gold-glow pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />

      {/* Trailing Luxury Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-gold-metallic/50 -translate-x-1/2 -translate-y-1/2 pointer-events-none backdrop-blur-[0.5px]"
        animate={{
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          borderColor: isHovered
            ? "rgba(245, 208, 97, 0.9)"
            : "rgba(212, 175, 55, 0.35)",
          backgroundColor: isHovered
            ? "rgba(212, 175, 55, 0.08)"
            : "transparent",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          x: trailX,
          y: trailY,
        }}
      />
    </div>
  );
};

