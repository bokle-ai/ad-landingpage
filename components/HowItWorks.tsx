"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Zap, UserCheck } from "lucide-react";
import Image from "next/image";

/* ── Step data ─────────────────────────────────────────────────── */
const STEPS = [
  {
    num: "01",
    Icon: MessageCircle,
    title: "They reach out",
    body: "On WhatsApp, your website, or by phone. Day or night. In any language.",
  },
  {
    num: "02",
    Icon: Zap,
    title: "Bokle AI responds instantly",
    body: "In under 30 seconds. Qualifies their intent. Answers their questions. Speaks your business's voice.",
  },
  {
    num: "03",
    Icon: UserCheck,
    title: "You get a qualified lead",
    body: "Routed to your team with full context. No chasing. No cold follow-ups. No missed revenue. Your team only talks to serious buyers.",
  },
];

/* ── Shared animation config ──────────────────────────────────── */
const VIEWPORT = { once: true, amount: 0.3 } as const;
const EASE = [0.22, 1, 0.36, 1] as const;

/* ================================================================ */
export default function HowItWorks() {
  return (
    <section
      id="how"
      className="grain-overlay relative bg-bg-primary"
      style={{ paddingTop: 120, paddingBottom: 120 }}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">

        {/* ── Headline ──────────────────────────────────────────── */}
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          className="font-bold text-white"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 1.1 }}
        >
          From{" "}
          <span className="italic-serif font-normal text-cream">
            missed enquiry
          </span>
          <br />
          to booked appointment.
          <br />
          In under 30 seconds.
        </motion.h2>

        {/* ── Three steps ───────────────────────────────────────── */}
        <div
          className="mt-20 flex flex-col md:flex-row md:items-start"
          role="list"
        >
          {STEPS.map((step, i) => (
            <Fragment key={step.num}>
              {/* Step */}
              <motion.div
                role="listitem"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.65, delay: i * 0.13, ease: EASE }}
                className="flex-1"
                style={{ paddingBottom: i < STEPS.length - 1 ? 40 : 0 }}
              >
                {/* Number */}
                <p
                  className="mb-4 font-medium uppercase text-brand-accent"
                  style={{ fontSize: 11, letterSpacing: "0.2em" }}
                >
                  {step.num}
                </p>

                {/* Icon — muted green, thin stroke, 24 px */}
                <step.Icon
                  size={24}
                  strokeWidth={1.5}
                  color="#15621B"
                  aria-hidden
                  className="mb-6"
                />

                {/* Title */}
                <h3
                  className="mb-3 font-medium text-white leading-snug"
                  style={{ fontSize: 22 }}
                >
                  {step.title}
                </h3>

                {/* Body */}
                <p
                  className="text-base"
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.65,
                    maxWidth: 240,
                  }}
                >
                  {step.body}
                </p>
              </motion.div>

              {/* Vertical divider — desktop only, between steps */}
              {i < STEPS.length - 1 && (
                <motion.div
                  aria-hidden
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={VIEWPORT}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.13 + 0.35,
                    ease: EASE,
                  }}
                  className="hidden md:block mx-10 lg:mx-14 shrink-0 self-center origin-top"
                  style={{
                    width: 1,
                    height: 80,
                    background: "rgba(21,98,27,0.25)",
                  }}
                />
              )}

              {/* Horizontal divider — mobile only, between steps */}
              {i < STEPS.length - 1 && (
                <div
                  aria-hidden
                  className="block md:hidden mb-10"
                  style={{
                    height: 1,
                    background: "rgba(21,98,27,0.25)",
                  }}
                />
              )}
            </Fragment>
          ))}
        </div>

        {/* ── Relief person image strip ─────────────────────────── */}
        <div style={{
          position: 'relative',
          height: '190px',
          borderRadius: '12px',
          overflow: 'hidden',
          margin: '56px 0',
          border: '1px solid rgba(21,98,27,0.2)'
        }}>
          <Image
            src="/relief-person.jpg"
            alt=""
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(5,10,6,0.65) 0%, rgba(5,10,6,0.2) 50%, rgba(5,10,6,0.65) 100%)'
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <p style={{
              fontFamily: 'Instrument Serif, serif',
              fontStyle: 'italic',
              fontSize: '18px',
              color: 'rgba(255,255,255,0.8)',
              textAlign: 'center',
              maxWidth: '500px',
              padding: '0 24px'
            }}>
              This is what your business looks like with Bokle running.
            </p>
          </div>
        </div>

        {/* ── Horizontal rule ───────────────────────────────────── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="origin-left"
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
          <p
            className="text-base"
            style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}
          >
            We handle the full setup. You&apos;re live in 48 hours.
          </p>

          <motion.a
            whileHover={{ scale: 1.03, boxShadow: "0 0 28px rgba(0,198,15,0.45)" }}
            whileTap={{ scale: 0.97 }}
            href="#discovery-call"
            className="shrink-0 font-bold text-[15px]"
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
