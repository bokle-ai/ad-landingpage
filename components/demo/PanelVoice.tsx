"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PhoneOff, PhoneCall, Clock } from "lucide-react";
import { useEffect, useState } from "react";

const TRANSCRIPT = [
  { who: "AI", text: "Hi, this is Bokle AI calling back..." },
  { who: "Lead", text: "Oh hi, yes I called about..." },
  { who: "AI", text: "Perfect, let me get your details..." },
];

function WaveformLive() {
  const bars = Array.from({ length: 36 });
  return (
    <div className="flex items-center justify-center gap-[3px] h-14">
      {bars.map((_, i) => (
        <motion.span
          key={i}
          className="inline-block w-[3px] rounded-full bg-brand-accent"
          animate={{
            scaleY: [0.25, 1, 0.4, 0.8, 0.3],
          }}
          transition={{
            duration: 1.2 + (i % 5) * 0.15,
            delay: (i % 7) * 0.05,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            height: `${30 + ((i * 37) % 70)}%`,
            transformOrigin: "center",
            opacity: 0.4 + ((i * 13) % 6) * 0.1,
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
      setTimeout(() => setVisible(i + 1), 900 + i * 1100)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 max-w-xl mx-auto">
      {/* Missed call banner */}
      <div className="w-full flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500/15 border border-red-400/40 text-red-400">
          <PhoneOff className="h-4 w-4" />
        </span>
        <div className="flex-1">
          <p className="text-sm text-white font-medium leading-tight">
            Missed call from +971 50 XXX
          </p>
          <p className="text-[11px] text-body mt-0.5">Inbound · 02:07 AM</p>
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-red-400">
          Missed
        </span>
      </div>

      {/* Callback */}
      <div className="w-full flex items-center gap-3 rounded-xl bg-brand-accent/10 border border-brand-accent/40 px-4 py-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-accent/20 border border-brand-accent/50 text-brand-accent">
          <PhoneCall className="h-4 w-4" />
        </span>
        <div className="flex-1">
          <p className="text-sm text-white font-medium leading-tight">
            Bokle AI called back in{" "}
            <span className="text-brand-accent">12 seconds</span>
          </p>
          <p className="text-[11px] text-body mt-0.5 flex items-center gap-1">
            <Clock className="h-3 w-3" /> 02:07 AM · in progress
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-brand-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-accent animate-pulse" />
          Live
        </span>
      </div>

      {/* Waveform */}
      <div className="w-full rounded-2xl bg-bg-primary border border-white/10 p-5">
        <div className="text-[10px] uppercase tracking-[0.22em] text-body mb-2">
          AI Voice Conversation
        </div>
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
              transition={{ duration: 0.4 }}
              className={`flex gap-3 items-start ${
                line.who === "AI" ? "" : "flex-row-reverse text-right"
              }`}
            >
              <span
                className={`text-[10px] uppercase tracking-[0.22em] mt-1 w-10 shrink-0 ${
                  line.who === "AI" ? "text-brand-accent" : "text-body"
                }`}
              >
                {line.who}
              </span>
              <p className="text-sm text-cream leading-relaxed flex-1">
                {line.text}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Result badge */}
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 2.6, type: "spring", damping: 14 }}
        className="inline-flex items-center gap-2 rounded-full bg-brand-accent text-bg-primary px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase"
      >
        Lead Qualified ✓
      </motion.span>
    </div>
  );
}
