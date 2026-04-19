"use client";

import { motion } from "framer-motion";
import { Check, Inbox, Sparkles } from "lucide-react";
import { sectionReveal, sectionViewport } from "@/lib/motion";
import Headline from "./Headline";
import Waveform from "./Waveform";
import DemoWidget from "./DemoWidget";
import SectionLabel from "./SectionLabel";

const STEPS = [
  {
    label: "Step 01",
    title: "Enquiry Comes In",
    desc: "A lead reaches out — WhatsApp, call, chat, or form.",
    icon: Inbox,
  },
  {
    label: "Step 02",
    title: "Bokle AI Responds",
    desc: "In under 30 seconds. In their language. With your voice.",
    icon: Sparkles,
    center: true,
  },
  {
    label: "Step 03",
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

        <div className="max-w-5xl mx-auto text-center">
          <Headline
            as="h2"
            className="text-[12vw] md:text-[8vw] lg:text-[6.2vw] font-bold leading-[0.92] tracking-[-0.035em] text-white text-center"
            lines={[
              { text: "From missed enquiry" },
              { text: "to qualified lead.", italic: true, className: "!text-brand-accent" },
            ]}
          />
          <p className="italic-serif text-3xl md:text-4xl text-cream mt-8">
            In seconds, not hours.
          </p>
        </div>

        <div className="mt-24 relative">
          <svg
            aria-hidden
            className="hidden md:block absolute top-1/2 left-0 right-0 -translate-y-1/2 w-full h-16 pointer-events-none"
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 120 30 L 500 30"
              stroke="#00C60F"
              strokeWidth="1"
              strokeDasharray="6 8"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }}
            />
            <motion.path
              d="M 500 30 L 880 30"
              stroke="#00C60F"
              strokeWidth="1"
              strokeDasharray="6 8"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 1.0, ease: "easeInOut" }}
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 relative">
            {STEPS.map((step, i) => {
              // Left card slides in from x:-60, center scales in with spring, right slides in from x:+60
              const initial =
                i === 0
                  ? { opacity: 0, x: -60 }
                  : i === 2
                  ? { opacity: 0, x: 60 }
                  : { opacity: 0, scale: 0 };
              const animate =
                i === 1
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 1, x: 0 };
              const transition =
                i === 1
                  ? { type: "spring" as const, stiffness: 80, damping: 15, delay: 0.25 }
                  : { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: i === 0 ? 0 : 0.15 };

              return (
              <motion.div
                key={step.title}
                initial={initial}
                whileInView={animate}
                viewport={{ once: true, amount: 0.3, margin: "0px 0px -100px 0px" }}
                transition={transition}
                whileHover={{ y: -4 }}
                className={`relative flex flex-col items-center text-center ${
                  step.center ? "md:-mt-6" : ""
                }`}
              >
                {step.center ? (
                  <div className="relative h-48 w-48 rounded-full bg-bg-alt border border-brand-accent/50 flex flex-col items-center justify-center animate-pulse-glow">
                    <step.icon className="h-9 w-9 text-brand-accent" />
                    <Waveform bars={10} className="mt-3" />
                  </div>
                ) : (
                  <div className="h-32 w-32 rounded-2xl bg-bg-alt border border-white/10 flex items-center justify-center hover:border-brand-accent/60 transition-colors">
                    <step.icon
                      className={`h-8 w-8 ${
                        i === 2 ? "text-brand-accent" : "text-cream"
                      }`}
                    />
                  </div>
                )}
                <div className="mt-6 section-label">{step.label}</div>
                <h3 className="mt-2 text-2xl md:text-3xl font-medium text-white tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-body text-sm md:text-base max-w-[26ch]">
                  {step.desc}
                </p>
              </motion.div>
              );
            })}
          </div>
        </div>

        <DemoWidget />
      </div>
    </motion.section>
  );
}
