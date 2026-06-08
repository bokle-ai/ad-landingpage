"use client";

import { motion } from "framer-motion";
import { sectionReveal, sectionViewport } from "@/lib/motion";
import Headline from "./Headline";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Problem() {
  return (
    <motion.section
      id="problem"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      className="grain-overlay relative overflow-hidden bg-bg-alt py-28 md:py-44"
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <Headline
          as="h2"
          className="text-[clamp(2rem,5.5vw,4.5rem)] font-bold leading-[1.0] tracking-[-0.035em] text-white max-w-[16ch]"
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
          className="mt-12 max-w-[44ch] text-body"
          style={{ fontSize: "clamp(1.15rem, 2vw, 1.6rem)", lineHeight: 1.55 }}
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
    </motion.section>
  );
}
