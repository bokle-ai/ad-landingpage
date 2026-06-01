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
      {/* Grain overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: "url('/grain.png')", backgroundRepeat: "repeat", opacity: 0.035 }} />
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: headline + stats */}
          <div>
            <SectionLabel className="mb-8">— 02 / The Problem</SectionLabel>

            <Headline
              as="h2"
              className="text-[clamp(1.8rem,5vw,4.5rem)] font-bold leading-[0.92] tracking-[-0.035em] text-white max-w-[14ch]"
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
              className="mt-16 grid grid-cols-1 gap-8"
            >
              {STATS.map((s, i) => (
                <motion.div
                  key={i}
                  variants={rowItem}
                  className="pl-6 border-l border-brand-accent/60 py-2"
                >
                  <div className="text-[clamp(2rem,5vw,4rem)] font-bold text-brand-accent leading-[0.9] tracking-[-0.04em]">
                    {s.textOverride ? (
                      s.textOverride
                    ) : (
                      <CountUp to={s.value} suffix={s.suffix ?? ""} />
                    )}
                  </div>
                  <p className="mt-3 text-base text-body leading-relaxed max-w-xs">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: pain desk photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "4/5" }}>
              <img
                src="/pain-desk.png"
                alt="Desk with missed calls and unread WhatsApp messages"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(10,21,0,0.7) 0%, transparent 50%)" }}
              />
              <p
                className="absolute bottom-5 left-5 right-5 text-sm italic"
                style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}
              >
                Every night. Every missed lead.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
