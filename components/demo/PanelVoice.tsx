"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PhoneOff, PhoneIncoming, Clock } from "lucide-react";
import { useEffect, useState } from "react";

/* Pre-computed bars — avoids Math.random() hydration mismatch */
const BARS = [
  0.28, 0.72, 0.45, 0.9, 0.35, 0.6, 0.82, 0.42, 0.95, 0.55,
  0.3, 0.78, 0.5, 0.88, 0.4, 0.65, 0.76, 0.33, 0.92, 0.48,
  0.62, 0.37, 0.85, 0.53, 0.7, 0.41, 0.94, 0.58, 0.27, 0.8,
  0.47, 0.69, 0.36, 0.91, 0.52, 0.74,
];

const DURATIONS = [
  1.2, 1.05, 1.35, 0.95, 1.5, 1.1, 0.85, 1.25, 1.45, 1.0,
  1.3, 0.9, 1.15, 1.4, 1.05, 1.2, 0.8, 1.35, 0.95, 1.5,
  1.1, 1.25, 0.85, 1.4, 1.0, 1.2, 0.9, 1.45, 1.15, 1.05,
  1.3, 0.95, 1.2, 0.85, 1.4, 1.1,
];

const TRANSCRIPT = [
  {
    who: "AI",
    text: "Hi, calling back about your missed enquiry to Al Barsha Aesthetics. Is now okay?",
  },
  {
    who: "Lead",
    text: "Yes — I wanted to ask about the Botox pricing and availability.",
  },
  {
    who: "AI",
    text: "Of course. Treatments start from AED 899. Dr. Sara has Thursday 3 PM available — shall I book that for you?",
  },
];

function WaveformLive() {
  return (
    <div className="flex items-center justify-center gap-[3px] h-12">
      {BARS.map((relHeight, i) => (
        <motion.span
          key={i}
          className="inline-block w-[3px] rounded-full bg-brand-accent"
          style={{
            height: `${20 + relHeight * 50}%`,
            transformOrigin: "center",
            opacity: 0.45 + relHeight * 0.45,
          }}
          animate={{ scaleY: [0.3, 1, 0.5, 0.85, 0.3] }}
          transition={{
            duration: DURATIONS[i],
            delay: (i % 7) * 0.06,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function PanelVoice() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = TRANSCRIPT.map((_, i) =>
      setTimeout(() => setVisible(i + 1), 800 + i * 1200)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 max-w-xl mx-auto">
      {/* Missed call */}
      <div
        className="w-full flex items-center gap-3 rounded-xl px-4 py-3"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.09)",
        }}
      >
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full flex-shrink-0"
          style={{
            background: "rgba(220,38,38,0.12)",
            border: "1px solid rgba(220,38,38,0.3)",
          }}
        >
          <PhoneOff className="h-4 w-4 text-red-400" />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white font-medium leading-tight">
            Missed call · +971 50 XXX XXXX
          </p>
          <p className="text-[11px] text-body mt-0.5">Inbound · 02:07 AM</p>
        </div>
        <span className="text-[10px] uppercase tracking-[0.18em] text-red-400 flex-shrink-0">
          Missed
        </span>
      </div>

      {/* AI callback */}
      <div
        className="w-full flex items-center gap-3 rounded-xl px-4 py-3"
        style={{
          background: "rgba(0,198,15,0.07)",
          border: "1px solid rgba(0,198,15,0.3)",
        }}
      >
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full flex-shrink-0"
          style={{
            background: "rgba(0,198,15,0.15)",
            border: "1px solid rgba(0,198,15,0.4)",
          }}
        >
          <PhoneIncoming className="h-4 w-4 text-brand-accent" />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white font-medium leading-tight">
            Bokle called back in{" "}
            <span className="text-brand-accent font-semibold">12 seconds</span>
          </p>
          <p className="text-[11px] text-body mt-0.5 flex items-center gap-1">
            <Clock className="h-3 w-3" /> 02:07 AM · in progress
          </p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-brand-accent"
          />
          <span className="text-[10px] uppercase tracking-[0.18em] text-brand-accent">
            Live
          </span>
        </div>
      </div>

      {/* Waveform */}
      <div
        className="w-full rounded-2xl p-4"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <p className="text-[9px] uppercase tracking-[0.22em] text-body mb-3">
          Live Conversation
        </p>
        <WaveformLive />
      </div>

      {/* Transcript */}
      <div className="w-full flex flex-col gap-3">
        <AnimatePresence>
          {TRANSCRIPT.slice(0, visible).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38 }}
              className={`flex gap-3 items-start ${
                line.who === "Lead" ? "flex-row-reverse" : ""
              }`}
            >
              <span
                className="text-[9px] uppercase tracking-[0.2em] mt-1 w-8 shrink-0 font-semibold"
                style={{
                  color: line.who === "AI" ? "#00C60F" : "rgba(255,255,255,0.35)",
                  textAlign: line.who === "Lead" ? "right" : "left",
                }}
              >
                {line.who}
              </span>
              <p
                className="text-sm leading-relaxed flex-1"
                style={{
                  color: "rgba(255,255,255,0.75)",
                  textAlign: line.who === "Lead" ? "right" : "left",
                }}
              >
                {line.text}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Result */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 3.8, type: "spring", damping: 14 }}
        className="inline-flex items-center gap-2 rounded-full px-5 py-2"
        style={{
          background: "rgba(0,198,15,0.15)",
          border: "1px solid rgba(0,198,15,0.4)",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00C60F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-brand-accent">
          Lead Qualified
        </span>
      </motion.div>
    </div>
  );
}
