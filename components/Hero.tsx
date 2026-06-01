"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  useEffect,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ArrowRight, ArrowUpRight, PhoneOff } from "lucide-react";
import Image from "next/image";
import Headline from "./Headline";
import SparkleGlyphs from "./SparkleGlyphs";

/* ── Types ── */
const STATES = ["whatsapp", "voice", "webchat"] as const;
type PhoneState = (typeof STATES)[number];

const STATE_LABELS: Record<PhoneState, string> = {
  whatsapp: "WhatsApp",
  voice: "Voice Call",
  webchat: "Web Chat",
};

/* ── Pre-computed waveform bars (avoids hydration mismatch) ── */
const VOICE_BARS = [
  { height: 14, dur: 0.82 },
  { height: 22, dur: 1.05 },
  { height: 32, dur: 0.73 },
  { height: 24, dur: 1.28 },
  { height: 38, dur: 0.91 },
  { height: 28, dur: 0.64 },
  { height: 18, dur: 1.02 },
  { height: 34, dur: 0.77 },
  { height: 26, dur: 1.19 },
  { height: 40, dur: 0.68 },
  { height: 20, dur: 0.94 },
  { height: 30, dur: 1.11 },
  { height: 16, dur: 0.83 },
  { height: 36, dur: 0.61 },
  { height: 24, dur: 0.99 },
];

/* ================================================================ */
/*  Hero                                                             */
/* ================================================================ */
export default function Hero() {
  return (
    <section
      id="top"
      className="grain-overlay relative overflow-hidden bg-bg-primary pb-20 pt-36 md:pb-24 md:pt-40"
    >
      <SparkleGlyphs count={14} />

      {/* Hero background photo */}
      <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        {/* Directional gradient overlay */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(to right, rgba(5,10,6,0.97) 0%, rgba(5,10,6,0.90) 40%, rgba(5,10,6,0.65) 70%, rgba(5,10,6,0.45) 100%)",
          }}
        />
        {/* Mobile: solid overlay */}
        <div
          className="absolute inset-0 md:hidden"
          style={{ background: "rgba(5,10,6,0.93)" }}
        />
      </div>

      {/* Background radial wash */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(0,198,15,0.16),transparent_28%),radial-gradient(circle_at_82%_26%,rgba(245,240,232,0.08),transparent_22%),radial-gradient(circle_at_72%_72%,rgba(0,198,15,0.12),transparent_28%)]"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">

          {/* ── Left column ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <Headline
              as="h1"
              className="mt-7 max-w-5xl text-[clamp(2.8rem,8vw,6.8rem)] font-bold leading-[0.92] tracking-[-0.05em] text-white"
              lines={[
                { text: "Turn ad clicks into" },
                { text: "booked conversations" },
                { text: "before leads go", italic: true },
                { text: "cold.", italic: true },
              ]}
            />

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-body md:text-xl"
            >
              Bokle builds WhatsApp automation, AI chatbots, and voice agents
              that respond in seconds, qualify every enquiry, and move
              high-intent leads to your team with context already attached.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#discovery-call"
                className="btn-pill-primary"
              >
                Book My Free Discovery Call
                <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#how"
                className="btn-ghost"
              >
                See How Bokle Works
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ── Right column — Phone Mockup ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:col-span-5"
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================ */
/*  PhoneMockup — 3D tilt + auto-cycling screen states              */
/* ================================================================ */
function PhoneMockup() {
  const [activeState, setActiveState] = useState<PhoneState>("whatsapp");
  const [stateIndex, setStateIndex] = useState(0);

  /* Pointer-driven spring tilt */
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-9, 9]), {
    stiffness: 80,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), {
    stiffness: 80,
    damping: 18,
  });

  /* Auto-cycle every 4.2 s */
  useEffect(() => {
    const id = setInterval(() => {
      setStateIndex((prev) => {
        const next = (prev + 1) % STATES.length;
        setActiveState(STATES[next]);
        return next;
      });
    }, 4200);
    return () => clearInterval(id);
  }, []);

  function onMove(e: ReactPointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <div className="flex flex-col items-center" style={{ maxWidth: 340 }}>
      {/* State tabs */}
      <div className="mb-6 flex gap-2">
        {STATES.map((s, i) => (
          <button
            key={s}
            onClick={() => {
              setActiveState(s);
              setStateIndex(i);
            }}
            className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-all duration-300 ${
              s === activeState
                ? "bg-brand-accent text-bg-primary shadow-[0_0_14px_rgba(0,198,15,0.5)]"
                : "border border-white/15 text-body hover:border-brand-accent/40 hover:text-white"
            }`}
          >
            {STATE_LABELS[s]}
          </button>
        ))}
      </div>

      {/* 3-D phone wrapper */}
      <div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="relative w-full"
        style={{ perspective: 1400 }}
      >
        {/* Ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[420px] w-[280px] -translate-x-1/2 -translate-y-1/3"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(0,198,15,0.32) 0%, rgba(0,198,15,0.10) 45%, transparent 70%)",
            filter: "blur(48px)",
          }}
        />

        <motion.div
          className="relative mx-auto"
          style={{ width: 280, rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          {/* ── Phone outer frame ── */}
          <div
            style={{
              width: 280,
              height: 580,
              borderRadius: 46,
              background:
                "linear-gradient(160deg, #232325 0%, #111214 55%, #0e0e10 100%)",
              boxShadow: [
                "0 0 0 1.5px rgba(255,255,255,0.11)",
                "0 0 0 3px rgba(255,255,255,0.04)",
                "0 40px 100px rgba(0,0,0,0.75)",
                "0 10px 30px rgba(0,0,0,0.55)",
                "inset 0 1px 0 rgba(255,255,255,0.10)",
                "inset 0 -1px 0 rgba(255,255,255,0.04)",
              ].join(", "),
              position: "relative",
            }}
          >
            {/* Volume buttons (left) */}
            {[110, 162].map((top) => (
              <div
                key={top}
                aria-hidden
                style={{
                  position: "absolute",
                  left: -3,
                  top,
                  width: 3,
                  height: 36,
                  borderRadius: "3px 0 0 3px",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))",
                }}
              />
            ))}
            {/* Power button (right) */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                right: -3,
                top: 148,
                width: 3,
                height: 52,
                borderRadius: "0 3px 3px 0",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))",
              }}
            />

            {/* ── Screen inset ── */}
            <div
              style={{
                position: "absolute",
                inset: 4,
                borderRadius: 43,
                overflow: "hidden",
                background: "#080a08",
              }}
            >
              {/* Dynamic Island */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 104,
                  height: 30,
                  borderRadius: 20,
                  background: "#000",
                  zIndex: 20,
                }}
              />

              {/* Screen content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeState}
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  {activeState === "whatsapp" && <WhatsAppScreen />}
                  {activeState === "voice" && <VoiceScreen />}
                  {activeState === "webchat" && <WebChatScreen />}
                </motion.div>
              </AnimatePresence>

              {/* Home indicator */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  bottom: 8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 112,
                  height: 4,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.22)",
                  zIndex: 20,
                }}
              />
            </div>
          </div>

          {/* 3-D depth shadow */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: "0 24px",
              bottom: -16,
              borderRadius: 40,
              height: "100%",
              background: "rgba(0,0,0,0.35)",
              filter: "blur(28px)",
              transform: "translateZ(-50px) translateY(14px) scaleX(0.90)",
              zIndex: -1,
            }}
          />
        </motion.div>
      </div>

      {/* Response-time status card */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="mt-7 flex items-center gap-3 rounded-2xl border border-white/10 px-5 py-3"
        style={{
          background: "rgba(15,24,15,0.70)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,198,15,0.12)",
        }}
      >
        <motion.span
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="h-2 w-2 rounded-full bg-brand-accent flex-shrink-0"
        />
        <span className="text-sm font-medium text-white">Replying now</span>
        <div className="h-4 w-px bg-white/15" />
        <span className="text-xs text-body">
          Avg. response{" "}
          <span className="font-semibold text-brand-accent">8 sec</span>
        </span>
      </motion.div>

      {/* Progress dots */}
      <div className="mt-5 flex gap-2">
        {STATES.map((s) => (
          <motion.span
            key={s}
            animate={{
              width: s === activeState ? 20 : 6,
              background: s === activeState ? "#00C60F" : "rgba(255,255,255,0.2)",
            }}
            transition={{ duration: 0.35 }}
            className="h-[5px] rounded-full"
            style={{ display: "block" }}
          />
        ))}
      </div>
    </div>
  );
}

/* ================================================================ */
/*  WhatsApp Screen                                                  */
/* ================================================================ */
function WhatsAppScreen() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 600);
    const t2 = setTimeout(() => setStep(2), 1700);
    const t3 = setTimeout(() => setStep(3), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div
      className="flex h-full flex-col"
      style={{ background: "#0b1a0c", paddingTop: 50 }}
    >
      {/* WhatsApp header */}
      <div
        className="flex items-center gap-3 px-3 py-3"
        style={{
          background: "#075E54",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Back arrow */}
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden>
          <path d="M9 1L1 8L9 15" stroke="rgba(255,255,255,0.75)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        {/* Avatar — letter initial */}
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "#128C7E",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 13,
            color: "rgba(255,255,255,0.9)",
            flexShrink: 0,
          }}
        >
          B
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>
            Bokle AI
          </p>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", marginTop: 1 }}>
            Online
          </p>
        </div>

        {/* Video + more */}
        <div style={{ display: "flex", gap: 14, color: "rgba(255,255,255,0.75)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
            <circle cx="12" cy="5" r="1" fill="currentColor" />
            <circle cx="12" cy="12" r="1" fill="currentColor" />
            <circle cx="12" cy="19" r="1" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Chat area — WhatsApp wallpaper tint */}
      <div
        className="flex-1 overflow-hidden px-3 py-4"
        style={{
          background: "rgba(11,26,12,0.95)",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {/* Lead message */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              <div
                style={{
                  maxWidth: "80%",
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: "14px 14px 14px 4px",
                  padding: "8px 10px",
                }}
              >
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.88)", lineHeight: 1.55 }}>
                  Hi, I run a dental clinic and we&apos;re losing leads every night after 7pm. Saw your ad.
                </p>
                <p style={{ fontSize: 9, color: "rgba(255,255,255,0.32)", marginTop: 3, textAlign: "right" }}>09:41</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div
                style={{
                  background: "#25D366",
                  borderRadius: "14px 14px 4px 14px",
                  padding: "9px 12px",
                }}
              >
                <TypingDots />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI reply */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.32 }}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div
                style={{
                  maxWidth: "82%",
                  background: "#25D366",
                  borderRadius: "14px 14px 4px 14px",
                  padding: "8px 10px",
                }}
              >
                <p style={{ fontSize: 11, color: "#073d0a", lineHeight: 1.55 }}>
                  That&apos;s exactly what we fix. Most dental clinics recover 40–60% of those leads. We can have your WhatsApp agent live in 48 hours. What times are you missing the most calls?
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 3, marginTop: 3 }}>
                  <p style={{ fontSize: 9, color: "rgba(7,61,10,0.5)" }}>09:41</p>
                  {/* Double tick SVG */}
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden>
                    <path d="M1 4L3.5 6.5L8 1.5" stroke="rgba(7,61,10,0.55)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 4L7.5 6.5L12 1.5" stroke="rgba(7,61,10,0.55)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Response time badge */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  background: "rgba(0,198,15,0.12)",
                  border: "1px solid rgba(0,198,15,0.35)",
                  borderRadius: 100,
                  padding: "4px 10px",
                }}
              >
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  style={{ width: 5, height: 5, borderRadius: "50%", background: "#00C60F", flexShrink: 0, display: "block" }}
                />
                <span style={{ fontSize: 9, fontWeight: 700, color: "#00C60F", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Replied in 8 seconds
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 12px",
          background: "#111b11",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.07)",
            borderRadius: 22,
            padding: "7px 14px",
            fontSize: 10,
            color: "rgba(255,255,255,0.22)",
          }}
        >
          Type a message
        </div>
        {/* Mic icon */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#25D366",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden>
            <rect x="3.5" y="0.5" width="5" height="7" rx="2.5" fill="#073d0a"/>
            <path d="M1 7C1 9.76 3.24 12 6 12C8.76 12 11 9.76 11 7" stroke="#073d0a" strokeWidth="1.4" strokeLinecap="round"/>
            <line x1="6" y1="12" x2="6" y2="13.5" stroke="#073d0a" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ================================================================ */
/*  Voice Screen — iOS-style call UI                                 */
/* ================================================================ */
function VoiceScreen() {
  const [secs, setSecs] = useState(0);
  const [transcriptStep, setTranscriptStep] = useState(0);

  useEffect(() => {
    const clockId = setInterval(() => setSecs((s) => s + 1), 1000);
    const t1 = setTimeout(() => setTranscriptStep(1), 900);
    const t2 = setTimeout(() => setTranscriptStep(2), 2200);
    return () => {
      clearInterval(clockId);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  return (
    <div
      className="flex h-full flex-col"
      style={{
        paddingTop: 60,
        background: "linear-gradient(175deg, #071409 0%, #0a1a0b 45%, #050a06 100%)",
      }}
    >
      {/* Status bar area */}
      <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            background: "rgba(0,198,15,0.12)",
            border: "1px solid rgba(0,198,15,0.28)",
            borderRadius: 100,
            padding: "4px 10px",
            marginBottom: 20,
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
            style={{ width: 5, height: 5, borderRadius: "50%", background: "#00C60F", display: "block" }}
          />
          <span style={{ fontSize: 9, fontWeight: 700, color: "#00C60F", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            AI Voice Call · Live
          </span>
        </motion.div>

        {/* Caller avatar — text initials, no emoji */}
        <div style={{ position: "relative", marginBottom: 14 }}>
          {/* Pulse rings */}
          {[1, 2].map((ring) => (
            <motion.div
              key={ring}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 60 + ring * 24,
                height: 60 + ring * 24,
                borderRadius: "50%",
                border: "1px solid rgba(0,198,15,0.22)",
              }}
              animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.05, 0.5] }}
              transition={{
                duration: 2.8,
                delay: ring * 0.7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Avatar */}
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              background: "linear-gradient(145deg, #1a3d1d, #0d2110)",
              border: "2px solid rgba(0,198,15,0.4)",
              boxShadow: "0 0 24px rgba(0,198,15,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 10,
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 700, color: "#00C60F", letterSpacing: "-0.02em" }}>
              BA
            </span>
          </div>
        </div>

        {/* Name + timer */}
        <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 4 }}>
          Bokle Voice Agent
        </p>
        <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, color: "#00C60F", marginBottom: 18 }}>
          {mm}:{ss}
        </p>

        {/* Waveform */}
        <div style={{ display: "flex", alignItems: "center", gap: 3, height: 36, marginBottom: 18 }}>
          {VOICE_BARS.map((b, i) => (
            <motion.div
              key={i}
              style={{
                width: 2.5,
                borderRadius: 2,
                background: "#00C60F",
                opacity: 0.75,
              }}
              animate={{
                height: [`${b.height * 0.38}px`, `${b.height}px`, `${b.height * 0.38}px`],
              }}
              transition={{
                duration: b.dur,
                delay: i * 0.055,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Live transcript */}
      <div style={{ flex: 1, padding: "0 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        <AnimatePresence>
          {transcriptStep >= 1 && (
            <motion.div
              key="t1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: 10,
                padding: "8px 10px",
              }}
            >
              <p style={{ fontSize: 8, fontWeight: 600, color: "rgba(0,198,15,0.5)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 3 }}>
                AI
              </p>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
                Hi — I&apos;m calling back about your enquiry to Al Noor Clinic. Is this a good time?
              </p>
            </motion.div>
          )}
          {transcriptStep >= 2 && (
            <motion.div
              key="t2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: 10,
                padding: "8px 10px",
                alignSelf: "flex-end",
                maxWidth: "90%",
              }}
            >
              <p style={{ fontSize: 8, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 3, textAlign: "right" }}>
                Caller
              </p>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", lineHeight: 1.5, textAlign: "right" }}>
                Yes, I missed a call earlier — it was about booking a root canal.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Call controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          padding: "16px 20px 24px",
        }}
      >
        {/* Mute */}
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <line x1="1" y1="1" x2="23" y2="23" />
            <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
            <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </div>

        {/* End call */}
        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.93 }}
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "#DC2626",
            boxShadow: "0 0 20px rgba(220,38,38,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
          }}
        >
          <PhoneOff className="h-5 w-5 text-white" />
        </motion.button>

        {/* Speaker */}
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ================================================================ */
/*  Web Chat Screen — clean widget style                             */
/* ================================================================ */
function WebChatScreen() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 400);
    const t2 = setTimeout(() => setStep(2), 1400);
    const t3 = setTimeout(() => setStep(3), 2400);
    const t4 = setTimeout(() => setStep(4), 3300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div
      className="flex h-full flex-col"
      style={{ paddingTop: 50, background: "#060d07" }}
    >
      {/* Widget header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 14px",
          background: "#0c1f0d",
          borderBottom: "1px solid rgba(0,198,15,0.12)",
        }}
      >
        {/* Avatar — letter initial, no emoji */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#15621B",
            border: "1.5px solid rgba(0,198,15,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.88)" }}>B</span>
        </div>

        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>
            Bokle Assistant
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: "50%", background: "#00C60F", display: "block" }}
            />
            <span style={{ fontSize: 9, color: "#00C60F" }}>Online</span>
          </div>
        </div>

        {/* Close */}
        <button style={{ color: "rgba(255,255,255,0.3)", lineHeight: 1, background: "none", border: "none", cursor: "pointer", padding: 2 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          padding: "14px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              key="wc-1"
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: "flex", alignItems: "flex-end", gap: 7 }}
            >
              {/* Small avatar */}
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#15621B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>B</span>
              </div>
              <div
                style={{
                  background: "rgba(0,198,15,0.1)",
                  border: "1px solid rgba(0,198,15,0.2)",
                  borderRadius: "12px 12px 12px 4px",
                  padding: "8px 10px",
                  maxWidth: "82%",
                }}
              >
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.88)", lineHeight: 1.55 }}>
                  Hi! Looking into AI automation for your business?
                </p>
              </div>
            </motion.div>
          )}

          {step >= 2 && (
            <motion.div
              key="wc-2"
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: "12px 12px 4px 12px",
                  padding: "8px 10px",
                  maxWidth: "80%",
                }}
              >
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", lineHeight: 1.55 }}>
                  Yes — we run an aesthetic clinic and lose leads after hours.
                </p>
              </div>
            </motion.div>
          )}

          {step >= 3 && (
            <motion.div
              key="wc-3"
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: "flex", alignItems: "flex-end", gap: 7 }}
            >
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#15621B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>B</span>
              </div>
              <div
                style={{
                  background: "rgba(0,198,15,0.1)",
                  border: "1px solid rgba(0,198,15,0.2)",
                  borderRadius: "12px 12px 12px 4px",
                  padding: "8px 10px",
                  maxWidth: "82%",
                }}
              >
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.88)", lineHeight: 1.55 }}>
                  We handle that a lot — WhatsApp agents for clinics go live in under 48 hours. Which channel do you miss most?
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick-reply chips */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: "flex", flexWrap: "wrap", gap: 5, paddingLeft: 29 }}
            >
              {["WhatsApp", "Phone calls", "Website chat", "All channels"].map((chip) => (
                <button
                  key={chip}
                  style={{
                    border: "1px solid rgba(0,198,15,0.35)",
                    color: "#00C60F",
                    background: "rgba(0,198,15,0.06)",
                    borderRadius: 100,
                    padding: "4px 9px",
                    fontSize: 9,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  {chip}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 12px",
          background: "rgba(0,0,0,0.2)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 22,
            padding: "6px 12px",
            fontSize: 10,
            color: "rgba(255,255,255,0.2)",
          }}
        >
          Reply…
        </div>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #00C60F, #15621B)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── Typing dots ── */
function TypingDots() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 0" }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "rgba(7,61,10,0.55)",
            display: "block",
          }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.65, delay: i * 0.14, repeat: Infinity }}
        />
      ))}
    </div>
  );
}
