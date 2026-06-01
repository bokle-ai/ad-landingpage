"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, X } from "lucide-react";
import { useEffect, useState } from "react";
import TypingDots from "./TypingDots";

type Msg = { who: "lead" | "ai"; text: string; typing?: boolean };

const SCRIPT: Msg[] = [
  { who: "ai", text: "Hi! Looking into AI automation for your business?" },
  { who: "lead", text: "Yes — we're a real estate agency in Dubai. Leads contact us through the site but no one replies fast enough." },
  { who: "ai", typing: true, text: "" },
  {
    who: "ai",
    text: "That's a common gap. We build website chat agents that respond in seconds and qualify buyers vs. investors automatically. What's your main challenge — response speed or follow-up?",
  },
  { who: "lead", text: "Both, honestly." },
  { who: "ai", typing: true, text: "" },
  {
    who: "ai",
    text: "Got it. We can cover both channels — web + WhatsApp — under one setup. Want me to arrange a quick demo call?",
  },
];

export default function PanelWebChat() {
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    const delays = [0, 600, 1600, 2500, 3800, 4700, 5900];
    const timers = delays.map((d, i) =>
      setTimeout(() => setVisible(Math.max(i + 1, 1)), d)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex justify-center">
      <div
        className="w-full max-w-[400px] rounded-2xl overflow-hidden"
        style={{
          background: "#0a140b",
          border: "1px solid rgba(0,198,15,0.22)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Widget header */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            background: "#0d1e0e",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center gap-2.5">
            {/* Avatar — letter initial */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#15621B",
                border: "1.5px solid rgba(0,198,15,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.88)" }}>B</span>
            </div>
            <div>
              <p className="text-sm text-white font-medium leading-tight">
                Bokle AI
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="h-1.5 w-1.5 rounded-full bg-brand-accent"
                />
                <span className="text-[10px] text-brand-accent">Online now</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-body">
            <Minus className="h-4 w-4" />
            <X className="h-4 w-4" />
          </div>
        </div>

        {/* Messages */}
        <div
          className="flex flex-col gap-2.5 p-4"
          style={{ minHeight: 280, background: "#0a140b" }}
        >
          <AnimatePresence>
            {SCRIPT.slice(0, visible).map((m, i) => {
              if (m.typing) {
                return (
                  <motion.div
                    key={`typing-${i}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="self-start"
                  >
                    <div
                      className="flex items-center gap-2"
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: "#15621B",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>B</span>
                      </div>
                      <div
                        className="rounded-2xl rounded-tl-sm px-3 py-2.5"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.09)",
                        }}
                      >
                        <TypingDots color="rgba(255,255,255,0.45)" />
                      </div>
                    </div>
                  </motion.div>
                );
              }

              const isLead = m.who === "lead";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32 }}
                  className={`flex gap-2 items-end ${isLead ? "flex-row-reverse self-end" : "self-start"} max-w-[88%]`}
                >
                  {!isLead && (
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "#15621B",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>B</span>
                    </div>
                  )}
                  <div
                    className="rounded-2xl px-3 py-2"
                    style={
                      isLead
                        ? {
                            background: "rgba(0,198,15,0.12)",
                            border: "1px solid rgba(0,198,15,0.3)",
                            borderBottomRightRadius: 4,
                          }
                        : {
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.09)",
                            borderBottomLeftRadius: 4,
                          }
                    }
                  >
                    <p className="text-[13px] leading-snug" style={{ color: "rgba(255,255,255,0.85)" }}>
                      {m.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Input bar */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            background: "#0d1e0e",
          }}
        >
          <span className="text-xs text-body">Type a message…</span>
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 6.5, type: "spring", damping: 14 }}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase"
            style={{
              background: "rgba(0,198,15,0.15)",
              border: "1px solid rgba(0,198,15,0.35)",
              color: "#00C60F",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Lead Captured
          </motion.span>
        </div>
      </div>
    </div>
  );
}
