"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { sectionReveal, sectionViewport } from "@/lib/motion";

const EASE = [0.22, 1, 0.36, 1] as const;

type Industry = {
  label: string;
  title: string;
  result: string;
  body: string;
  tags: string[];
  cta: string;
  card: {
    chip: string;
    header: string;
    lines: string[];
    foot: string;
  };
};

const INDUSTRIES: Industry[] = [
  {
    label: "Healthcare",
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
    title: "Property leads booked before they cool",
    result: "+35% more viewings booked",
    body: "Weekend enquiries go cold by Monday. Bokle replies in seconds, screens budget and intent, books the site visit, and routes hot buyers straight to your agents — even at 11pm on a Sunday.",
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

/* On-brand "outcome" artifact — a realistic booking confirmation. */
function OutcomeCard({ card }: { card: Industry["card"] }) {
  return (
    <div
      className="relative w-full max-w-[400px] rounded-2xl p-6"
      style={{
        background: "linear-gradient(160deg, rgba(0,198,15,0.07), rgba(255,255,255,0.02))",
        border: "1px solid rgba(0,198,15,0.22)",
      }}
    >
      {/* channel chip */}
      <div className="mb-5 flex items-center gap-2">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "#25D366", display: "block" }}
        />
        <span className="text-xs uppercase tracking-[0.14em] text-cream/45">{card.chip}</span>
      </div>

      {/* check + header */}
      <div className="flex items-center gap-3">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
          style={{ background: "#00C60F" }}
        >
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M1.5 6.5L5.5 10.5L14.5 1.5" stroke="#062b0a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="font-display text-lg font-bold text-white" style={{ letterSpacing: "-0.01em" }}>
          {card.header}
        </p>
      </div>

      {/* detail lines */}
      <div className="mt-4 space-y-1.5 pl-12">
        {card.lines.map((l) => (
          <p key={l} className="text-[15px] text-cream/85">
            {l}
          </p>
        ))}
      </div>

      {/* footer */}
      <div className="mt-5 border-t border-white/8 pt-4 pl-12">
        <p className="text-[13px] text-brand-accent">{card.foot}</p>
      </div>
    </div>
  );
}

export default function Industries() {
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
          style={{ fontSize: "clamp(1.55rem, 3.4vw, 2.85rem)", lineHeight: 1.12, letterSpacing: "-0.02em" }}
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

        {/* Alternating industry rows */}
        <div className="mt-20 flex flex-col gap-20 md:gap-28">
          {INDUSTRIES.map((ind, i) => {
            const flip = i % 2 === 1;
            return (
              <motion.div
                key={ind.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                {/* Text column */}
                <div className={flip ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3">
                    <span
                      className="font-medium uppercase text-brand-accent"
                      style={{ fontSize: 11, letterSpacing: "0.2em" }}
                    >
                      {ind.label}
                    </span>
                    <span
                      className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-brand-accent"
                      style={{ background: "rgba(0,198,15,0.1)", border: "1px solid rgba(0,198,15,0.3)" }}
                    >
                      {ind.result}
                    </span>
                  </div>

                  <h3
                    className="mt-5 font-display font-bold text-white"
                    style={{ fontSize: "clamp(1.4rem, 2.6vw, 2.1rem)", lineHeight: 1.12, letterSpacing: "-0.015em" }}
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
                <div
                  className={`flex justify-center ${
                    flip ? "lg:order-1 lg:justify-start" : "lg:justify-end"
                  }`}
                >
                  <OutcomeCard card={ind.card} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
