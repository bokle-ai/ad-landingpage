"use client";

import { motion } from "framer-motion";
import { sectionReveal, sectionViewport } from "@/lib/motion";
import Headline from "./Headline";
import ResponseRace from "./ResponseRace";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Problem() {
  return (
    <motion.section
      id="problem"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      className="grain-overlay relative overflow-hidden bg-bg-alt py-28 md:py-40"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-16 px-6 md:px-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: editorial statement */}
        <div>
          <Headline
            as="h2"
            className="text-[clamp(2rem,5vw,4.25rem)] font-bold leading-[1.0] tracking-[-0.035em] text-white max-w-[15ch]"
            lines={[
              { text: "Your competitors" },
              { text: "are responding" },
              { text: "while you're still typing.", italic: true },
            ]}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="mt-10 max-w-[44ch] text-body"
            style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.45rem)", lineHeight: 1.55 }}
          >
            A warm enquiry goes cold in{" "}
            <span className="font-semibold text-brand-accent">five minutes</span>.{" "}
            <span className="font-semibold text-brand-accent">One in three</span>{" "}
            never gets a reply at all. By the time your front desk catches up, the
            business that answered in{" "}
            <span className="font-semibold text-brand-accent">eight seconds</span>{" "}
            has already booked the appointment.
          </motion.p>
        </div>

        {/* Right: looping live-exchange animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
          className="lg:justify-self-end"
        >
          <ResponseRace />
        </motion.div>
      </div>
    </motion.section>
  );
}
