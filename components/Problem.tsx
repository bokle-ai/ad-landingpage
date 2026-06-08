"use client";

import { motion } from "framer-motion";
import { sectionReveal, sectionViewport, staggerRows, rowItem } from "@/lib/motion";
import Headline from "./Headline";
import CountUp from "./CountUp";

/* One night of unanswered enquiries — the human cost behind the stats */
const MISSED = [
  { time: "8:47 PM", text: "“Are you open tomorrow?”", status: "No reply" },
  { time: "11:02 PM", text: "Missed call — new patient", status: "No reply" },
  { time: "1:15 AM", text: "“Need a quote, call me back”", status: "No reply" },
  { time: "7:30 AM", text: "They booked with a competitor.", status: "Lost", final: true },
];

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
      className="grain-overlay relative overflow-hidden bg-bg-alt py-24 md:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: headline + stats */}
          <div>
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
                      <CountUp end={s.value} suffix={s.suffix ?? ""} />
                    )}
                  </div>
                  <p className="mt-3 text-base text-body leading-relaxed max-w-xs">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: one night of unanswered enquiries — typographic */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:pt-2"
          >
            <p
              className="mb-7 font-medium uppercase"
              style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                color: "rgba(248,113,113,0.8)",
              }}
            >
              One night at your front desk
            </p>

            <div role="list">
              {MISSED.map((m, i) => (
                <motion.div
                  key={m.time}
                  role="listitem"
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                  className="flex items-baseline justify-between gap-4 border-b py-4"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <div className="flex items-baseline gap-4 min-w-0">
                    <span
                      style={{
                        fontFamily: "ui-monospace, SFMono-Regular, monospace",
                        fontVariantNumeric: "tabular-nums",
                        fontSize: 14,
                        color: "rgba(255,255,255,0.5)",
                        flexShrink: 0,
                        width: 66,
                      }}
                    >
                      {m.time}
                    </span>
                    <span
                      className="truncate"
                      style={{
                        fontSize: 15,
                        color: m.final ? "#fff" : "rgba(255,255,255,0.82)",
                        fontWeight: m.final ? 600 : 400,
                      }}
                    >
                      {m.text}
                    </span>
                  </div>
                  <span
                    className="shrink-0 uppercase"
                    style={{
                      fontSize: 10.5,
                      letterSpacing: "0.1em",
                      fontWeight: 600,
                      color: m.final ? "#f87171" : "rgba(248,113,113,0.6)",
                    }}
                  >
                    {m.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
