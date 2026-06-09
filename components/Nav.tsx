"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 50));

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? "rgba(5,10,6,0.85)" : "rgba(5,10,6,0.55)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" aria-label="Bokle AI home">
          <img src="/logo.svg" alt="Bokle AI" style={{ height: 36, width: "auto" }} />
        </a>

        <motion.a
          href="#discovery-call"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            borderRadius: 9999,
            background: "#00C60F",
            color: "#010801",
            fontWeight: 700,
            fontSize: 14,
            padding: "12px 24px",
          }}
        >
          Book Your Discovery Call
          <ArrowRight className="h-4 w-4" />
        </motion.a>
      </div>
    </nav>
  );
}
