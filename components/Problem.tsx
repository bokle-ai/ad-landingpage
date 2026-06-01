"use client";

import { motion } from "framer-motion";
import { sectionReveal, sectionViewport, staggerRows, rowItem } from "@/lib/motion";
import Image from "next/image";
import Headline from "./Headline";
import CountUp from "./CountUp";
import SectionLabel from "./SectionLabel";

const STATS = [
  {
    value: 78,
    suffix: "%",
    label: "of customers buy from the first business that responds.",
  },
  {
    value: 5,
    suffix: " min",
    label: "is all it takes for a warm lead to go cold.",
  },
  {
    value: 1,
    suffix: "",
    label: "in 3 enquiries never gets any reply at all.",
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
      className="grain-overlay relative bg-bg-alt py-24 md:py-40"
    >
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

          {/* Right: pain desk photo — desktop only */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div
              className="relative overflow-hidden rounded-[12px]"
              style={{
                height: 420,
                border: "1px solid rgba(21,98,27,0.25)",
              }}
            >
              <Image
                src="/pain-desk.png"
                alt="Leads piling up after hours"
                fill
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
              {/* Bottom gradient */}
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{
                  height: 120,
                  background: "linear-gradient(to top, rgba(10,21,0,0.9), transparent)",
                }}
              />
              {/* Floating label */}
              <div
                className="absolute bottom-5 left-5"
                style={{
                  background: "rgba(5,10,6,0.85)",
                  border: "1px solid rgba(21,98,27,0.4)",
                  borderRadius: 8,
                  padding: "10px 14px",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 400,
                }}
              >
                Every night. Every missed lead.
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
