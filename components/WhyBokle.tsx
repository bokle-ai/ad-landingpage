"use client";

import { motion } from "framer-motion";
import { Zap, Wrench, Globe, TrendingUp } from "lucide-react";
import { sectionReveal, sectionViewport } from "@/lib/motion";
import Headline from "./Headline";
import SectionLabel from "./SectionLabel";

const FEATURES = [
  {
    icon: Zap,
    title: "Instant Response, Every Time",
    desc: "Sub-30-second replies, around the clock, without breaks.",
  },
  {
    icon: Wrench,
    title: "Zero Technical Setup",
    desc: "We build and connect everything for you. No code, no plugins.",
  },
  {
    icon: Globe,
    title: "Works Across Every Channel",
    desc: "WhatsApp, voice, and web chat — one consistent voice.",
  },
  {
    icon: TrendingUp,
    title: "Built to Scale With You",
    desc: "Handle 10 or 10,000 enquiries a month. Same speed, same quality.",
  },
];

export default function WhyBokle() {
  return (
    <motion.section
      id="why"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      className="relative bg-bg-primary py-24 md:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel className="mb-8" align="center">— 05 / Why Bokle AI</SectionLabel>

        <div className="max-w-5xl mx-auto text-center">
          <Headline
            as="h2"
            className="text-[12vw] md:text-[8vw] lg:text-[6.4vw] font-bold leading-[0.92] tracking-[-0.035em] text-white"
            lines={[
              { text: "Not just automation." },
              { text: "A business that never sleeps.", italic: true },
            ]}
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -100px 0px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-px md:gap-16"
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.05 },
                },
              }}
              whileHover={{ y: -4 }}
              className="relative pt-8"
            >
              {/* Top border — scales in left to right */}
              <motion.span
                aria-hidden
                variants={{
                  hidden: { scaleX: 0 },
                  visible: {
                    scaleX: 1,
                    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="absolute top-0 left-0 right-0 h-px bg-brand-accent/60 origin-left"
              />
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <f.icon className="h-7 w-7 text-brand-accent" strokeWidth={1.4} />
                <h3 className="mt-6 text-3xl md:text-4xl font-medium text-white tracking-tight max-w-sm">
                  {f.title}
                </h3>
                <p className="mt-4 text-body text-base md:text-lg max-w-md leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
