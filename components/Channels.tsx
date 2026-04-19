"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { sectionReveal, sectionViewport } from "@/lib/motion";
import Headline from "./Headline";
import SectionLabel from "./SectionLabel";

const CHANNELS = [
  {
    num: "01",
    title: "WhatsApp Automation",
    desc: "Qualify, book, and follow up inside the app 2B+ people already use.",
  },
  {
    num: "02",
    title: "AI Voice Agents",
    desc: "Natural, human-sounding calls that pick up every ring — day or night.",
  },
  {
    num: "03",
    title: "AI Website Chatbots",
    desc: "Turn passive traffic into booked conversations the moment they land.",
  },
];

export default function Channels() {
  return (
    <motion.section
      id="solutions"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      className="relative bg-bg-alt py-24 md:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel className="mb-8">— 04 / Solutions</SectionLabel>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-6">
            <Headline
              as="h2"
              className="text-[12vw] md:text-[8vw] lg:text-[6vw] font-bold leading-[0.92] tracking-[-0.035em] text-white"
              lines={[
                { text: "Reply instantly" },
                { text: "across every channel.", italic: true },
              ]}
            />
            <p className="mt-8 text-lg text-body max-w-md leading-relaxed">
              One system. Three channels. Every enquiry answered before your
              competitors have finished their coffee.
            </p>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#discovery-call"
              className="btn-pill-primary mt-10"
            >
              Let&apos;s Find Your Leaks <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>

          <div className="lg:col-span-6">
            <ul className="divide-y divide-brand-accent/20 border-y border-brand-accent/20">
              {CHANNELS.map((ch, i) => (
                <motion.li
                  key={ch.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group flex items-center gap-6 py-8 cursor-pointer"
                >
                  <span className="text-5xl md:text-6xl font-bold text-brand-accent tracking-tighter w-20 shrink-0">
                    {ch.num}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-medium text-white tracking-tight">
                      {ch.title}
                    </h3>
                    <p className="mt-1 text-body text-sm md:text-base">
                      {ch.desc}
                    </p>
                  </div>
                  <motion.span
                    className="shrink-0 h-10 w-10 rounded-full border border-white/15 flex items-center justify-center text-white group-hover:border-brand-accent group-hover:text-brand-accent transition-colors"
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
