"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

type Counter = {
  to: number;
  prefix?: string;
  suffix?: string;
  staticOverride?: string;
  label: string;
};

const COUNTERS: Counter[] = [
  {
    to: 40,
    suffix: "%",
    label: "Average increase in lead conversion in month 1",
  },
  {
    to: 60,
    prefix: "< ",
    suffix: "s",
    label: "Average first response time across all channels",
  },
  {
    to: 48,
    suffix: "hrs",
    label: "Average time from consultation to going live",
  },
  {
    to: 24,
    suffix: "/7",
    label: "Availability — no breaks, no holidays, no missed calls",
  },
];

function Counter({
  to,
  prefix = "",
  suffix = "",
  label,
}: Counter) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const value = useMotionValue(0);
  const rounded = useTransform(value, (v) => Math.round(v).toString());

  useEffect(() => {
    if (inView) {
      const controls = animate(value, to, {
        duration: 2.5,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [inView, to, value]);

  return (
    <div ref={ref} className="flex-1 min-w-0 px-6 md:px-10 py-10">
      <div className="flex items-baseline text-brand-accent font-bold leading-none tracking-[-0.04em] text-[44px] md:text-[56px] lg:text-[72px]">
        {prefix && <span>{prefix}</span>}
        <motion.span>{rounded}</motion.span>
        {suffix && <span>{suffix}</span>}
      </div>
      <p className="mt-4 text-sm md:text-base text-body leading-snug max-w-[22ch]">
        {label}
      </p>
    </div>
  );
}

export default function ResultsTicker() {
  return (
    <section className="bg-bg-alt border-y border-brand-accent/20">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-brand-accent/25">
          {COUNTERS.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Counter {...c} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
