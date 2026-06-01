"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import TypingDots from "./TypingDots";

const STATS = [
  { value: "8 sec", label: "Response time" },
  { value: "Qualified", label: "Lead status" },
  { value: "Viewing booked", label: "Next action" },
];

export default function PanelWhatsApp() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 700),
      setTimeout(() => setStep(2), 1800),
      setTimeout(() => setStep(3), 3600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
      {/* Phone mockup */}
      <div className="md:col-span-3 flex justify-center">
        <div
          className="w-full max-w-[300px] rounded-[28px] overflow-hidden"
          style={{
            background: "#0b1a0c",
            border: "1px solid rgba(0,198,15,0.2)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* WhatsApp header */}
          <div
            style={{
              background: "#075E54",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "#128C7E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 13,
                color: "rgba(255,255,255,0.9)",
                flexShrink: 0,
              }}
            >
              P
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>
                Parkview Dental
              </p>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginTop: 1 }}>
                Online · AI-assisted
              </p>
            </div>
          </div>

          {/* Chat messages */}
          <div
            style={{
              padding: "16px 12px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              minHeight: 240,
            }}
          >
            {/* Lead message — always visible */}
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div
                style={{
                  maxWidth: "82%",
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: "14px 14px 14px 4px",
                  padding: "8px 11px",
                }}
              >
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.88)", lineHeight: 1.55 }}>
                  Hi, I want to book a teeth whitening appointment. Are you open this Saturday?
                </p>
                <p style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 3, textAlign: "right" }}>10:23</p>
              </div>
            </div>

            {/* Typing */}
            <AnimatePresence>
              {step === 1 && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <div
                    style={{
                      background: "#25D366",
                      borderRadius: "14px 14px 4px 14px",
                      padding: "9px 12px",
                    }}
                  >
                    <TypingDots color="#073d0a" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* AI reply */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.div
                  key="reply"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <div
                    style={{
                      maxWidth: "86%",
                      background: "#25D366",
                      borderRadius: "14px 14px 4px 14px",
                      padding: "8px 11px",
                    }}
                  >
                    <p style={{ fontSize: 12, color: "#073d0a", lineHeight: 1.55 }}>
                      Hi! Yes, we&apos;re open Saturday 10 AM – 4 PM. Dr. Lena has a slot at 11 AM or 2 PM. Which works for you? I can confirm right now.
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 3, marginTop: 3 }}>
                      <p style={{ fontSize: 9, color: "rgba(7,61,10,0.5)" }}>10:23</p>
                      <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden>
                        <path d="M1 4L3.5 6.5L8 1.5" stroke="rgba(7,61,10,0.5)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5 4L7.5 6.5L12 1.5" stroke="rgba(7,61,10,0.5)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Replied badge */}
            <AnimatePresence>
              {step >= 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      background: "rgba(0,198,15,0.12)",
                      border: "1px solid rgba(0,198,15,0.3)",
                      borderRadius: 100,
                      padding: "4px 10px",
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00C60F", display: "block" }} />
                    <span style={{ fontSize: 9, fontWeight: 700, color: "#00C60F", letterSpacing: "0.07em", textTransform: "uppercase" }}>
                      Replied in 8 seconds
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="md:col-span-2 flex flex-col gap-5">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.2 + i * 0.15 }}
            className="border-l border-brand-accent/40 pl-4"
          >
            <p className="font-bold text-brand-accent" style={{ fontSize: 18 }}>
              {s.value}
            </p>
            <p className="text-xs text-body mt-1 uppercase tracking-[0.16em]">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
