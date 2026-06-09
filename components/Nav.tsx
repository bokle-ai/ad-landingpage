"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

const LINKS = [
  { label: "Why Bokle", href: "#problem" },
  { label: "Industries", href: "#industries" },
  { label: "How it works", href: "#how" },
  { label: "Reviews", href: "#reviews" },
];

/* Hover-following pill nav (21st.dev / Hover.dev style), adapted to the
   dark brand: a white highlight slides to the hovered link and the text
   inverts over it via mix-blend-difference. */
function PillNav() {
  const [pos, setPos] = useState({ left: 0, width: 0, opacity: 0 });

  return (
    <ul
      onMouseLeave={() => setPos((p) => ({ ...p, opacity: 0 }))}
      className="relative hidden w-fit items-center md:flex"
      style={{
        borderRadius: 9999,
        padding: 5,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      {LINKS.map((l) => (
        <PillTab key={l.href} href={l.href} setPos={setPos}>
          {l.label}
        </PillTab>
      ))}
      <motion.li
        animate={pos}
        transition={{ type: "spring", stiffness: 420, damping: 34 }}
        className="absolute z-0"
        style={{ top: 5, height: 34, borderRadius: 9999, background: "#ffffff" }}
      />
    </ul>
  );
}

function PillTab({
  children,
  href,
  setPos,
}: {
  children: React.ReactNode;
  href: string;
  setPos: (p: { left: number; width: number; opacity: number }) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        setPos({
          width: ref.current.getBoundingClientRect().width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10"
    >
      <a
        href={href}
        style={{
          display: "block",
          padding: "8px 16px",
          fontSize: 12.5,
          fontWeight: 600,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: "#ffffff",
          mixBlendMode: "difference",
          textDecoration: "none",
          whiteSpace: "nowrap",
          cursor: "pointer",
        }}
      >
        {children}
      </a>
    </li>
  );
}

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

        <PillNav />

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
