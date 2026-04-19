"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { sectionReveal, sectionViewport } from "@/lib/motion";
import ResultsTicker from "./testimonials/ResultsTicker";
import IllustrationPhone from "./testimonials/IllustrationPhone";
import IllustrationVoice from "./testimonials/IllustrationVoice";
import IllustrationFunnel from "./testimonials/IllustrationFunnel";
import SectionLabel from "./SectionLabel";

type Block = {
  num: string;
  quote: string;
  proof: string;
  name: string;
  business: string;
  city: string;
  tag: string;
  Illustration: () => ReactNode;
};

const BLOCKS: Block[] = [
  {
    num: "01",
    quote:
      "Bokle AI replied to a WhatsApp enquiry at 2am. By morning it was a confirmed booking. That one lead alone covered our entire setup cost.",
    proof: "ROI achieved in the first week",
    name: "Sarah J.",
    business: "Real Estate Agency",
    city: "Dubai, UAE",
    tag: "Real Estate",
    Illustration: IllustrationPhone,
  },
  {
    num: "02",
    quote:
      "We used to lose every lead that came in on weekends. Now our AI voice agent handles them all. Our conversion rate went up 40% in the first month — without hiring a single extra person.",
    proof: "40% conversion increase in 30 days",
    name: "Dr. Marcus Lee",
    business: "Dental Clinic",
    city: "New York, USA",
    tag: "Healthcare",
    Illustration: IllustrationVoice,
  },
  {
    num: "03",
    quote:
      "I was sceptical. Setup took 48 hours and the team handled absolutely everything. I just started receiving fully qualified leads with context. It felt like having a full sales team overnight.",
    proof: "Full pipeline automated in 48 hours",
    name: "Priya Nair",
    business: "E-commerce Brand",
    city: "Mumbai, India",
    tag: "E-commerce",
    Illustration: IllustrationFunnel,
  },
];

function Divider({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      aria-hidden
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className="block h-px w-full bg-brand-accent/60 origin-left"
    />
  );
}

export default function Testimonials() {
  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      className="relative bg-bg-primary"
    >
      {/* PART A — Results ticker */}
      <ResultsTicker />

      {/* PART B — Editorial testimonial blocks */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32">
        <SectionLabel className="mb-16">— 07 / Client Stories</SectionLabel>

        <Divider />

        {BLOCKS.map((b, i) => {
          const { Illustration } = b;
          return (
            <div key={b.num}>
              <motion.article
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 py-16 md:py-24 items-start"
              >
                {/* LEFT — identifier (22%) */}
                <div className="lg:col-span-3">
                  <div className="text-[80px] font-bold text-brand-accent leading-none tracking-[-0.04em]">
                    {b.num}
                  </div>
                  <div className="mt-8 text-sm font-bold tracking-[0.2em] text-white uppercase">
                    {b.name}
                  </div>
                  <div className="mt-2 text-sm text-body leading-snug">
                    {b.business}
                    <br />
                    {b.city}
                  </div>
                  <span className="mt-6 inline-flex items-center rounded-full bg-brand-accent/10 border border-brand-accent/40 px-3 py-1.5 text-[10px] font-bold tracking-[0.22em] text-brand-accent uppercase">
                    {b.tag}
                  </span>
                </div>

                {/* CENTER — quote (50%) */}
                <div className="lg:col-span-6">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="italic-serif block text-brand-accent leading-none"
                    style={{ fontSize: 96 }}
                    aria-hidden
                  >
                    &ldquo;
                  </motion.span>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="italic-serif text-white text-2xl md:text-[28px] leading-[1.4] -mt-4"
                  >
                    {b.quote}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      type: "spring",
                      damping: 14,
                      stiffness: 160,
                      delay: 0.5,
                    }}
                    className="mt-8 text-brand-accent font-bold text-2xl md:text-[36px] leading-[1.1] tracking-[-0.02em]"
                  >
                    {b.proof}
                  </motion.div>
                </div>

                {/* RIGHT — illustration (28%) */}
                <div className="lg:col-span-3 flex justify-center lg:justify-end w-full">
                  <Illustration />
                </div>
              </motion.article>

              <Divider delay={0.1} />
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
