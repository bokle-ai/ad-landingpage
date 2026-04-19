"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Zap, Check, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import TypingDots from "./TypingDots";

const stats = [
  { icon: Zap, value: "8 seconds", label: "Response time" },
  { icon: Check, value: "Qualified", label: "Lead status" },
  { icon: Calendar, value: "Booking offered", label: "Next action" },
];

export default function PanelWhatsApp() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 700),
      setTimeout(() => setStep(2), 1700),
      setTimeout(() => setStep(3), 3400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
      {/* Phone */}
      <div className="md:col-span-3 flex justify-center">
        <div className="relative w-full max-w-[300px]">
          <div className="rounded-[32px] bg-bg-primary border border-brand-green p-4 shadow-2xl shadow-brand-accent/10">
            <div className="flex items-center justify-between text-[10px] text-body mb-3 px-1">
              <span>WhatsApp</span>
              <span>02:14</span>
            </div>

            <div className="flex flex-col gap-2 min-h-[280px]">
              {/* Incoming */}
              <AnimatePresence>
                {step >= 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="self-start max-w-[85%] rounded-2xl rounded-tl-sm bg-white/5 border border-white/10 px-3 py-2"
                  >
                    <p className="text-[12px] text-cream leading-snug">
                      Hi, I saw your listing and want to know the price
                    </p>
                    <p className="text-[9px] text-body mt-1">02:14</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Typing */}
              <AnimatePresence>
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="self-end rounded-2xl rounded-tr-sm bg-brand-accent/15 border border-brand-accent/40 px-3 py-2.5"
                  >
                    <TypingDots color="#00C60F" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* AI reply */}
              <AnimatePresence>
                {step >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="self-end max-w-[90%] rounded-2xl rounded-tr-sm bg-brand-accent/15 border border-brand-accent/40 px-3 py-2"
                  >
                    <p className="text-[12px] text-cream leading-snug">
                      Hi! Thanks for reaching out. I&apos;m Bokle AI assisting{" "}
                      <span className="text-brand-accent font-medium">
                        [Business]
                      </span>
                      . The price is{" "}
                      <span className="text-brand-accent font-medium">
                        AED 2.2M
                      </span>
                      . Shall I book a viewing for you?
                    </p>
                    <p className="text-[9px] text-brand-accent mt-1 flex items-center gap-1">
                      02:14 ✓✓
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Meta */}
              <AnimatePresence>
                {step >= 3 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[11px] text-brand-accent text-center mt-2"
                  >
                    Replied in 8 seconds
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="md:col-span-2 flex flex-col gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.2 + i * 0.15 }}
            className="border-l border-brand-accent/50 pl-4"
          >
            <div className="flex items-center gap-2 text-brand-accent font-bold text-lg">
              <s.icon className="h-4 w-4" strokeWidth={2} />
              {s.value}
            </div>
            <div className="text-xs text-body mt-1 uppercase tracking-[0.18em]">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
