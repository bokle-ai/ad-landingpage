"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const GLYPHS = ["+", "×", "✦"];

export default function SparkleGlyphs({ count = 22 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const rand = (n: number) => ((seed * (n + 1)) % 233280) / 233280;
        return {
          top: `${Math.floor(rand(1) * 95)}%`,
          left: `${Math.floor(rand(2) * 95)}%`,
          size: 12 + Math.floor(rand(3) * 18),
          glyph: GLYPHS[i % GLYPHS.length],
          duration: 4 + rand(4) * 6,
          delay: rand(5) * 4,
        };
      }),
    [count]
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {items.map((it, i) => (
        <motion.span
          key={i}
          className="absolute text-cream select-none"
          style={{
            top: it.top,
            left: it.left,
            fontSize: it.size,
            opacity: 0.08,
          }}
          animate={{ opacity: [0.04, 0.22, 0.04] }}
          transition={{
            duration: it.duration,
            delay: it.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {it.glyph}
        </motion.span>
      ))}
    </div>
  );
}
