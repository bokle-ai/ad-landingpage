"use client";

import { motion } from "framer-motion";
import { Check, Inbox, AudioLines } from "lucide-react";

const STEPS = [
  {
    label: "Enquiry In",
    pct: "100%",
    fill: "#0A1500",
    border: "#15621B",
    textColor: "#F5F0E8",
    width: "100%",
    Icon: Inbox,
  },
  {
    label: "AI Qualifies",
    pct: "100%",
    fill: "#15621B",
    border: "#15621B",
    textColor: "#F5F0E8",
    width: "80%",
    Icon: AudioLines,
  },
  {
    label: "Lead Delivered",
    pct: "94%",
    fill: "#00C60F",
    border: "#00C60F",
    textColor: "#050A06",
    width: "60%",
    Icon: Check,
  },
];

export default function IllustrationFunnel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="relative w-full max-w-[320px] mx-auto"
    >
      <div className="flex flex-col gap-3">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: 0.15 + i * 0.15 }}
            className="self-start relative"
            style={{ width: s.width }}
          >
            <div
              className="relative rounded-xl border px-4 py-4 overflow-hidden flex items-center gap-3"
              style={{
                borderColor: s.border,
                background: "transparent",
              }}
            >
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 origin-left"
                style={{ background: s.fill }}
              />
              <span
                className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: s.fill === "#00C60F" ? "rgba(5,10,6,0.15)" : "rgba(0,198,15,0.15)",
                }}
              >
                <s.Icon
                  className="h-4 w-4"
                  style={{ color: s.textColor }}
                  strokeWidth={1.8}
                />
              </span>
              <span
                className="relative flex-1 text-sm md:text-base font-medium tracking-tight"
                style={{ color: s.textColor }}
              >
                {s.label}
              </span>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.15 }}
                className="relative text-sm font-bold tabular-nums"
                style={{ color: s.textColor }}
              >
                {s.pct}
              </motion.span>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 1.3 }}
        className="mt-4 text-[11px] uppercase tracking-[0.22em] text-body"
      >
        Qualification rate · live pipeline
      </motion.p>
    </motion.div>
  );
}
