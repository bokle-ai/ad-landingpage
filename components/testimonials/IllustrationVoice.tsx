"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const ROW_ONE = Array.from({ length: 28 }).map(
  (_, i) => 10 + ((i * 53) % 52)
);
const ROW_TWO = Array.from({ length: 28 }).map(
  (_, i) => 12 + ((i * 41 + 23) % 48)
);

function WaveRow({ heights, color, baseY }: { heights: number[]; color: string; baseY: number }) {
  return (
    <g>
      {heights.map((h, i) => (
        <motion.rect
          key={i}
          x={i * 9}
          y={baseY - h / 2}
          width="4"
          height={h}
          rx="2"
          fill={color}
          initial={{ scaleY: 0.3 }}
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{
            duration: 1 + (i % 5) * 0.15,
            delay: (i % 7) * 0.08,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: `${i * 9 + 2}px ${baseY}px` }}
        />
      ))}
    </g>
  );
}

export default function IllustrationVoice() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="relative w-full max-w-[320px] mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.22em] text-brand-accent px-3 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/40"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-brand-accent animate-pulse" />
        AI VOICE AGENT
      </motion.div>

      <div className="mt-4 p-5 rounded-2xl bg-bg-primary border border-white/10 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 20% 50%, rgba(0,198,15,0.15), transparent 50%)",
          }}
        />
        <svg
          viewBox="0 0 260 140"
          className="relative w-full h-auto"
          fill="none"
          aria-hidden
        >
          <WaveRow heights={ROW_ONE} color="#00C60F" baseY={45} />
          <WaveRow heights={ROW_TWO} color="#15621B" baseY={105} />
          <text
            x="0"
            y="20"
            fill="rgba(255,255,255,0.4)"
            fontSize="9"
            letterSpacing="1.5"
            fontFamily="var(--font-dm-sans)"
          >
            CALLER
          </text>
          <text
            x="0"
            y="80"
            fill="rgba(255,255,255,0.4)"
            fontSize="9"
            letterSpacing="1.5"
            fontFamily="var(--font-dm-sans)"
          >
            BOKLE AI
          </text>
        </svg>

        <div className="mt-5 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-cream">
            <Clock className="h-3.5 w-3.5 text-brand-accent" />
            <span>Lead qualified in</span>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="font-bold text-brand-accent"
            >
              94 seconds
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
