"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Sparkles } from "lucide-react";
import SparkleGlyphs from "./SparkleGlyphs";
import Waveform from "./Waveform";
import Headline from "./Headline";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen bg-bg-primary pt-40 md:pt-44 pb-20 overflow-hidden"
    >
      <SparkleGlyphs count={22} />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100vh-10rem)]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <span className="label-tag mb-8">
              — 01 / AI Agents for Growing Businesses
            </span>

            <Headline
              as="h1"
              className="mt-6 text-[15vw] md:text-[11vw] lg:text-[7.8vw] font-bold leading-[0.9] tracking-[-0.035em] text-white"
              lines={[
                { text: "Every missed" },
                { text: "enquiry is" },
                { text: "lost" },
                {
                  text: "revenue.",
                  italic: true,
                },
              ]}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-8 italic-serif text-3xl md:text-4xl text-cream"
            >
              They don&apos;t wait. They move on.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="mt-6 max-w-xl text-lg text-body leading-relaxed"
            >
              Bokle AI answers every enquiry across WhatsApp, voice, and web —
              in seconds, at any hour, in every language your customers speak.
              No missed messages. No cold leads. No lost revenue.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#discovery-call"
                className="btn-pill-primary"
              >
                Show Me What I&apos;m Missing <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#how"
                className="btn-ghost"
              >
                Watch how it works <ArrowUpRight className="h-4 w-4" />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            <div className="relative aspect-square w-full max-w-[460px]">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 60px 0 rgba(0, 198, 15, 0.25)",
                    "0 0 120px 15px rgba(0, 198, 15, 0.4)",
                    "0 0 60px 0 rgba(0, 198, 15, 0.25)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-bg-alt border border-brand-accent/50 flex items-center justify-center overflow-hidden"
              >
                <div
                  aria-hidden
                  className="absolute inset-6 rounded-full border border-brand-accent/20"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-10 rounded-full border border-dashed border-brand-accent/15"
                />

                <div className="relative flex flex-col items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="relative h-28 w-28 rounded-full bg-gradient-to-br from-brand-accent to-brand-green flex items-center justify-center shadow-2xl shadow-brand-accent/30"
                  >
                    <Sparkles className="h-10 w-10 text-bg-primary" />
                    <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-brand-accent animate-ping" />
                  </motion.div>
                  <div className="mt-6 italic-serif text-cream text-xl">
                    always on.
                  </div>
                </div>

                <div className="absolute bottom-10 left-0 right-0 flex justify-center">
                  <Waveform bars={18} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute -top-4 -right-2 md:-right-6 bg-bg-primary border border-white/10 rounded-2xl p-4 shadow-2xl"
              >
                <div className="text-4xl font-bold text-brand-accent leading-none">
                  24/7
                </div>
                <div className="text-xs text-body mt-1 uppercase tracking-wider">
                  response time
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="absolute -bottom-2 -left-2 md:-left-8 bg-bg-primary border border-white/10 rounded-2xl px-4 py-3 shadow-2xl"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
                  <span className="text-xs text-cream uppercase tracking-wider">
                    Replying now
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.a
          href="#problem"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-body text-xs uppercase tracking-[0.25em]"
        >
          <span>Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4 text-brand-accent" />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}
