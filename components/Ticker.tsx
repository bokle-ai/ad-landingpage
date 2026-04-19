"use client";

import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export default function Ticker({
  items,
  direction = "left",
  duration = 30,
  className = "",
}: {
  items: string[];
  direction?: "left" | "right";
  duration?: number;
  className?: string;
}) {
  const doubled = [...items, ...items];
  const [paused, setPaused] = useState(false);

  // Manual ticker so we can pause on hover without restarting the animation
  const base = useMotionValue(direction === "left" ? 0 : -50);
  const x = useTransform(base, (v) => `${v}%`);
  const lastTime = useRef<number | null>(null);

  useAnimationFrame((t) => {
    if (paused) {
      lastTime.current = t;
      return;
    }
    const dt = lastTime.current == null ? 0 : t - lastTime.current;
    lastTime.current = t;
    // % moved per ms so full 0 → -50% span completes in `duration` seconds
    const delta = (50 / (duration * 1000)) * dt;
    let next = base.get() + (direction === "left" ? -delta : delta);
    if (direction === "left" && next <= -50) next += 50;
    if (direction === "right" && next >= 0) next -= 50;
    base.set(next);
  });

  return (
    <div
      className={`relative w-full overflow-hidden border-y border-white/10 py-6 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="flex whitespace-nowrap will-change-transform"
        style={{ x }}
      >
        {doubled.map((it, i) => (
          <span
            key={i}
            className="flex items-center text-white text-lg md:text-xl tracking-tight pr-10"
          >
            <span>{it}</span>
            <span className="mx-6 text-brand-accent">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
