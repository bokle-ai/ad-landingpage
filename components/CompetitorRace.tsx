"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const ROUNDS = [
  {
    scenario: "Real estate listing enquiry, Saturday morning",
    withoutTime: "23 minutes",
    withoutResult: "Lead went cold",
    withBokleTime: "8 seconds",
    withBokleResult: "Appointment booked",
    withoutPct: 38,
  },
  {
    scenario: "Dental clinic enquiry, 9:30pm",
    withoutTime: "Next morning",
    withoutResult: "Lead toured elsewhere",
    withBokleTime: "12 seconds",
    withBokleResult: "Confirmed booking",
    withoutPct: 42,
  },
  {
    scenario: "E-commerce return request, Sunday afternoon",
    withoutTime: "2 hours",
    withoutResult: "Customer churned",
    withBokleTime: "6 seconds",
    withBokleResult: "Issue resolved",
    withoutPct: 35,
  },
];

type RaceState = "idle" | "racing" | "done";

export default function CompetitorRace() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const [round, setRound] = useState(0);
  const [raceState, setRaceState] = useState<RaceState>("idle");
  const [bokleWidth, setBokleWidth] = useState(0);
  const [withoutWidth, setWithoutWidth] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [allDone, setAllDone] = useState(false);

  function runRound(r: number) {
    const target = ROUNDS[r].withoutPct;
    setBokleWidth(0);
    setWithoutWidth(0);
    setShowResult(false);
    setRaceState("racing");

    // Bokle races to 100% in 1.2s
    const bokleStart = performance.now();
    const bokleDur = 1200;
    function animBokle(now: number) {
      const t = Math.min((now - bokleStart) / bokleDur, 1);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setBokleWidth(Math.round(eased * 100));
      if (t < 1) requestAnimationFrame(animBokle);
    }
    requestAnimationFrame(animBokle);

    // Without Bokle sprints to target% then stalls
    const withoutStart = performance.now();
    const sprintDur = 2800;
    const stallAt = target;
    function animWithout(now: number) {
      const t = Math.min((now - withoutStart) / sprintDur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setWithoutWidth(Math.round(eased * stallAt));
      if (t < 1) requestAnimationFrame(animWithout);
    }
    requestAnimationFrame(animWithout);

    // Show result labels after 1.4s
    setTimeout(() => setShowResult(true), 1400);

    // Advance to next round after 3.5s pause
    setTimeout(() => {
      setRaceState("done");
      if (r < ROUNDS.length - 1) {
        setTimeout(() => {
          setRound(r + 1);
          runRound(r + 1);
        }, 800);
      } else {
        setAllDone(true);
      }
    }, 3500);
  }

  useEffect(() => {
    if (inView && raceState === "idle") {
      setTimeout(() => runRound(0), 400);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  function restart() {
    setAllDone(false);
    setRound(0);
    setRaceState("idle");
    setBokleWidth(0);
    setWithoutWidth(0);
    setShowResult(false);
    setTimeout(() => runRound(0), 200);
  }

  const current = ROUNDS[round];

  return (
    <section
      id="why-bokle"
      className="relative py-24 md:py-40"
      style={{ background: "#0A1500", borderTop: "1px solid rgba(21,98,27,0.2)" }}
      ref={ref}
    >
      <div className="mx-auto max-w-[960px] px-6 md:px-20">

        {/* Label */}
        <p
          className="mb-5 font-medium uppercase text-brand-accent"
          style={{ fontSize: 11, letterSpacing: "0.15em" }}
        >
          — THE DIFFERENCE
        </p>

        {/* Headline */}
        <h2
          className="font-bold text-white mb-4"
          style={{ fontSize: "clamp(1.8rem,4.5vw,3.2rem)", lineHeight: 1.1 }}
        >
          While you&apos;re typing a reply,{" "}
          <span className="italic-serif font-normal text-cream">
            your competitor already booked the lead.
          </span>
        </h2>

        <p className="mb-16 text-base" style={{ color: "rgba(255,255,255,0.45)" }}>
          This plays out across every industry, every day.
        </p>

        {/* Round dots */}
        <div className="flex items-center gap-2 mb-8">
          {ROUNDS.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === round ? 20 : 8,
                height: 8,
                background: i < round
                  ? "rgba(0,198,15,0.5)"
                  : i === round
                    ? "#00C60F"
                    : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
          <span
            className="ml-2 text-xs font-medium uppercase"
            style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em" }}
          >
            Round {round + 1}/{ROUNDS.length}
          </span>
        </div>

        {/* Scenario */}
        <p
          className="mb-10 text-sm italic"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          &ldquo;{current.scenario}&rdquo;
        </p>

        {/* Race rows */}
        <div className="space-y-6">

          {/* WITHOUT BOKLE */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-semibold uppercase tracking-widest px-2 py-1 rounded"
                  style={{ background: "rgba(239,68,68,0.12)", color: "#EF4444" }}
                >
                  Without Bokle
                </span>
                {showResult && (
                  <motion.span
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs"
                    style={{ color: "#EF4444" }}
                  >
                    ✗ {current.withoutResult}
                  </motion.span>
                )}
              </div>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                {showResult ? current.withoutTime : "⏱ Typing…"}
              </span>
            </div>
            <div
              className="w-full rounded-full overflow-hidden"
              style={{ height: 10, background: "rgba(255,255,255,0.06)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ width: `${withoutWidth}%`, background: "rgba(239,68,68,0.7)" }}
              />
            </div>
          </div>

          {/* WITH BOKLE */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-semibold uppercase tracking-widest px-2 py-1 rounded"
                  style={{ background: "rgba(0,198,15,0.12)", color: "#00C60F" }}
                >
                  With Bokle
                </span>
                {showResult && (
                  <motion.span
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs"
                    style={{ color: "#00C60F" }}
                  >
                    ✓ {current.withBokleResult}
                  </motion.span>
                )}
              </div>
              <span className="text-xs font-medium" style={{ color: "#00C60F" }}>
                {showResult ? current.withBokleTime : "⚡ Responding…"}
              </span>
            </div>
            <div
              className="w-full rounded-full overflow-hidden"
              style={{ height: 10, background: "rgba(255,255,255,0.06)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${bokleWidth}%`,
                  background: "linear-gradient(90deg,#00C60F,#15621B)",
                  boxShadow: bokleWidth > 10 ? "0 0 12px rgba(0,198,15,0.5)" : "none",
                }}
              />
            </div>
          </div>
        </div>

        {/* Summary — shows after all 3 rounds */}
        {allDone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 rounded-2xl p-8 text-center"
            style={{ border: "1px solid rgba(0,198,15,0.3)", background: "rgba(0,198,15,0.04)" }}
          >
            <p className="text-white font-semibold text-lg mb-1">
              Bokle won all 3 leads.
            </p>
            <p className="mb-6 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Your competitor didn&apos;t get a single one.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.03, boxShadow: "0 0 28px rgba(0,198,15,0.45)" }}
                whileTap={{ scale: 0.97 }}
                href="#discovery-call"
                className="font-bold text-sm"
                style={{
                  background: "#00C60F",
                  color: "#010801",
                  padding: "12px 28px",
                  borderRadius: 100,
                  display: "inline-block",
                }}
              >
                Stop Losing Leads →
              </motion.a>
              <button
                onClick={restart}
                className="text-sm"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                ↺ Watch again
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
