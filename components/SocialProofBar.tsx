"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function SocialProofBar() {
  return (
    <motion.div
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-[60px] md:top-[64px] left-0 right-0 z-40 bg-bg-alt border-b border-white/5"
      style={{ height: 48 }}
      aria-label="Social proof"
    >
      <div className="mx-auto max-w-[1400px] h-full px-6 md:px-10 flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
        {/* Left cluster */}
        <div className="flex items-center gap-3 whitespace-nowrap">
          <span className="text-[13px] md:text-sm text-body">
            Trusted by businesses across
          </span>
          <span className="text-base md:text-lg leading-none select-none" aria-hidden>
            🇦🇪 🇺🇸 🇮🇳
          </span>
          <span className="text-[13px] md:text-sm font-bold text-white">
            UAE · USA · India
          </span>
        </div>

        {/* Center divider */}
        <span
          aria-hidden
          className="hidden md:block h-4 w-px bg-brand-accent/60 shrink-0"
        />

        {/* Right cluster */}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="flex items-center gap-0.5" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-3.5 w-3.5 text-brand-accent"
                fill="#00C60F"
                strokeWidth={0}
              />
            ))}
          </span>
          <span className="text-[13px] md:text-sm text-body">
            Rated <span className="text-white font-medium">5/5</span> on discovery calls
          </span>
        </div>
      </div>
    </motion.div>
  );
}
