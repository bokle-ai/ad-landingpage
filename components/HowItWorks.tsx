"use client";

import { motion } from "framer-motion";
import { Check, Inbox, Sparkles, ArrowRight } from "lucide-react";
import { sectionReveal, sectionViewport } from "@/lib/motion";
import Headline from "./Headline";
import DemoWidget from "./DemoWidget";
import SectionLabel from "./SectionLabel";

const STEPS = [
  {
    num: "01",
    title: "Enquiry Comes In",
    desc: "A lead reaches out — WhatsApp, call, chat, or form.",
    icon: Inbox,
  },
  {
    num: "02",
    title: "Bokle AI Responds",
    desc: "In under 30 seconds. In their language. With your voice.",
    icon: Sparkles,
  },
  {
    num: "03",
    title: "Qualified Lead Delivered",
    desc: "Routed to your team with context, intent, and next steps.",
    icon: Check,
  },
];

export default function HowItWorks() {
  return (
    <motion.section
      id="how"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      className="relative bg-bg-primary py-24 md:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel className="mb-8">— 03 / How It Works</SectionLabel>

        <div className="max-w-4xl">
          <Headline
            as="h2"
            className="text-[12vw] md:text-[8vw] lg:text-[5.6vw] font-bold leading-[0.92] tracking-[-0.035em] text-white"
            lines={[
              { text: "From missed enquiry" },
              { text: "to qualified lead.", italic: true, className: "!text-brand-accent" },
            ]}
          />
          <p className="mt-8 text-lg md:text-xl text-body max-w-md leading-relaxed">
            Three steps. No forms queued overnight. No leads gone cold.
            <span className="italic-serif text-cream"> In seconds, not hours.</span>
          </p>
        </div>

        <div className="mt-20 md:mt-28 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3, margin: "0px 0px -100px 0px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="group relative rounded-3xl border border-white/10 bg-bg-alt/60 p-7 md:p-8 hover:border-brand-accent/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-5xl md:text-6xl font-bold text-brand-accent tracking-tighter leading-none">
                    {step.num}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-bg-primary/60 text-brand-accent group-hover:border-brand-accent/50 transition-colors">
                    <step.icon className="h-4.5 w-4.5" />
                  </span>
                </div>

                <h3 className="mt-10 text-2xl md:text-[26px] font-medium text-white tracking-tight leading-snug">
                  {step.title}
                </h3>
                <p className="mt-3 text-body text-base leading-relaxed max-w-[32ch]">
                  {step.desc}
                </p>

                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="hidden md:flex absolute top-1/2 -right-[22px] -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full border border-brand-accent/40 bg-bg-primary text-brand-accent"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <DemoWidget />
      </div>
    </motion.section>
  );
}
