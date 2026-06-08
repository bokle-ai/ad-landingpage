"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* ================================================================ */
/*  ResponseRace                                                     */
/*  A looping mini-exchange: one lead messages two businesses.       */
/*  You stay stuck "typing…"; the competitor replies in 8s and       */
/*  books. Dramatizes the headline "while you're still typing."      */
/* ================================================================ */

const STEP_MS = 1300;
const LOOP_STEPS = 7;
/* 0 reset · 1 customer · 2 both typing · 3 competitor replied ·
   4 competitor booked · 5–6 hold (you still typing) */

function TypingDots({ color = "#8696a0" }: { color?: string }) {
  return (
    <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          style={{ width: 5, height: 5, borderRadius: "50%", background: color, display: "block" }}
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </span>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.08em",
  color: "rgba(255,255,255,0.4)",
  marginBottom: 6,
};

export default function ResponseRace() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s + 1) % LOOP_STEPS);
    }, STEP_MS);
    return () => clearInterval(id);
  }, []);

  const showCustomer = step >= 1;
  const showLanes = step >= 2;
  const compReplied = step >= 3;
  const compBooked = step >= 4;
  const youLost = step >= 5;

  return (
    <div style={{ width: "100%", maxWidth: 380 }}>
      <p className="mb-6 font-medium uppercase" style={{ fontSize: 11, letterSpacing: "0.18em", color: "rgba(255,255,255,0.4)" }}>
        One lead · two businesses
      </p>

      {/* Customer message */}
      <div style={{ minHeight: 50 }}>
        {showCustomer && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.07)",
              borderRadius: "4px 14px 14px 14px",
              padding: "9px 13px",
              fontSize: 14,
              color: "rgba(255,255,255,0.88)",
            }}
          >
            Hi, are you open tomorrow? Need an appointment.
          </motion.div>
        )}
      </div>

      {/* Two lanes */}
      <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 16, minHeight: 156 }}>
        {/* YOU — stuck typing */}
        {showLanes && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <p style={labelStyle}>YOU</p>
            {!youLost ? (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: "10px 13px",
                }}
              >
                <TypingDots />
                <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.45)" }}>still typing…</span>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(248,113,113,0.08)",
                  border: "1px solid rgba(248,113,113,0.35)",
                  borderRadius: 12,
                  padding: "10px 13px",
                }}
              >
                <span style={{ color: "#f87171", fontSize: 14, lineHeight: 1 }}>✕</span>
                <span style={{ fontSize: 12.5, color: "#f87171", fontWeight: 600 }}>Lead lost</span>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* COMPETITOR — replies and books */}
        {showLanes && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.08 }}>
            <p style={labelStyle}>A COMPETITOR</p>

            {!compReplied ? (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "rgba(0,198,15,0.08)",
                  border: "1px solid rgba(0,198,15,0.25)",
                  borderRadius: 12,
                  padding: "10px 13px",
                }}
              >
                <TypingDots color="#00C60F" />
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 7, alignItems: "flex-start" }}>
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(0,198,15,0.10)",
                    border: "1px solid rgba(0,198,15,0.3)",
                    borderRadius: 12,
                    padding: "9px 13px",
                  }}
                >
                  <Check />
                  <span style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>Replied in 8 seconds</span>
                </motion.div>

                {compBooked && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: "#00C60F",
                      borderRadius: 12,
                      padding: "9px 13px",
                    }}
                  >
                    <span style={{ fontSize: 13, color: "#062b0a", fontWeight: 700 }}>Appointment booked ✓</span>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function Check() {
  return (
    <span style={{ width: 16, height: 16, borderRadius: "50%", background: "#00C60F", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
        <path d="M1 3.5L3.2 5.5L8 1" stroke="#062b0a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
