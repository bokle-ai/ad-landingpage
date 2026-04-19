"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";

const LINKS = [
  { label: "How It Works", href: "#how" },
  { label: "Solutions", href: "#solutions" },
  { label: "Why Bokle", href: "#why" },
  { label: "Pricing", href: "#discovery-call" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 50);
  });

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-bg-primary/70 border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center group" aria-label="Bokle AI home">
            <img src="/logo.svg" alt="Bokle AI" className="h-9 w-auto" />
          </a>

          <ul className="hidden lg:flex items-center gap-9">
            {LINKS.map((l) => (
              <li key={l.label}>
                <motion.a
                  href={l.href}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="group relative text-sm text-white/70 hover:text-white transition-colors"
                >
                  {l.label}
                  <motion.span
                    aria-hidden
                    variants={{
                      rest: { scaleX: 0 },
                      hover: { scaleX: 1 },
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-0 -bottom-1 h-px w-full bg-brand-accent origin-left block"
                  />
                </motion.a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <motion.a
              href="#discovery-call"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-brand-accent text-bg-primary px-5 py-2.5 text-sm font-medium hover:shadow-[0_0_30px_rgba(0,198,15,0.55)] transition-shadow"
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
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
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
              variants={{
                visible: { transition: { staggerChildren: 0.07 } },
              }}
              className="flex flex-col gap-2 px-8 mt-10"
            >
              {LINKS.map((l) => (
                <motion.li
                  key={l.label}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 text-5xl text-white font-medium border-b border-white/10"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="mt-8"
              >
                <a
                  href="#discovery-call"
                  onClick={() => setOpen(false)}
                  className="btn-pill-primary w-full justify-center"
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
