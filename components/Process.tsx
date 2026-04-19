"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { sectionReveal, sectionViewport } from "@/lib/motion";
import Headline from "./Headline";
import SectionLabel from "./SectionLabel";

const STEPS = [
  {
    num: "01",
    title: "Consultation",
    when: "Day 1",
    desc: "A 30-min call to map your enquiry flow, gaps, and goals.",
  },
  {
    num: "02",
    title: "Custom Build",
    when: "Day 1–2",
    desc: "We design your agent around your business, voice, and language.",
  },
  {
    num: "03",
    title: "Integration",
    when: "Day 2",
    desc: "WhatsApp, CRM, calendar, voice — connected and tested end-to-end.",
  },
  {
    num: "04",
    title: "Optimise & Scale",
    when: "Ongoing",
    desc: "We tune responses, expand languages, and grow as your volume grows.",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      className="relative bg-bg-alt py-24 md:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel className="mb-8">— 06 / Our Process</SectionLabel>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Headline
                as="h2"
                className="text-[12vw] md:text-[8vw] lg:text-[5.6vw] font-bold leading-[0.92] tracking-[-0.035em] text-white"
                lines={[
                  { text: "From consultation" },
                  { text: "to live in 48 hours.", italic: true, className: "!text-brand-accent" },
                ]}
              />
              <p className="mt-8 text-lg text-body max-w-md leading-relaxed">
                Most teams spend 48 hours drafting a brief. We spend 48 hours
                launching your AI front desk.
              </p>
            </div>
          </div>

          <div ref={ref} className="lg:col-span-7 relative pl-8 md:pl-10">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-white/10" />
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-0 top-2 w-px bg-brand-accent shadow-[0_0_12px_rgba(0,198,15,0.7)]"
            />

            <ul className="space-y-14">
              {STEPS.map((s, i) => (
                <motion.li
                  key={s.num}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4, margin: "0px 0px -100px 0px" }}
                  transition={{ duration: 0.6, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <span className="absolute -left-[41px] md:-left-[45px] top-3 h-3 w-3 rounded-full bg-brand-accent shadow-[0_0_14px_rgba(0,198,15,0.8)]" />
                  <div className="flex flex-wrap items-baseline gap-4">
                    <motion.span
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.4, margin: "0px 0px -100px 0px" }}
                      transition={{
                        type: "spring",
                        stiffness: 180,
                        damping: 12,
                        delay: i * 0.2 + 0.15,
                      }}
                      className="text-6xl md:text-7xl font-bold text-brand-accent tracking-tighter leading-none"
                    >
                      {s.num}
                    </motion.span>
                    <span className="text-2xl md:text-3xl text-white font-medium">
                      / {s.title}
                    </span>
                    <span className="section-label ml-auto">{s.when}</span>
                  </div>
                  <p className="mt-4 text-body text-base md:text-lg max-w-xl leading-relaxed">
                    {s.desc}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
