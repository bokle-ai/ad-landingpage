"use client";

import { motion } from "framer-motion";

/* ================================================================ */
/*  MissedLeadsArt                                                    */
/*  A realistic phone LOCK SCREEN at 2:47am — real missed-call and    */
/*  WhatsApp notifications piling up, unanswered, after hours.        */
/*  Makes the "leads go cold overnight" pain concrete and visceral.   */
/*  Fills its (relative, fixed-height) parent.                        */
/* ================================================================ */

const NOTIFS = [
  {
    app: "Phone",
    color: "#34C759",
    title: "Missed Call (2)",
    body: "+44 7700 •••821 · New enquiry",
    time: "now",
    icon: (
      <path d="M6.5 10.5a12 12 0 0 0 5 5l1.7-1.7a1 1 0 0 1 1-.25 9 9 0 0 0 2.8.45 1 1 0 0 1 1 1V18a1 1 0 0 1-1 1A14 14 0 0 1 4 5a1 1 0 0 1 1-1h2.8a1 1 0 0 1 1 1 9 9 0 0 0 .45 2.8 1 1 0 0 1-.25 1Z" fill="#fff" />
    ),
  },
  {
    app: "WhatsApp",
    color: "#25D366",
    title: "Sarah K.",
    body: "Hi, are you open tomorrow? Need an appt asap",
    time: "2m ago",
    icon: (
      <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Zm0 2a7 7 0 1 1-3.6 13l-.3-.2-2.4.6.6-2.3-.2-.3A7 7 0 0 1 12 5Z" fill="#fff" />
    ),
  },
  {
    app: "WhatsApp",
    color: "#25D366",
    title: "3 new messages",
    body: "New patient enquiry · root canal quote",
    time: "14m ago",
    icon: (
      <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Zm0 2a7 7 0 1 1-3.6 13l-.3-.2-2.4.6.6-2.3-.2-.3A7 7 0 0 1 12 5Z" fill="#fff" />
    ),
  },
];

export default function MissedLeadsArt() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(120% 80% at 50% 0%, #14241a 0%, #0a130c 55%, #060d07 100%)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 30,
      }}
    >
      {/* Lock-screen clock */}
      <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: "0.02em" }}>
        Tuesday, 18 June
      </p>
      <p
        style={{
          margin: "2px 0 0",
          fontSize: 56,
          fontWeight: 300,
          color: "rgba(255,255,255,0.92)",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        2:47
      </p>

      {/* Unanswered label */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 14 }}>
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          style={{ width: 6, height: 6, borderRadius: "50%", background: "#DC2626", display: "block" }}
        />
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(248,113,113,0.85)" }}>
          Front desk closed · unanswered
        </span>
      </div>

      {/* Notification stack */}
      <div style={{ width: "88%", marginTop: 18, display: "flex", flexDirection: "column", gap: 8 }}>
        {NOTIFS.map((n, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 + i * 0.13 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              padding: "9px 11px",
            }}
          >
            <div style={{ width: 30, height: 30, borderRadius: 7, background: n.color, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24">{n.icon}</svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontSize: 11.5, fontWeight: 600, color: "#fff" }}>{n.title}</span>
                <span style={{ fontSize: 9.5, color: "rgba(255,255,255,0.45)", flexShrink: 0 }}>{n.time}</span>
              </div>
              <p style={{ margin: "1px 0 0", fontSize: 10.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.35, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {n.body}
              </p>
            </div>
          </motion.div>
        ))}

        {/* +more */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          style={{ textAlign: "center", marginTop: 2 }}
        >
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
            + 5 more enquiries waiting
          </span>
        </motion.div>
      </div>
    </div>
  );
}
