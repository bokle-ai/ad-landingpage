"use client";

import { motion } from "framer-motion";

/* ================================================================ */
/*  CalmFlowArt                                                       */
/*  A realistic "live activity feed" — leads coming in across         */
/*  channels and being handled automatically (replied, qualified,     */
/*  booked) in seconds. Shows the product actually working.           */
/*  Fills its (relative) parent; the parent overlays the caption.     */
/* ================================================================ */

const FEED = [
  {
    channel: "WhatsApp",
    color: "#25D366",
    name: "Priya M.",
    action: "Booked a consultation",
    time: "6s",
  },
  {
    channel: "Voice",
    color: "#3B82F6",
    name: "Missed call recovered",
    action: "Called back & qualified",
    time: "28s",
  },
  {
    channel: "Web chat",
    color: "#6366F1",
    name: "Website visitor",
    action: "Routed to your team",
    time: "9s",
  },
];

export default function CalmFlowArt() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(160deg, #0a160d 0%, #060d07 100%)",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "30px 24px 0",
      }}
    >
      <div style={{ width: "100%", maxWidth: 980, display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            style={{ width: 7, height: 7, borderRadius: "50%", background: "#00C60F", display: "block" }}
          />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,198,15,0.85)" }}>
            Handled automatically · live
          </span>
        </div>

        {/* Activity cards */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {FEED.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.14 }}
              style={{
                flex: "1 1 240px",
                minWidth: 220,
                display: "flex",
                alignItems: "center",
                gap: 11,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "12px 14px",
              }}
            >
              {/* Checkmark */}
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(0,198,15,0.14)", border: "1px solid rgba(0,198,15,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M1 5l4 4 8-8" stroke="#00C60F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: f.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{f.channel}</span>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginLeft: "auto" }}>{f.time}</span>
                </div>
                <p style={{ margin: "3px 0 0", fontSize: 13, fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>{f.name}</p>
                <p style={{ margin: "1px 0 0", fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.3 }}>{f.action}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
