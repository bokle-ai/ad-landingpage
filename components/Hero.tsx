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
import Headline from "./Headline";

/* ── Types ── */
const STATES = ["whatsapp", "voice", "webchat"] as const;
type PhoneState = (typeof STATES)[number];

const STATE_LABELS: Record<PhoneState, string> = {
  whatsapp: "WhatsApp",
  voice: "Voice Call",
  webchat: "Web Chat",
};

/* ================================================================ */
/*  Hero                                                             */
/* ================================================================ */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-bg-primary pb-20 pt-36 md:pb-24 md:pt-40"
    >
      {/* Single soft wash — no neon, no sparkles */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 78% 18%, rgba(0,198,15,0.06), transparent 60%)",
        }}
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
              className="mt-7 max-w-5xl text-[clamp(2.4rem,6vw,4.75rem)] font-bold leading-[0.98] tracking-[-0.04em] text-white"
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
                ? "bg-brand-accent text-bg-primary"
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
        {/* Ambient glow — subtle */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[420px] w-[280px] -translate-x-1/2 -translate-y-1/3"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(0,198,15,0.10) 0%, transparent 65%)",
            filter: "blur(56px)",
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

              {/* Screen content — crossfade (sync so the next screen
                  mounts immediately; both are absolutely positioned) */}
              <AnimatePresence initial={false}>
                <motion.div
                  key={activeState}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
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
      style={{ background: "#EFEAE2", paddingTop: 46 }}
    >
      {/* Real WhatsApp header (light mode) */}
      <div
        className="flex items-center gap-2.5 px-2.5 py-2"
        style={{ background: "#075E54" }}
      >
        {/* Back arrow */}
        <svg width="11" height="18" viewBox="0 0 10 16" fill="none" aria-hidden>
          <path d="M9 1L1 8L9 15" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* Avatar */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#cfd8dc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden>
            <circle cx="18" cy="14" r="6" fill="#9aa7ad" />
            <path d="M6 32c0-6.6 5.4-11 12-11s12 4.4 12 11" fill="#9aa7ad" />
          </svg>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 13.5, fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>
            Lotus Dental Clinic
          </p>
          <p style={{ fontSize: 10.5, color: "rgba(255,255,255,0.7)", marginTop: 1 }}>
            online
          </p>
        </div>

        {/* Video, call, more */}
        <div style={{ display: "flex", gap: 16, color: "#fff", paddingRight: 2 }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6a1 1 0 0 0-1 .2l-2.2 2.2a15 15 0 0 1-6.6-6.6l2.2-2.2a1 1 0 0 0 .2-1C8.7 6.5 8.5 5.3 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1 17 17 0 0 0 17 17 1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1Z" />
          </svg>
        </div>
      </div>

      {/* Chat area — real WhatsApp beige wallpaper */}
      <div
        className="flex-1 overflow-hidden px-2.5 py-3"
        style={{
          background:
            "#EFEAE2 url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cg fill='%23d9cfc0' fill-opacity='0.35'%3E%3Ccircle cx='6' cy='6' r='1'/%3E%3Ccircle cx='26' cy='18' r='1'/%3E%3Ccircle cx='14' cy='30' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {/* Incoming — customer (white bubble, left) */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.28 }}
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              <div
                style={{
                  maxWidth: "82%",
                  background: "#fff",
                  borderRadius: "0 8px 8px 8px",
                  padding: "6px 9px 5px",
                  boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)",
                }}
              >
                <p style={{ margin: 0, fontSize: 12.5, color: "#111b21", lineHeight: 1.4 }}>
                  Hi, I run a dental clinic and we&apos;re losing leads every night after 7pm. Saw your ad.
                </p>
                <p style={{ fontSize: 10, color: "#667781", marginTop: 2, textAlign: "right" }}>09:41</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Typing indicator (outgoing side) */}
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
                  background: "#DCF8C6",
                  borderRadius: "8px 0 8px 8px",
                  padding: "8px 11px",
                  boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)",
                }}
              >
                <TypingDots />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Outgoing — business reply (green bubble, right) */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div
                style={{
                  maxWidth: "84%",
                  background: "#DCF8C6",
                  borderRadius: "8px 0 8px 8px",
                  padding: "6px 9px 5px",
                  boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)",
                }}
              >
                <p style={{ margin: 0, fontSize: 12.5, color: "#111b21", lineHeight: 1.4 }}>
                  That&apos;s exactly what we fix. Most dental clinics recover 40–60% of those leads — we can have your WhatsApp agent live in 48 hours. What times are you missing the most calls?
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 3, marginTop: 2 }}>
                  <p style={{ fontSize: 10, color: "#667781" }}>09:41</p>
                  {/* Blue double tick — read */}
                  <svg width="15" height="9" viewBox="0 0 15 9" fill="none" aria-hidden>
                    <path d="M1 4.5L3.6 7L8.4 1.5" stroke="#53BDEB" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 4.5L8.6 7L13.4 1.5" stroke="#53BDEB" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Real WhatsApp input bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "7px 8px",
          background: "#F0F0F0",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 7,
            background: "#fff",
            borderRadius: 22,
            padding: "7px 12px",
          }}
        >
          {/* emoji */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8696a0" strokeWidth="1.8" aria-hidden>
            <circle cx="12" cy="12" r="9" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" strokeLinecap="round" />
            <line x1="9" y1="9" x2="9.01" y2="9" strokeLinecap="round" />
            <line x1="15" y1="9" x2="15.01" y2="9" strokeLinecap="round" />
          </svg>
          <span style={{ flex: 1, fontSize: 12, color: "#8696a0" }}>Message</span>
          {/* attach */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8696a0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </svg>
        </div>
        {/* Send/mic */}
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "#00A884",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="15" height="17" viewBox="0 0 12 14" fill="none" aria-hidden>
            <rect x="3.5" y="0.5" width="5" height="7.5" rx="2.5" fill="#fff" />
            <path d="M1 7C1 9.76 3.24 12 6 12C8.76 12 11 9.76 11 7" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="6" y1="12" x2="6" y2="13.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
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

  useEffect(() => {
    const clockId = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(clockId);
  }, []);

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  return (
    <div
      className="flex h-full flex-col"
      style={{
        paddingTop: 56,
        background: "linear-gradient(170deg, #1f3a36 0%, #122421 45%, #0b141a 100%)",
      }}
    >
      {/* Top: encrypted + status */}
      <div style={{ padding: "8px 20px 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 30 }}>
          <svg width="10" height="12" viewBox="0 0 24 24" fill="rgba(255,255,255,0.45)" aria-hidden>
            <path d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5Zm3 8H9V6a3 3 0 0 1 6 0Z" />
          </svg>
          <span style={{ fontSize: 10.5, color: "rgba(255,255,255,0.45)" }}>
            End-to-end encrypted
          </span>
        </div>

        {/* Caller avatar */}
        <div style={{ position: "relative", marginBottom: 18 }}>
          {[1, 2].map((ring) => (
            <motion.div
              key={ring}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 96 + ring * 26,
                height: 96 + ring * 26,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
              animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.05, 0.4] }}
              transition={{ duration: 3, delay: ring * 0.8, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              background: "#cfd8dc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 10,
              overflow: "hidden",
            }}
          >
            <svg width="96" height="96" viewBox="0 0 36 36" aria-hidden>
              <circle cx="18" cy="14" r="6" fill="#9aa7ad" />
              <path d="M6 32c0-6.6 5.4-11 12-11s12 4.4 12 11" fill="#9aa7ad" />
            </svg>
          </div>
        </div>

        {/* Name + timer */}
        <p style={{ fontSize: 21, fontWeight: 600, color: "#fff", marginBottom: 6 }}>
          Lotus Dental Clinic
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 26 }}>
          {/* live audio dots */}
          <div style={{ display: "flex", alignItems: "center", gap: 2, height: 12 }}>
            {[10, 7, 12, 6, 9].map((h, i) => (
              <motion.span
                key={i}
                style={{ width: 2, borderRadius: 2, background: "rgba(255,255,255,0.6)" }}
                animate={{ height: [`${h * 0.4}px`, `${h}px`, `${h * 0.4}px`] }}
                transition={{ duration: 0.7 + i * 0.08, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>
          <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
            {mm}:{ss}
          </p>
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Call controls — WhatsApp style: speaker, video, mute, end */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "16px 24px 30px",
        }}
      >
        {[
          { key: "speaker", path: (<><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></>) },
          { key: "video", path: (<><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></>) },
          { key: "mute", path: (<><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4" /></>) },
        ].map((b) => (
          <div
            key={b.key}
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              {b.path}
            </svg>
          </div>
        ))}

        {/* End call */}
        <motion.button
          whileTap={{ scale: 0.93 }}
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "#EA4335",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
          }}
        >
          <PhoneOff className="h-5 w-5 text-white" />
        </motion.button>
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

  const ACCENT = "#4F46E5"; // indigo — neutral website-widget accent

  return (
    <div
      className="flex h-full flex-col"
      style={{ paddingTop: 44, background: "#F4F5F7" }}
    >
      {/* Widget header — clean dark bar like a real site chat */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "11px 14px",
          background: "#111827",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: ACCENT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>L</span>
        </div>

        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 12.5, fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>
            Lotus Dental Clinic
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", display: "block" }} />
            <span style={{ fontSize: 9.5, color: "rgba(255,255,255,0.6)" }}>Typically replies instantly</span>
          </div>
        </div>

        {/* Close */}
        <button style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1, background: "none", border: "none", cursor: "pointer", padding: 2 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
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
          gap: 9,
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
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: "#fff" }}>L</span>
              </div>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "14px 14px 14px 4px",
                  padding: "8px 11px",
                  maxWidth: "82%",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                <p style={{ margin: 0, fontSize: 11.5, color: "#1F2937", lineHeight: 1.5 }}>
                  Hi! 👋 Looking into AI automation for your business?
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
                  background: ACCENT,
                  borderRadius: "14px 14px 4px 14px",
                  padding: "8px 11px",
                  maxWidth: "80%",
                }}
              >
                <p style={{ margin: 0, fontSize: 11.5, color: "#fff", lineHeight: 1.5 }}>
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
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: "#fff" }}>L</span>
              </div>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "14px 14px 14px 4px",
                  padding: "8px 11px",
                  maxWidth: "82%",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                <p style={{ margin: 0, fontSize: 11.5, color: "#1F2937", lineHeight: 1.5 }}>
                  We handle that a lot — agents for clinics go live in under 48 hours. Which channel do you miss most?
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
              style={{ display: "flex", flexWrap: "wrap", gap: 6, paddingLeft: 31 }}
            >
              {["WhatsApp", "Phone calls", "Website chat", "All channels"].map((chip) => (
                <button
                  key={chip}
                  style={{
                    border: `1px solid ${ACCENT}`,
                    color: ACCENT,
                    background: "#fff",
                    borderRadius: 100,
                    padding: "5px 10px",
                    fontSize: 9.5,
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
          background: "#fff",
          borderTop: "1px solid #ECECEC",
        }}
      >
        <div
          style={{
            flex: 1,
            fontSize: 11,
            color: "#9CA3AF",
          }}
        >
          Type your message…
        </div>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: ACCENT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </div>
      </div>

      {/* Powered-by strip — like real widgets */}
      <div style={{ background: "#fff", textAlign: "center", paddingBottom: 8 }}>
        <span style={{ fontSize: 8.5, color: "#B6BBC4", letterSpacing: "0.02em" }}>
          Powered by Bokle AI
        </span>
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
            background: "#8696a0",
            display: "block",
          }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.65, delay: i * 0.14, repeat: Infinity }}
        />
      ))}
    </div>
  );
}
