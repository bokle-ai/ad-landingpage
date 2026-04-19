"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { sectionReveal, sectionViewport } from "@/lib/motion";
import Headline from "./Headline";
import SectionLabel from "./SectionLabel";

const TRUST = [
  "No commitment",
  "No tech skills",
  "48hr setup",
  "Cancel anytime",
];

export default function PreFormCTA() {
  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      className="relative bg-bg-alt py-24 md:py-40 overflow-hidden"
    >
      <motion.div
        aria-hidden
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-brand-accent/30 blur-[140px] pointer-events-none"
      />
      <motion.div
        aria-hidden
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-32 -left-32 h-[360px] w-[360px] rounded-full bg-brand-green/40 blur-[140px] pointer-events-none"
      />

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10 text-center">
        <SectionLabel className="mb-8" align="center">— 08 / Ready?</SectionLabel>

        <Headline
          as="h2"
          className="text-[13vw] md:text-[9vw] lg:text-[6.8vw] font-bold leading-[0.92] tracking-[-0.035em] text-white"
          lines={[
            { text: "Stop losing leads" },
            { text: "you never knew you had.", italic: true, className: "!text-brand-accent" },
          ]}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 max-w-2xl mx-auto text-lg md:text-xl text-body leading-relaxed"
        >
          Book a free 30-minute discovery call. We&apos;ll map exactly where
          your enquiries are leaking — and show you what recovering them is
          worth.
        </motion.p>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, staggerChildren: 0.08 }}
          className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3"
        >
          {TRUST.map((t) => (
            <li
              key={t}
              className="flex items-center gap-2 text-sm text-cream/90"
            >
              <Check className="h-4 w-4 text-brand-accent" />
              {t}
            </li>
          ))}
        </motion.ul>

        <motion.a
          whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(0,198,15,0.55)" }}
          whileTap={{ scale: 0.96 }}
          animate={{
            scale: [1, 1.02, 1],
            boxShadow: [
              "0 0 0px rgba(0,198,15,0)",
              "0 0 20px rgba(0,198,15,0.6)",
              "0 0 0px rgba(0,198,15,0)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          href="#discovery-call"
          className="mt-12 inline-flex items-center gap-2 rounded-full bg-brand-accent text-bg-primary px-8 py-4 text-base md:text-lg font-medium"
        >
          Book My Free Discovery Call <ArrowRight className="h-5 w-5" />
        </motion.a>
      </div>
    </motion.section>
  );
}
