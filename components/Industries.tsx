"use client";

import { motion } from "framer-motion";
import { sectionReveal, sectionViewport } from "@/lib/motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const INDUSTRIES = [
  {
    label: "Healthcare",
    title: "Clinics that fill the calendar overnight",
    body: "Patients book with whoever replies first. Bokle answers every after-hours enquiry, qualifies the treatment, and books the appointment — so your front desk opens to a full schedule, not a list of missed calls.",
    tags: [
      "After-hours booking",
      "No-show recovery",
      "Treatment & pricing FAQs",
      "Reminders & rescheduling",
    ],
  },
  {
    label: "Real Estate",
    title: "Property leads booked before they cool",
    body: "Weekend enquiries go cold by Monday. Bokle replies in seconds, screens budget and intent, books the site visit, and hands hot buyers to your agents — even at 11pm on a Sunday night.",
    tags: [
      "Viewing & site-visit booking",
      "Budget & intent screening",
      "Weekend & after-hours cover",
      "Instant lead follow-up",
    ],
  },
];

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
          tuned for both — trained on the questions your buyers and patients
          actually ask.
        </motion.p>

        {/* Two verticals */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={ind.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: EASE }}
              className={i === 1 ? "lg:border-l lg:border-white/10 lg:pl-16" : ""}
            >
              <p
                className="mb-5 font-medium uppercase text-brand-accent"
                style={{ fontSize: 11, letterSpacing: "0.2em" }}
              >
                {ind.label}
              </p>

              <h3
                className="font-display font-bold text-white"
                style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.7rem)", lineHeight: 1.15, letterSpacing: "-0.01em" }}
              >
                {ind.title}
              </h3>

              <p className="mt-4 max-w-[42ch] text-body leading-relaxed">
                {ind.body}
              </p>

              <div className="mt-7 flex flex-wrap gap-2.5">
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
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
