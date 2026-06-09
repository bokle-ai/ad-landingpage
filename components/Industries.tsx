"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { sectionReveal, sectionViewport } from "@/lib/motion";
import IndustryPhone, { ChatMessage } from "./IndustryPhone";

const EASE = [0.22, 1, 0.36, 1] as const;

type Industry = {
  label: string;
  title: string;
  result: string;
  body: string;
  tags: string[];
  cta: string;
  contact: string;
  chat: ChatMessage[];
};

const INDUSTRIES: Industry[] = [
  {
    label: "Healthcare",
    title: "Clinics that fill the calendar overnight",
    result: "40–60% of after-hours leads recovered",
    body: "Patients book with whoever replies first. Bokle answers every enquiry, qualifies the treatment, and books the slot — so your front desk opens to a full schedule, not a list of missed calls.",
    tags: ["After-hours booking", "No-show recovery", "Treatment & pricing FAQs"],
    cta: "See it for your clinic",
    contact: "Bright Smile Dental",
    chat: [
      { side: "in", text: "Hi, any chance of a cleaning this week? It's 9pm, hope someone sees this 😅", time: "21:04" },
      { side: "out", text: "We do — I can offer Thu 4:30pm or Fri 11am. Which suits you?", time: "21:04" },
      { side: "in", text: "Thursday 4:30 works", time: "21:05" },
      { side: "out", text: "Booked ✓ Thu 4:30pm with Dr. Mehta. See you then!", time: "21:05", booked: true },
    ],
  },
  {
    label: "Real Estate",
    title: "Property leads booked before they cool",
    result: "+35% more viewings booked",
    body: "Weekend enquiries go cold by Monday. Bokle replies in seconds, screens budget and intent, books the site visit, and routes hot buyers straight to your agents — even at 11pm on a Sunday.",
    tags: ["Viewing & site-visit booking", "Budget & intent screening", "Weekend cover"],
    cta: "See it for your listings",
    contact: "Lakeview Residences",
    chat: [
      { side: "in", text: "Saw the 3 BHK listing — can I view it this weekend?", time: "22:10" },
      { side: "out", text: "Of course. Sat 4pm or Sun 11am for a site visit?", time: "22:10" },
      { side: "in", text: "Sunday 11 is good", time: "22:11" },
      { side: "out", text: "Booked ✓ Sun 11am at Lakeview. Sending the location pin.", time: "22:11", booked: true },
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
          Healthcare and real estate live or die by speed of response. Here&apos;s
          a real after-hours conversation from each — handled start to finish
          while the office was closed.
        </motion.p>

        {/* Alternating rows: text + tailored phone conversation */}
        <div className="mt-20 flex flex-col gap-24 md:gap-32">
          {INDUSTRIES.map((ind, i) => {
            const flip = i % 2 === 1;
            return (
              <motion.div
                key={ind.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20"
              >
                {/* Text */}
                <div className={flip ? "lg:order-2" : ""}>
                  <span
                    className="font-medium uppercase text-cream/45"
                    style={{ fontSize: 11, letterSpacing: "0.2em" }}
                  >
                    {ind.label}
                  </span>

                  <h3
                    className="mt-5 font-display font-bold text-white"
                    style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.25rem)", lineHeight: 1.14, letterSpacing: "0" }}
                  >
                    {ind.title}
                  </h3>

                  <p className="mt-4 max-w-[46ch] text-body leading-relaxed">{ind.body}</p>

                  <p className="mt-6 text-[15px] font-semibold text-cream/90">{ind.result}</p>

                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {ind.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/12 px-3.5 py-1.5 text-sm text-cream/75"
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

                {/* Phone */}
                <div className={`flex justify-center ${flip ? "lg:order-1 lg:justify-start" : "lg:justify-end"}`}>
                  <IndustryPhone contact={ind.contact} messages={ind.chat} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
