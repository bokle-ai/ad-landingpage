"use client";

import { motion } from "framer-motion";
import { sectionReveal, sectionViewport, staggerRows, rowItem } from "@/lib/motion";
import Headline from "./Headline";
import CountUp from "./CountUp";
import SectionLabel from "./SectionLabel";

const STATS = [
  {
    value: 78,
    suffix: "%",
    format: undefined,
    label: "of customers buy from the first business that responds.",
  },
  {
    value: 5,
    suffix: " min",
    format: undefined,
    label: "is all it takes for a warm lead to go cold.",
  },
  {
    value: 1,
    suffix: "",
    format: undefined,
    label: "in 3 enquiries never gets any reply at all.",
    prefix: "",
    textOverride: "1 in 3",
  },
];

export default function Problem() {
  return (
    <motion.section
      id="problem"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      className="relative bg-bg-alt py-24 md:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel className="mb-8">— 02 / The Problem</SectionLabel>

        <Headline
          as="h2"
          className="text-[13vw] md:text-[9vw] lg:text-[7.2vw] font-bold leading-[0.92] tracking-[-0.035em] text-white max-w-[14ch]"
          lines={[
            { text: "Your competitors" },
            { text: "are responding" },
            { text: "while you're still typing.", italic: true },
          ]}
        />

        <motion.div
          variants={staggerRows}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -100px 0px" }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-px md:gap-10"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              variants={rowItem}
              className="pl-6 md:pl-8 border-l border-brand-accent/60 py-4"
            >
              <div className="text-6xl md:text-7xl lg:text-[96px] font-bold text-brand-accent leading-[0.9] tracking-[-0.04em]">
                {s.textOverride ? (
                  s.textOverride
                ) : (
                  <CountUp to={s.value} suffix={s.suffix ?? ""} />
                )}
              </div>
              <p className="mt-5 text-base md:text-lg text-body leading-relaxed max-w-xs">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
