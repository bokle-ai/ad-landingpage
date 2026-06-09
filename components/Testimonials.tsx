"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { sectionReveal, sectionViewport } from "@/lib/motion";
import ResultsTicker from "./testimonials/ResultsTicker";

/* ── Card data ─────────────────────────────────────────────────── */
const CARDS = [
  {
    flag: "🇮🇳",
    photo: "/testimonial-ravi.jpg",
    name: "Ravi M.",
    role: "Dental Chain Owner · Chennai, India",
    quote:
      "We were losing 40-50 leads a week after 7pm. The front desk goes home, enquiries pile up. Bokle set up our WhatsApp agent in 2 days. We now book appointments overnight without anyone on duty.",
    chip: "+60% After-Hours Bookings",
  },
  {
    flag: "🇦🇪",
    photo: "/testimonial-aisha.jpg",
    name: "Aisha K.",
    role: "Practice Manager · Dubai, UAE",
    quote:
      "Every competitor in JLT was already running WhatsApp response. We couldn't afford to be the slow ones. Setup was faster than I expected and the Arabic response quality was genuinely impressive.",
    chip: "Live in 48 Hours",
  },
  {
    flag: "🇺🇸",
    photo: "/testimonial-james.jpg",
    name: "James P.",
    role: "Real Estate Owner · New York, USA",
    quote:
      "Weekend leads were a black hole. By Monday they had toured with someone else. Our Bokle voice agent follows up in 30 seconds — even on Sunday nights. Conversion up 35% in month one.",
    chip: "+35% Lead Conversion",
  },
];

/* ================================================================ */
export default function Testimonials() {
  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      className="relative bg-bg-primary"
    >
      {/* Results ticker — unchanged */}
      <ResultsTicker />

      {/* Testimonial cards */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32">
        <div className="flex flex-col md:flex-row gap-6">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                flex: 1,
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(21, 98, 27, 0.35)",
                borderRadius: 4,
                padding: 28,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Avatar + name row */}
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "1.5px solid rgba(255,255,255,0.15)", position: "relative" }}>
                  <Image
                    src={card.photo}
                    alt={card.name}
                    width={44}
                    height={44}
                    style={{ borderRadius: "50%", objectFit: "cover", objectPosition: "center top" }}
                  />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, color: "#ffffff" }}>
                    {card.name} <span style={{ fontSize: 14 }}>{card.flag}</span>
                  </div>
                </div>
              </div>

              {/* Role */}
              <div
                style={{
                  marginTop: 4,
                  marginBottom: 20,
                  fontSize: 13,
                  color: "rgba(255, 255, 255, 0.4)",
                }}
              >
                {card.role}
              </div>

              {/* Quote — plain paragraph, no italic, no quotation marks */}
              <p
                style={{
                  margin: 0,
                  fontSize: 15,
                  color: "rgba(255, 255, 255, 0.55)",
                  lineHeight: 1.7,
                  flexGrow: 1,
                }}
              >
                {card.quote}
              </p>

              {/* Result — clean editorial metric, no pill, no green */}
              <div
                style={{
                  marginTop: 24,
                  paddingTop: 18,
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "rgba(245,240,232,0.92)",
                    letterSpacing: "0.01em",
                  }}
                >
                  {card.chip}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
