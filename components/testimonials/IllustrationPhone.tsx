"use client";

import { motion } from "framer-motion";

export default function IllustrationPhone() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="relative w-full max-w-[280px] mx-auto"
    >
      <svg
        viewBox="0 0 260 420"
        className="w-full h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {/* Phone frame */}
        <rect
          x="10"
          y="10"
          width="240"
          height="400"
          rx="34"
          fill="#050A06"
          stroke="#15621B"
          strokeWidth="2"
        />
        <rect
          x="22"
          y="22"
          width="216"
          height="376"
          rx="24"
          fill="#0A1500"
        />
        {/* Notch */}
        <rect
          x="100"
          y="30"
          width="60"
          height="10"
          rx="5"
          fill="#050A06"
        />

        {/* Status bar text */}
        <text
          x="36"
          y="64"
          fill="rgba(255,255,255,0.4)"
          fontSize="9"
          fontFamily="var(--font-dm-sans)"
          letterSpacing="1.5"
        >
          WHATSAPP BUSINESS
        </text>

        {/* Top bubble (incoming — dark) */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <rect
            x="36"
            y="90"
            width="170"
            height="72"
            rx="14"
            fill="#050A06"
            stroke="rgba(255,255,255,0.08)"
          />
          <text
            x="48"
            y="112"
            fill="#F5F0E8"
            fontSize="10"
            fontFamily="var(--font-dm-sans)"
          >
            You just received a new
          </text>
          <text
            x="48"
            y="128"
            fill="#F5F0E8"
            fontSize="10"
            fontFamily="var(--font-dm-sans)"
          >
            enquiry at 2:14 AM
          </text>
          <text
            x="48"
            y="150"
            fill="rgba(255,255,255,0.4)"
            fontSize="8"
            fontFamily="var(--font-dm-sans)"
          >
            02:14
          </text>
          {/* Pulsing green dot */}
          <motion.circle
            cx="194"
            cy="106"
            r="4"
            fill="#00C60F"
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.25, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>

        {/* Bottom bubble (outgoing — light, green accent) */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.75 }}
        >
          <rect
            x="54"
            y="186"
            width="170"
            height="72"
            rx="14"
            fill="#00C60F"
            fillOpacity="0.12"
            stroke="#00C60F"
            strokeOpacity="0.5"
          />
          <text
            x="66"
            y="208"
            fill="#F5F0E8"
            fontSize="10"
            fontFamily="var(--font-dm-sans)"
          >
            Bokle AI replied instantly
          </text>
          <text
            x="66"
            y="228"
            fill="#00C60F"
            fontSize="10"
            fontFamily="var(--font-dm-sans)"
            fontWeight="600"
          >
            ✓✓ delivered &amp; read
          </text>
          <text
            x="66"
            y="248"
            fill="rgba(255,255,255,0.4)"
            fontSize="8"
            fontFamily="var(--font-dm-sans)"
          >
            02:14 · 3s
          </text>
        </motion.g>

        {/* Typing indicator (third bubble) */}
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 1.2 }}
        >
          <rect
            x="36"
            y="280"
            width="70"
            height="28"
            rx="14"
            fill="#050A06"
            stroke="rgba(255,255,255,0.08)"
          />
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={54 + i * 10}
              cy={294}
              r="3"
              fill="#F5F0E8"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.2,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.g>
      </svg>

      {/* LIVE badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="absolute top-4 right-2 md:-right-2 bg-brand-accent text-bg-primary text-[10px] font-bold tracking-[0.2em] px-2.5 py-1 rounded-full flex items-center gap-1.5"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-bg-primary animate-pulse" />
        LIVE
      </motion.div>
    </motion.div>
  );
}
