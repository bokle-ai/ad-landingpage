"use client";

import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, Twitter } from "lucide-react";

const SITEMAP = [
  { label: "How It Works", href: "#how" },
  { label: "Solutions", href: "#solutions" },
  { label: "Why Bokle", href: "#why" },
  { label: "Process", href: "#discovery-call" },
  { label: "Book a Call", href: "#discovery-call" },
];

export default function Footer() {
  return (
    <footer className="relative bg-bg-primary pt-20 pb-8 border-t border-white/5">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <div className="flex items-center">
              <img src="/logo.svg" alt="Bokle AI" className="h-10 w-auto" />
            </div>
            <p className="mt-6 italic-serif text-cream text-2xl leading-[1.15] max-w-sm">
              AI agents for businesses that never want to miss a lead.
            </p>
          </div>

          <div>
            <div className="section-label mb-6">Sitemap</div>
            <ul className="space-y-3">
              {SITEMAP.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-white/90 hover:text-brand-accent transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="section-label mb-6">Contact</div>
            <a
              href="mailto:hello@bokle.ai"
              className="text-white/90 hover:text-brand-accent transition-colors text-lg"
            >
              hello@bokle.ai
            </a>
            <div className="mt-8 flex items-center gap-3">
              {[
                { Icon: Mail, href: "mailto:hello@bokle.ai", label: "Email" },
                { Icon: Linkedin, href: "#", label: "LinkedIn" },
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Twitter, href: "#", label: "Twitter" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-10 w-10 rounded-full bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center text-brand-accent hover:bg-brand-accent hover:text-bg-primary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-brand-accent/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs uppercase tracking-[0.22em]">
          <span className="text-body">
            © {new Date().getFullYear()} Bokle AI. All rights reserved.
          </span>
          <span className="text-body">Built in Chennai</span>
        </div>
      </div>
    </footer>
  );
}
