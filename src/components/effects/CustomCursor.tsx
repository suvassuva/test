"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface GoldSparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxSize: number;
  alpha: number;
  decay: number;
  color: string;
  glowColor: string;
  twinkleSpeed: number;
  twinkleOffset: number;
  angle: number;
  spin: number;
  isStar: boolean;
  wobbleSpeed: number;
  wobbleAmp: number;
  age: number;
}

const GOLD_PALETTE = [
  { core: "#FFFFFF", glow: "#FFE57F" }, // White-hot diamond gold
  { core: "#FFF8D6", glow: "#FFD54F" }, // Brilliant 24K champagne
  { core: "#FFE082", glow: "#FFC107" }, // Vivid 24K radiant gold
  { core: "#FFD54F", glow: "#FFA000" }, // Pure bullion gold
  { core: "#FFCA28", glow: "#FF8F00" }, // Rich imperial gold
  { core: "#FFB300", glow: "#E65100" }, // Warm molten amber gold
];

export const CustomCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const prevMousePos = useRef({ x: -100, y: -100 });

  // Smooth springs for primary pointer dot and trailing ring
  const cursorX = useSpring(-100, { damping: 25, stiffness: 450 });
  const cursorY = useSpring(-100, { damping: 25, stiffness: 450 });
  const trailX = useSpring(-100, { damping: 18, stiffness: 220 });
  const trailY = useSpring(-100, { damping: 18, stiffness: 220 });

  useEffect(() => {
    // Only activate for non-touch desktop devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    setIsEnabled(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: GoldSparkle[] = [];
    const maxParticles = 280;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle spawning helper with larger, visible, radiant gold dust
    const spawnParticle = (
      x: number,
      y: number,
      spread = 1,
      extraSpeed = 0,
      forceStar = false
    ) => {
      if (particles.length >= maxParticles) {
        particles.shift();
      }

      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 2.2 + 0.6 + extraSpeed) * spread;
      const palette =
        GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)];
      const isStar = forceStar || Math.random() < 0.35; // 35% are brilliant 4-point diamond stars

      // Size: 3px to 7px for orbs, 6px to 14px for sparkle stars (clearly visible!)
      const size = isStar
        ? Math.random() * 6 + 6
        : Math.random() * 3.5 + 2.5;

      particles.push({
        x: x + (Math.random() - 0.5) * 12 * spread,
        y: y + (Math.random() - 0.5) * 12 * spread,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (Math.random() * 0.8 + 0.4), // Gentle upward buoyant float
        size: size * 0.4,
        maxSize: size,
        alpha: 1.0, // Start 100% bright
        decay: Math.random() * 0.012 + 0.008, // Generous lifespan: stays visible for 1.5 - 2.5 seconds
        color: palette.core,
        glowColor: palette.glow,
        twinkleSpeed: Math.random() * 0.18 + 0.08,
        twinkleOffset: Math.random() * Math.PI * 2,
        angle: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.14,
        isStar,
        wobbleSpeed: Math.random() * 0.06 + 0.02,
        wobbleAmp: Math.random() * 0.6 + 0.2,
        age: 0,
      });
    };

    // Draw radiant 4-point gold sparkle diamond star
    const drawSparkleStar = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      angle: number,
      coreColor: string,
      glowColor: string,
      alpha: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(angle);

      // Outer radiant diamond glow
      c.shadowBlur = size * 2.5;
      c.shadowColor = glowColor;

      c.beginPath();
      const outerX = size * 1.35;
      const innerX = size * 0.25;

      c.moveTo(0, -outerX);
      c.quadraticCurveTo(0, -innerX, innerX, 0);
      c.quadraticCurveTo(0, innerX, 0, outerX);
      c.quadraticCurveTo(0, innerX, -innerX, 0);
      c.quadraticCurveTo(0, -innerX, 0, -outerX);
      c.closePath();

      c.fillStyle = glowColor;
      c.globalAlpha = alpha * 0.85;
      c.fill();

      // Sharp white-gold inner core
      c.beginPath();
      const coreOuter = size * 0.7;
      const coreInner = size * 0.18;
      c.moveTo(0, -coreOuter);
      c.lineTo(coreInner, 0);
      c.lineTo(0, coreOuter);
      c.lineTo(-coreInner, 0);
      c.closePath();

      c.fillStyle = coreColor;
      c.globalAlpha = alpha;
      c.fill();

      c.restore();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      mousePos.current = { x, y };
      cursorX.set(x);
      cursorY.set(y);
      trailX.set(x);
      trailY.set(y);

      // Interpolate smooth continuous gold dust stream
      if (prevMousePos.current.x > 0) {
        const dx = x - prevMousePos.current.x;
        const dy = y - prevMousePos.current.y;
        const dist = Math.hypot(dx, dy);

        // Spawn a rich spray of glowing particles
        const count = Math.min(Math.floor(dist / 6) + 2, 8);
        for (let i = 0; i < count; i++) {
          const ratio = i / count;
          const px = prevMousePos.current.x + dx * ratio;
          const py = prevMousePos.current.y + dy * ratio;
          spawnParticle(px, py, 1);
        }
      }

      prevMousePos.current = { x, y };
    };

    // Burst radiant gold particles on click
    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const { clientX: x, clientY: y } = e;
      for (let i = 0; i < 28; i++) {
        spawnParticle(x, y, 2.2, Math.random() * 3 + 1.5, i % 2 === 0);
      }
    };

    const handleMouseUp = () => {
      setIsClicking(false);
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
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    // 60FPS Render Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // While hovering on interactive buttons or resting, emit ambient gold embers
      if (
        isHovered &&
        mousePos.current.x > 0 &&
        Math.random() < 0.45
      ) {
        spawnParticle(mousePos.current.x, mousePos.current.y, 1.4, 0.5);
      }

      // Update & render particles with rich glow
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age++;
        p.x += p.vx + Math.sin(p.age * p.wobbleSpeed) * p.wobbleAmp;
        p.y += p.vy;
        p.vx *= 0.98; // Air friction
        p.vy *= 0.98;
        p.angle += p.spin;
        p.alpha -= p.decay;

        // Animate size pop-in
        if (p.size < p.maxSize) {
          p.size += (p.maxSize - p.size) * 0.15;
        }

        // Active sparkle twinkle calculation
        const twinkle =
          Math.sin(p.age * p.twinkleSpeed + p.twinkleOffset) * 0.35;
        const currentAlpha = Math.max(0, Math.min(1, p.alpha + twinkle));

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        if (p.isStar) {
          drawSparkleStar(
            ctx,
            p.x,
            p.y,
            p.size,
            p.angle,
            p.color,
            p.glowColor,
            currentAlpha
          );
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

          // Rich multi-layered glowing orb
          ctx.shadowBlur = p.size * 2.8;
          ctx.shadowColor = p.glowColor;
          ctx.fillStyle = p.glowColor;
          ctx.globalAlpha = currentAlpha * 0.8;
          ctx.fill();

          // Bright white-gold hot core
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.55, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = currentAlpha;
          ctx.fill();

          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, [cursorX, cursorY, trailX, trailY, isHovered]);

  if (!isEnabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* 24K Gold Stardust & Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Prominent Ambient 24K Liquid Gold Spotlight Aura */}
      <motion.div
        className="fixed top-0 left-0 w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          x: trailX,
          y: trailY,
          background:
            "radial-gradient(circle, rgba(255, 215, 0, 0.22) 0%, rgba(212, 175, 55, 0.10) 35%, rgba(212, 175, 55, 0.02) 65%, transparent 75%)",
          filter: "blur(12px)",
        }}
        animate={{
          scale: isClicking ? 1.6 : isHovered ? 1.4 : 1,
          opacity: isHovered ? 1 : 0.85,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />

      {/* Primary 24K Gold Cursor Core Diamond Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-gradient-to-r from-gold-bright via-gold-champagne to-gold-metallic -translate-x-1/2 -translate-y-1/2 shadow-[0_0_16px_rgba(255,215,0,1),0_0_8px_rgba(255,255,255,0.9)] pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isClicking ? 0.6 : isHovered ? 1.6 : 1,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />

      {/* Trailing Luxury Polished Gold Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border-2 border-gold-metallic/70 -translate-x-1/2 -translate-y-1/2 pointer-events-none backdrop-blur-[1px]"
        animate={{
          width: isClicking ? 22 : isHovered ? 52 : 32,
          height: isClicking ? 22 : isHovered ? 52 : 32,
          borderColor: isHovered
            ? "rgba(255, 224, 130, 1)"
            : "rgba(212, 175, 55, 0.65)",
          backgroundColor: isHovered
            ? "rgba(212, 175, 55, 0.18)"
            : "rgba(212, 175, 55, 0.04)",
          boxShadow: isHovered
            ? "0 0 24px rgba(245, 208, 97, 0.65)"
            : "0 0 12px rgba(212, 175, 55, 0.35)",
        }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        style={{
          x: trailX,
          y: trailY,
        }}
      />
    </div>
  );
};
