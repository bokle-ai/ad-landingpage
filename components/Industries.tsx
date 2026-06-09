"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Stethoscope, Building2 } from "lucide-react";
import { sectionReveal, sectionViewport } from "@/lib/motion";

const EASE = [0.22, 1, 0.36, 1] as const;

type Industry = {
  label: string;
  Icon: typeof Stethoscope;
  title: string;
  result: string;
  body: string;
  tags: string[];
  cta: string;
  card: { chip: string; header: string; lines: string[]; foot: string };
};

const INDUSTRIES: Industry[] = [
  {
    label: "Healthcare",
    Icon: Stethoscope,
    title: "Clinics that fill the calendar overnight",
    result: "40–60% of after-hours leads recovered",
    body: "Patients book with whoever replies first. Bokle answers every enquiry, qualifies the treatment, and books the slot — so your front desk opens to a full schedule, not a list of missed calls.",
    tags: ["After-hours booking", "No-show recovery", "Treatment & pricing FAQs", "Reminders & rescheduling"],
    cta: "See it for your clinic",
    card: {
      chip: "WhatsApp · 11:48 PM",
      header: "Appointment confirmed",
      lines: ["New patient · Root-canal consult", "Tomorrow, 10:30 AM · Dr. Mehta"],
      foot: "Booked by Bokle while the clinic was closed",
    },
  },
  {
    label: "Real Estate",
    Icon: Building2,
    title: "Property leads booked before they cool",
    result: "+35% more viewings booked",
    body: "Weekend enquiries go cold by Monday. Bokle replies in seconds, screens budget and intent, books the site visit, and routes hot buyers straight to your agents — even at 11pm on a Sunday night.",
    tags: ["Viewing & site-visit booking", "Budget & intent screening", "Weekend & after-hours cover", "Instant lead follow-up"],
    cta: "See it for your listings",
    card: {
      chip: "Web chat · Sun 10:02 PM",
      header: "Site visit booked",
      lines: ["3 BHK · Lakeview Residences", "Saturday, 4:00 PM"],
      foot: "Budget ✓ · Timeline ✓ · Routed to agent",
    },
  },
];

function OutcomeCard({ card }: { card: Industry["card"] }) {
  return (
    <div
      className="relative w-full max-w-[420px] rounded-2xl p-6"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 30px 60px -30px rgba(0,0,0,0.7)",
      }}
    >
      <div className="mb-5 flex items-center gap-2">
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "#25D366", display: "block" }}
        />
        <span className="text-xs uppercase tracking-[0.14em] text-cream/45">{card.chip}</span>
      </div>

      <div className="flex items-center gap-3">
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 16, delay: 0.12 }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
          style={{ background: "#00C60F" }}
        >
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M1.5 6.5L5.5 10.5L14.5 1.5" stroke="#062b0a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
        <p className="font-display text-lg font-bold text-white" style={{ letterSpacing: "-0.01em" }}>
          {card.header}
        </p>
      </div>

      <div className="mt-4 space-y-1.5 pl-12">
        {card.lines.map((l) => (
          <p key={l} className="text-[15px] text-cream/85">{l}</p>
        ))}
      </div>

      <div className="mt-5 border-t border-white/8 pt-4 pl-12">
        <p className="text-[13px] text-cream/55">{card.foot}</p>
      </div>
    </div>
  );
}

export default function Industries() {
  const [active, setActive] = useState(0);
  const ind = INDUSTRIES[active];

  return (
    <motion.section
      id="industries"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      className="grain-overlay relative overflow-hidden bg-bg-primary py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="font-display font-bold text-white max-w-[18ch]"
          style={{ fontSize: "clamp(1.55rem, 3.4vw, 2.85rem)", lineHeight: 1.14, letterSpacing: "-0.005em" }}
        >
          Built for businesses where the{" "}
          <span className="text-brand-accent">first reply wins.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          className="mt-6 max-w-[52ch] text-body text-lg leading-relaxed"
        >
          Healthcare and real estate live or die by speed of response. Bokle is
          tuned for both — trained on the questions your patients and buyers
          actually ask.
        </motion.p>

        {/* Segmented switcher with sliding highlight */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          className="mt-12 inline-flex rounded-full p-1.5"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          role="tablist"
        >
          {INDUSTRIES.map((it, i) => {
            const isActive = i === active;
            return (
              <button
                key={it.label}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                className="relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
                style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.5)" }}
              >
                {isActive && (
                  <motion.span
                    layoutId="ind-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.12)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-2">
                  <it.Icon size={16} strokeWidth={2} style={{ color: isActive ? "#00C60F" : "currentColor" }} />
                  {it.label}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Showcase — fades in on each industry switch (keyed remount,
            no AnimatePresence exit so it can never stall mid-transition) */}
        <div className="mt-12">
            <motion.div
              key={ind.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
            >
              {/* Text column */}
              <div>
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-cream/75"
                  style={{ border: "1px solid rgba(255,255,255,0.16)" }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#00C60F", display: "block" }} />
                  {ind.result}
                </span>

                <h3
                  className="mt-5 font-display font-bold text-white"
                  style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.25rem)", lineHeight: 1.14, letterSpacing: "0" }}
                >
                  {ind.title}
                </h3>

                <p className="mt-4 max-w-[46ch] text-body leading-relaxed">{ind.body}</p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {ind.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/12 px-3.5 py-1.5 text-sm text-cream/80"
                      style={{ background: "rgba(255,255,255,0.02)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <motion.a
                  href="#discovery-call"
                  whileHover={{ x: 3 }}
                  className="mt-8 inline-flex items-center gap-2 font-semibold text-brand-accent"
                >
                  {ind.cta}
                  <ArrowRight className="h-4 w-4" />
                </motion.a>
              </div>

              {/* Outcome artifact */}
              <div className="flex justify-center lg:justify-end">
                <OutcomeCard card={ind.card} />
              </div>
            </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
