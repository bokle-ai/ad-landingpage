"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MessageCircle, Phone, MessagesSquare } from "lucide-react";
import { useState } from "react";
import PanelWhatsApp from "./demo/PanelWhatsApp";
import PanelVoice from "./demo/PanelVoice";
import PanelWebChat from "./demo/PanelWebChat";

type TabKey = "whatsapp" | "voice" | "chat";

const TABS: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { key: "voice", label: "Voice Call", icon: Phone },
  { key: "chat", label: "Website Chat", icon: MessagesSquare },
];

export default function DemoWidget() {
  const [active, setActive] = useState<TabKey>("whatsapp");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mt-24 md:mt-28"
    >
      <div className="section-label text-center mb-6">
        — See It Live / Try the Simulation
      </div>

      <div className="relative max-w-[780px] mx-auto">
        {/* Glow */}
        <div
          aria-hidden
          className="absolute -inset-px rounded-[28px] bg-gradient-to-br from-brand-accent/60 via-brand-green/30 to-brand-accent/30 blur-xl opacity-50 pointer-events-none"
        />
        <div
          className="relative rounded-[28px] p-px bg-gradient-to-br from-brand-accent/60 via-brand-accent/15 to-brand-accent/5"
        >
          <div
            className="rounded-[27px] p-8 md:p-12"
            style={{ background: "#0D1A0E" }}
          >
            <h3 className="text-white font-bold text-xl md:text-2xl tracking-tight text-center max-w-md mx-auto">
              What happens when a lead comes in right now?
            </h3>

            {/* Tabs */}
            <div
              role="tablist"
              aria-label="Channel demo"
              className="mt-8 flex flex-wrap gap-2 justify-center"
            >
              {TABS.map((t) => {
                const isActive = active === t.key;
                return (
                  <motion.button
                    key={t.key}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(t.key)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`inline-flex items-center gap-2 rounded-full px-4 md:px-5 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-brand-green text-white border border-brand-accent/50 shadow-[0_0_30px_rgba(0,198,15,0.35)]"
                        : "bg-transparent text-body border border-white/15 hover:text-white hover:border-white/30"
                    }`}
                  >
                    <t.icon className="h-4 w-4" />
                    {t.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Panel */}
            <div className="mt-10 min-h-[380px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {active === "whatsapp" && <PanelWhatsApp />}
                  {active === "voice" && <PanelVoice />}
                  {active === "chat" && <PanelWebChat />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="mt-10 pt-8 border-t border-white/5 text-center">
              <p className="text-sm text-body max-w-lg mx-auto">
                This is exactly what your leads experience when Bokle AI is
                live on your business.
              </p>
              <motion.a
                href="#discovery-call"
                whileHover={{ x: 4 }}
                className="mt-4 inline-flex items-center gap-1.5 text-brand-accent text-sm font-medium"
              >
                Ready to set this up? <ArrowRight className="h-4 w-4" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
