"use client";

import { motion } from "framer-motion";

export default function TypingDots({
  color = "#F5F0E8",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-end gap-1 h-4 ${className}`}
      aria-label="Typing"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: color }}
          animate={{ y: [0, -3, 0], opacity: [0.35, 1, 0.35] }}
          transition={{
            duration: 1.1,
            delay: i * 0.18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}
