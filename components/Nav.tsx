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

function PillNav() {
  const [pos, setPos] = useState({ left: 0, width: 0, opacity: 0 });
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  return (
    <ul
      onMouseLeave={() => {
        setPos((p) => ({ ...p, opacity: 0 }));
        setHoveredHref(null);
      }}
      className="relative hidden w-fit items-center md:flex"
      style={{
        borderRadius: 9999,
        padding: 5,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      {LINKS.map((l) => (
        <PillTab
          key={l.href}
          href={l.href}
          setPos={setPos}
          setHovered={setHoveredHref}
          isHovered={hoveredHref === l.href}
        >
          {l.label}
        </PillTab>
      ))}
      {/* Neon green liquid pill that slides under the hovered link */}
      <motion.li
        animate={pos}
        transition={{ type: "spring", stiffness: 420, damping: 34 }}
        className="absolute z-0"
        style={{
          top: 5,
          height: 34,
          borderRadius: 9999,
          background: "#00C60F",
          boxShadow: "0 0 12px rgba(0,198,15,0.45)",
        }}
      />
    </ul>
  );
}

function PillTab({
  children,
  href,
  setPos,
  setHovered,
  isHovered,
}: {
  children: React.ReactNode;
  href: string;
  setPos: (p: { left: number; width: number; opacity: number }) => void;
  setHovered: (href: string | null) => void;
  isHovered: boolean;
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
        setHovered(href);
      }}
      className="relative z-10"
    >
      <a
        href={href}
        style={{
          display: "block",
          padding: "8px 16px",
          fontSize: 12.5,
          fontWeight: 700,
          fontFamily: "var(--font-dm-sans)",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: isHovered ? "#010801" : "#ffffff",
          transition: "color 0.12s ease",
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
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 md:px-10 md:py-4">
        <a href="#top" aria-label="Bokle AI home" style={{ flexShrink: 0 }}>
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
            gap: 6,
            borderRadius: 9999,
            background: "#00C60F",
            color: "#010801",
            fontWeight: 700,
            fontFamily: "var(--font-dm-sans)",
            flexShrink: 0,
          }}
          className="px-4 py-2.5 text-[13px] md:px-6 md:py-3 md:text-[14px]"
        >
          {/* Short label on mobile, full label on desktop */}
          <span className="md:hidden">Book a Call</span>
          <span className="hidden md:inline">Book Your Discovery Call</span>
          <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
        </motion.a>
      </div>
    </nav>
  );
}
