"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Minus, X } from "lucide-react";
import { useEffect, useState } from "react";
import TypingDots from "./TypingDots";

type Msg = { who: "lead" | "ai"; text: string; typing?: boolean };

const SCRIPT: Msg[] = [
  { who: "lead", text: "Do you offer services in Dubai?" },
  { who: "ai", typing: true, text: "" },
  {
    who: "ai",
    text:
      "Absolutely! We work with businesses across Dubai and the UAE. What type of business are you running?",
  },
  { who: "lead", text: "A real estate agency" },
  { who: "ai", typing: true, text: "" },
  {
    who: "ai",
    text:
      "Perfect. We have specific solutions for real estate. Can I grab your WhatsApp to share more details?",
  },
];

export default function PanelWebChat() {
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    const delays = [0, 700, 1800, 3000, 3900, 5000];
    const timers = delays.map((d, i) =>
      setTimeout(() => setVisible(Math.max(i + 1, 1)), d)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[380px] rounded-2xl bg-bg-primary border border-brand-accent/30 shadow-2xl shadow-brand-accent/10 overflow-hidden">
        {/* Widget header */}
        <div className="flex items-center justify-between bg-bg-alt px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-accent text-bg-primary">
              <MessageSquare className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className="text-sm text-white font-medium leading-tight">
                Bokle AI
              </p>
              <p className="text-[10px] text-brand-accent flex items-center gap-1 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                Online now
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-body">
            <Minus className="h-4 w-4" />
            <X className="h-4 w-4" />
          </div>
        </div>

        {/* Messages */}
        <div className="p-4 flex flex-col gap-2 min-h-[300px] bg-bg-primary">
          <AnimatePresence>
            {SCRIPT.slice(0, visible).map((m, i) => {
              if (m.typing) {
                return (
                  <motion.div
                    key={`t-${i}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="self-start rounded-2xl rounded-tl-sm bg-white/5 border border-white/10 px-3 py-2.5"
                  >
                    <TypingDots color="#F5F0E8" />
                  </motion.div>
                );
              }
              const isLead = m.who === "lead";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className={`max-w-[85%] rounded-2xl px-3 py-2 border ${
                    isLead
                      ? "self-end rounded-tr-sm bg-brand-accent/15 border-brand-accent/40"
                      : "self-start rounded-tl-sm bg-white/5 border-white/10"
                  }`}
                >
                  <p className="text-[13px] text-cream leading-snug">{m.text}</p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Input bar */}
        <div className="border-t border-white/5 bg-bg-alt px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-body">Type a message…</span>
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 5.5, type: "spring", damping: 14 }}
            className="inline-flex items-center gap-2 rounded-full bg-brand-accent text-bg-primary px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase"
          >
            Lead Captured ✓
          </motion.span>
        </div>
      </div>
    </div>
  );
}
