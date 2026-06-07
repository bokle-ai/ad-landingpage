"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 50));

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-bg-primary/80 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-4 flex items-center justify-between">
        <a href="#top" aria-label="Bokle AI home">
          <img src="/logo.svg" alt="Bokle AI" className="h-9 w-auto" />
        </a>

        <motion.a
          href="#discovery-call"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 rounded-full bg-[#00C60F] hover:bg-[#49CA68] text-[#010801] font-bold px-6 py-3 text-sm transition-colors"
        >
          Book Your Discovery Call
          <ArrowRight className="h-4 w-4" />
        </motion.a>
      </div>
    </motion.nav>
  );
}
