"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

/* ── Timeline data — the literal 30-second journey ─────────────── */
const EVENTS = [
  {
    time: "0:00",
    title: "New enquiry arrives",
    body: "On WhatsApp, your website, or a phone call. Day or night, in any language.",
  },
  {
    time: "0:08",
    title: "Bokle replies instantly",
    body: "Qualifies their intent and answers their questions — in your business's voice.",
  },
  {
    time: "0:22",
    title: "Lead qualified & routed",
    body: "Handed to your team with full context. No chasing, no cold follow-ups.",
  },
  {
    time: "0:30",
    title: "Appointment booked",
    body: "Your team only ever talks to serious, ready buyers.",
    done: true,
  },
];

const VIEWPORT = { once: true, amount: 0.3 } as const;
const EASE = [0.22, 1, 0.36, 1] as const;

/* ================================================================ */
export default function HowItWorks() {
  return (
    <section
      id="how"
      className="grain-overlay relative bg-bg-primary scroll-mt-20"
      style={{ paddingTop: 120, paddingBottom: 120 }}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">

        {/* ── Headline ──────────────────────────────────────────── */}
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          className="font-display font-bold text-white"
          style={{ fontSize: "clamp(1.55rem, 3.4vw, 2.85rem)", lineHeight: 1.12 }}
        >
          From{" "}
          <span className="text-brand-accent">missed enquiry</span>
          <br />
          to booked appointment.
          <br />
          In under 30 seconds.
        </motion.h2>

        {/* ── 30-second timeline ────────────────────────────────── */}
        <div className="relative mt-16 max-w-[660px]">
          {/* Continuous connecting line */}
          <motion.div
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 1, ease: EASE }}
            className="absolute origin-top"
            style={{
              left: 70,
              top: 14,
              bottom: 26,
              width: 1.5,
              background:
                "linear-gradient(to bottom, rgba(0,198,15,0.5), rgba(0,198,15,0.15))",
            }}
          />

          {EVENTS.map((e, i) => (
            <motion.div
              key={e.time}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.14, ease: EASE }}
              className="relative grid items-start"
              style={{
                gridTemplateColumns: "56px 28px 1fr",
                columnGap: 16,
                paddingBottom: i < EVENTS.length - 1 ? 40 : 0,
              }}
            >
              {/* Timestamp */}
              <span
                style={{
                  fontFamily: "ui-monospace, SFMono-Regular, monospace",
                  fontSize: 15,
                  color: e.done ? "#00C60F" : "rgba(0,198,15,0.75)",
                  textAlign: "right",
                  paddingTop: 2,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {e.time}
              </span>

              {/* Node */}
              <div style={{ display: "flex", justifyContent: "center", paddingTop: 3 }}>
                {e.done ? (
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: "#00C60F",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 1,
                    }}
                  >
                    <Check size={14} strokeWidth={3} color="#050A06" />
                  </div>
                ) : (
                  <div
                    style={{
                      width: 13,
                      height: 13,
                      borderRadius: "50%",
                      background: "#050A06",
                      border: "1.5px solid rgba(0,198,15,0.7)",
                      marginTop: 5,
                      zIndex: 1,
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div style={{ paddingTop: e.done ? 1 : 0 }}>
                <h3
                  className="font-medium text-white"
                  style={{ fontSize: 20, lineHeight: 1.25 }}
                >
                  {e.title}
                </h3>
                <p
                  className="mt-1.5 text-body"
                  style={{ fontSize: 15, lineHeight: 1.6, maxWidth: 380 }}
                >
                  {e.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Horizontal rule ───────────────────────────────────── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="origin-left mt-20"
          style={{ height: 1, background: "rgba(21,98,27,0.2)" }}
        />

        {/* ── CTA row ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="mt-[60px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
        >
          <p className="text-base text-body" style={{ lineHeight: 1.65 }}>
            We handle the full setup. You&apos;re live in 48 hours.
          </p>

          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#discovery-call"
            className="shrink-0 font-bold text-[15px] hover:bg-[#49CA68] transition-colors"
            style={{
              background: "#00C60F",
              color: "#010801",
              padding: "14px 28px",
              borderRadius: 100,
              display: "inline-block",
              lineHeight: 1,
            }}
          >
            Book Your Discovery Call →
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
