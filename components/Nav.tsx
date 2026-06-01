"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";

const NAV_LINKS = [
  { label: "How It Works", href: "#how" },
  { label: "Proof", href: "#problem" },
  { label: "Book a Call", href: "#discovery-call" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [hoverKey, setHoverKey] = useState<string | null>(null);

  const pillRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const bubbleLeft = useMotionValue(0);
  const bubbleWidth = useMotionValue(0);
  const bubbleOpacity = useMotionValue(0);

  const springLeft = useSpring(bubbleLeft, { stiffness: 320, damping: 28 });
  const springWidth = useSpring(bubbleWidth, { stiffness: 320, damping: 28 });

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 50));

  const moveTo = useCallback((key: string) => {
    const anchor = linkRefs.current[key];
    const pill = pillRef.current;
    if (!anchor || !pill) return;
    const aRect = anchor.getBoundingClientRect();
    const pRect = pill.getBoundingClientRect();
    const left = aRect.left - pRect.left;
    const width = aRect.width;
    animate(bubbleLeft, left, { type: "spring", stiffness: 320, damping: 28 });
    animate(bubbleWidth, width, { type: "spring", stiffness: 320, damping: 28 });
    animate(bubbleOpacity, 1, { duration: 0.15 });
  }, [bubbleLeft, bubbleWidth, bubbleOpacity]);

  const hide = useCallback(() => {
    if (!activeKey) {
      animate(bubbleOpacity, 0, { duration: 0.2 });
    } else {
      moveTo(activeKey);
    }
  }, [activeKey, bubbleOpacity, moveTo]);

  useEffect(() => {
    if (activeKey) moveTo(activeKey);
  }, [activeKey, moveTo]);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <motion.div
          animate={scrolled ? {
            margin: "12px auto",
            maxWidth: 860,
            borderRadius: 100,
            backdropFilter: "blur(20px)",
            backgroundColor: "rgba(5,10,6,0.85)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
            paddingLeft: 20,
            paddingRight: 20,
          } : {
            margin: "0 auto",
            maxWidth: 1400,
            borderRadius: 0,
            backdropFilter: "none",
            backgroundColor: "transparent",
            border: "1px solid transparent",
            boxShadow: "none",
            paddingLeft: 40,
            paddingRight: 40,
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, paddingBottom: 14 }}
        >
          {/* Logo */}
          <a href="#top" aria-label="Bokle AI home" className="shrink-0">
            <img src="/logo.svg" alt="Bokle AI" className="h-9 w-auto" />
          </a>

          {/* Centre pill — desktop */}
          <div
            ref={pillRef}
            onMouseLeave={hide}
            className="hidden lg:flex items-center gap-1 relative rounded-full px-2 py-1.5"
            style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
          >
            {/* Liquid bubble */}
            <motion.div
              aria-hidden
              style={{
                position: "absolute",
                top: 4,
                bottom: 4,
                left: springLeft,
                width: springWidth,
                opacity: bubbleOpacity,
                borderRadius: 100,
                background: "radial-gradient(ellipse at 50% 30%, rgba(0,198,15,1) 0%, rgba(0,198,15,0.85) 100%)",
                boxShadow: "0 0 18px rgba(0,198,15,0.7), inset 0 1px 0 rgba(255,255,255,0.35)",
                pointerEvents: "none",
              }}
            />

            {NAV_LINKS.map((l) => {
              const isActive = activeKey === l.label || hoverKey === l.label;
              return (
                <a
                  key={l.label}
                  ref={(el) => { linkRefs.current[l.label] = el; }}
                  href={l.href}
                  onMouseEnter={() => { setHoverKey(l.label); moveTo(l.label); }}
                  onMouseLeave={() => { setHoverKey(null); hide(); }}
                  onClick={() => setActiveKey(l.label)}
                  className="relative z-10 px-4 py-1.5 text-sm font-medium transition-colors duration-150 select-none"
                  style={{
                    color: isActive ? "#050A06" : "rgba(255,255,255,0.75)",
                    borderRadius: 100,
                    whiteSpace: "nowrap",
                  }}
                >
                  {l.label}
                </a>
              );
            })}
          </div>

          {/* CTA + mobile hamburger */}
          <div className="flex items-center gap-3">
            <motion.a
              href="#discovery-call"
              whileHover={{ scale: 1.03, boxShadow: "0 0 28px rgba(0,198,15,0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-brand-accent text-bg-primary px-5 py-2.5 text-sm font-semibold transition-shadow"
            >
              Book a Discovery Call <ArrowRight className="h-4 w-4" />
            </motion.a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-bg-primary/98 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <img src="/logo.svg" alt="Bokle AI" className="h-8 w-auto" />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
              className="flex flex-col gap-2 px-8 mt-10"
            >
              {NAV_LINKS.map((l) => (
                <motion.li
                  key={l.label}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 text-4xl text-white font-medium border-b border-white/10"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="mt-8"
              >
                <a
                  href="#discovery-call"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center items-center gap-2 rounded-full bg-brand-accent text-bg-primary px-5 py-4 text-base font-semibold"
                >
                  Book a Discovery Call <ArrowRight className="h-4 w-4" />
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
