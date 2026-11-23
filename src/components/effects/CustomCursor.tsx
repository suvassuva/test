"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface GoldSparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
  twinkleSpeed: number;
  angle: number;
  spin: number;
  isStar: boolean;
}

const GOLD_PALETTE = [
  "#FFF4D0", // Diamond white gold
  "#FFE082", // Brilliant 24K champagne
  "#F5D061", // Pure gold
  "#D4AF37", // Metallic imperial gold
  "#E5B83B", // Warm bullion gold
  "#C69214", // Deep antique gold
];

export const CustomCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const prevMousePos = useRef({ x: -100, y: -100 });
  const isMoving = useRef(false);
  const moveTimer = useRef<NodeJS.Timeout | null>(null);

  // Smooth springs for primary pointer dot and trailing ring
  const cursorX = useSpring(-100, { damping: 28, stiffness: 450 });
  const cursorY = useSpring(-100, { damping: 28, stiffness: 450 });
  const trailX = useSpring(-100, { damping: 20, stiffness: 220 });
  const trailY = useSpring(-100, { damping: 20, stiffness: 220 });

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
    const maxParticles = 120;

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Particle spawning helper
    const spawnParticle = (
      x: number,
      y: number,
      spread = 1,
      extraForce = 0,
      forceStar = false
    ) => {
      if (particles.length >= maxParticles) {
        particles.shift();
      }

      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 1.6 + 0.4 + extraForce) * spread;
      const color =
        GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)];
      const isStar = forceStar || Math.random() < 0.22;

      particles.push({
        x: x + (Math.random() - 0.5) * 8 * spread,
        y: y + (Math.random() - 0.5) * 8 * spread,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (0.35 + Math.random() * 0.4), // Gentle upward float
        size: isStar ? Math.random() * 2.8 + 2.2 : Math.random() * 2.2 + 0.8,
        alpha: Math.random() * 0.35 + 0.65,
        decay: Math.random() * 0.022 + 0.014,
        color,
        twinkleSpeed: Math.random() * 0.15 + 0.05,
        angle: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.12,
        isStar,
      });
    };

    // Draw luxury 4-point gold sparkle star
    const drawSparkleStar = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      angle: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(angle);
      c.beginPath();

      const spikes = 4;
      const outerRadius = size;
      const innerRadius = size * 0.28;

      let rot = (Math.PI / 2) * 3;
      const step = Math.PI / spikes;

      c.moveTo(0, -outerRadius);
      for (let i = 0; i < spikes; i++) {
        c.lineTo(Math.cos(rot) * outerRadius, Math.sin(rot) * outerRadius);
        rot += step;
        c.lineTo(Math.cos(rot) * innerRadius, Math.sin(rot) * innerRadius);
        rot += step;
      }
      c.lineTo(0, -outerRadius);
      c.closePath();
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

      // Interpolate trail between previous and current pos for smooth continuous gold dust
      if (prevMousePos.current.x > 0) {
        const dx = x - prevMousePos.current.x;
        const dy = y - prevMousePos.current.y;
        const dist = Math.hypot(dx, dy);

        // Spawn particles along the path based on mouse movement speed
        const count = Math.min(Math.floor(dist / 9) + 1, 4);
        for (let i = 0; i < count; i++) {
          const ratio = i / count;
          const px = prevMousePos.current.x + dx * ratio;
          const py = prevMousePos.current.y + dy * ratio;
          spawnParticle(px, py, 1);
        }
      }

      prevMousePos.current = { x, y };

      isMoving.current = true;
      if (moveTimer.current) clearTimeout(moveTimer.current);
      moveTimer.current = setTimeout(() => {
        isMoving.current = false;
      }, 120);
    };

    // Burst gold particles on click
    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const { clientX: x, clientY: y } = e;
      for (let i = 0; i < 18; i++) {
        spawnParticle(x, y, 1.8, Math.random() * 2 + 1, i % 2 === 0);
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
    let lastTime = performance.now();
    const render = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // While hovering on interactive elements or stationary, emit gentle ambient gold embers
      if (
        isHovered &&
        mousePos.current.x > 0 &&
        Math.random() < 0.35
      ) {
        spawnParticle(mousePos.current.x, mousePos.current.y, 1.2, 0.4);
      }

      // Update & render particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;
        p.alpha -= p.decay;

        // Twinkle factor
        const twinkle = Math.sin(time * p.twinkleSpeed) * 0.25;
        const currentAlpha = Math.max(0, Math.min(1, p.alpha + twinkle));

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.isStar ? 10 : 6;

        if (p.isStar) {
          drawSparkleStar(ctx, p.x, p.y, p.size, p.angle);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animId);
      if (moveTimer.current) clearTimeout(moveTimer.current);
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

      {/* Ambient Liquid Gold Glow Spotlight under Mouse */}
      <motion.div
        className="fixed top-0 left-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          x: trailX,
          y: trailY,
          background:
            "radial-gradient(circle, rgba(245, 208, 97, 0.12) 0%, rgba(212, 175, 55, 0.04) 40%, transparent 70%)",
        }}
        animate={{
          scale: isClicking ? 1.4 : isHovered ? 1.25 : 1,
          opacity: isHovered ? 0.95 : 0.75,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />

      {/* Primary 24K Gold Cursor Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-gold-bright via-gold-champagne to-gold-metallic -translate-x-1/2 -translate-y-1/2 shadow-[0_0_12px_rgba(255,215,0,0.9)] pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isClicking ? 0.6 : isHovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />

      {/* Trailing Luxury Polished Gold Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-gold-metallic/50 -translate-x-1/2 -translate-y-1/2 pointer-events-none backdrop-blur-[0.5px]"
        animate={{
          width: isClicking ? 20 : isHovered ? 46 : 28,
          height: isClicking ? 20 : isHovered ? 46 : 28,
          borderColor: isHovered
            ? "rgba(255, 224, 130, 0.95)"
            : "rgba(212, 175, 55, 0.45)",
          backgroundColor: isHovered
            ? "rgba(212, 175, 55, 0.12)"
            : "transparent",
          boxShadow: isHovered
            ? "0 0 16px rgba(245, 208, 97, 0.45)"
            : "0 0 8px rgba(212, 175, 55, 0.15)",
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
