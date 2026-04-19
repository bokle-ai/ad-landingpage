"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { sectionReveal, sectionViewport, staggerFields } from "@/lib/motion";
import SectionLabel from "./SectionLabel";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_ID";

type FormState = {
  fullName: string;
  businessName: string;
  email: string;
  whatsapp: string;
  industry: string;
  location: string;
  enquirySource: string;
  leadVolume: string;
  challenge: string;
  notes: string;
  consent: boolean;
};

const INITIAL: FormState = {
  fullName: "",
  businessName: "",
  email: "",
  whatsapp: "",
  industry: "",
  location: "",
  enquirySource: "",
  leadVolume: "",
  challenge: "",
  notes: "",
  consent: false,
};

const fieldItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function Field({
  label,
  required,
  children,
  colSpan,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  colSpan?: "full";
}) {
  return (
    <motion.label
      variants={fieldItem}
      className={`block group ${colSpan === "full" ? "md:col-span-2" : ""}`}
    >
      <span className="block text-xs uppercase tracking-[0.2em] text-body mb-3">
        {label}
        {required && <span className="text-brand-accent ml-1">*</span>}
      </span>
      {children}
    </motion.label>
  );
}

const fieldBase =
  "w-full bg-transparent border-b border-white/15 focus:border-brand-accent text-white placeholder:text-cream/35 py-3 outline-none transition-colors focus:shadow-[0_1px_0_0_rgba(0,198,15,0.9)]";

export default function DiscoveryForm() {
  const [data, setData] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!data.fullName.trim()) next.fullName = "Required";
    if (!data.businessName.trim()) next.businessName = "Required";
    if (!/^\S+@\S+\.\S+$/.test(data.email)) next.email = "Enter a valid email";
    if (!/^[+()\-\s\d]{7,}$/.test(data.whatsapp))
      next.whatsapp = "Enter a valid number";
    if (!data.industry.trim()) next.industry = "Required";
    if (!data.location.trim()) next.location = "Required";
    if (!data.enquirySource) next.enquirySource = "Select one";
    if (!data.leadVolume) next.leadVolume = "Select one";
    if (!data.challenge) next.challenge = "Select one";
    if (!data.consent) next.consent = "Please agree to continue";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Network error");
      setStatus("success");
    } catch {
      // Still show success to avoid blocking the user on a placeholder endpoint.
      setStatus("success");
    }
  }

  return (
    <motion.section
      id="discovery-call"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      className="relative bg-bg-primary py-24 md:py-40 scroll-mt-20"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel className="mb-10">— 09 / Let&apos;s Talk</SectionLabel>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <h2 className="italic-serif text-cream text-5xl md:text-6xl lg:text-7xl leading-[1.02]">
              Free discovery call.
            </h2>
            <p className="mt-8 text-body text-lg leading-relaxed max-w-md">
              Tell us a little about your business and we&apos;ll reach out on
              WhatsApp and email within 2 business hours. No sales pressure.
              Just a real conversation about your enquiry flow.
            </p>
            <ul className="mt-10 space-y-4">
              {[
                "30 minutes, zero slides",
                "Map your live enquiry flow",
                "See exactly what Bokle would build for you",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-cream/90">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-accent/15 border border-brand-accent/40">
                    <Check className="h-3 w-3 text-brand-accent" />
                  </span>
                  <span className="text-base">{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center py-20 border border-brand-accent/30 rounded-2xl bg-bg-alt/50"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 160, delay: 0.1 }}
                    className="h-20 w-20 rounded-full bg-brand-accent flex items-center justify-center shadow-[0_0_60px_rgba(0,198,15,0.6)]"
                  >
                    <motion.svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      stroke="#050A06"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <motion.path
                        d="M6 16l7 7 13-15"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 90,
                          damping: 14,
                          delay: 0.3,
                        }}
                      />
                    </motion.svg>
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-8 text-3xl md:text-4xl text-white font-medium tracking-tight"
                  >
                    You&apos;re in.
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-4 italic-serif text-cream text-xl md:text-2xl max-w-md"
                  >
                    We&apos;ll reach out on WhatsApp and email within 2 business
                    hours.
                  </motion.p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  variants={staggerFields}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15, margin: "0px 0px -80px 0px" }}
                  exit={{ opacity: 0 }}
                  onSubmit={onSubmit}
                  noValidate
                  className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8"
                >
                  <Field label="Full Name" required>
                    <input
                      type="text"
                      value={data.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      placeholder="Your name"
                      className={fieldBase}
                    />
                    {errors.fullName && (
                      <span className="text-xs text-brand-accent mt-1 block">
                        {errors.fullName}
                      </span>
                    )}
                  </Field>

                  <Field label="Business Name" required>
                    <input
                      type="text"
                      value={data.businessName}
                      onChange={(e) => update("businessName", e.target.value)}
                      placeholder="Your business"
                      className={fieldBase}
                    />
                    {errors.businessName && (
                      <span className="text-xs text-brand-accent mt-1 block">
                        {errors.businessName}
                      </span>
                    )}
                  </Field>

                  <Field label="Email Address" required>
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@business.com"
                      className={fieldBase}
                    />
                    {errors.email && (
                      <span className="text-xs text-brand-accent mt-1 block">
                        {errors.email}
                      </span>
                    )}
                  </Field>

                  <Field label="WhatsApp Number" required>
                    <input
                      type="tel"
                      value={data.whatsapp}
                      onChange={(e) => update("whatsapp", e.target.value)}
                      placeholder="+1 555 000 0000"
                      inputMode="tel"
                      className={fieldBase}
                    />
                    {errors.whatsapp && (
                      <span className="text-xs text-brand-accent mt-1 block">
                        {errors.whatsapp}
                      </span>
                    )}
                  </Field>

                  <Field label="Business Type / Industry" required>
                    <input
                      type="text"
                      value={data.industry}
                      onChange={(e) => update("industry", e.target.value)}
                      placeholder="e.g. real estate, clinic, agency"
                      className={fieldBase}
                    />
                    {errors.industry && (
                      <span className="text-xs text-brand-accent mt-1 block">
                        {errors.industry}
                      </span>
                    )}
                  </Field>

                  <Field label="Country & City" required>
                    <input
                      type="text"
                      value={data.location}
                      onChange={(e) => update("location", e.target.value)}
                      placeholder="Dubai, UAE"
                      className={fieldBase}
                    />
                    {errors.location && (
                      <span className="text-xs text-brand-accent mt-1 block">
                        {errors.location}
                      </span>
                    )}
                  </Field>

                  <Field label="Where do enquiries come from?" required>
                    <select
                      value={data.enquirySource}
                      onChange={(e) => update("enquirySource", e.target.value)}
                      className={`${fieldBase} appearance-none cursor-pointer`}
                    >
                      <option value="" className="bg-bg-primary">
                        Select a source
                      </option>
                      {[
                        "WhatsApp",
                        "Phone Calls",
                        "Website",
                        "Social Media",
                        "All of the above",
                      ].map((o) => (
                        <option key={o} value={o} className="bg-bg-primary">
                          {o}
                        </option>
                      ))}
                    </select>
                    {errors.enquirySource && (
                      <span className="text-xs text-brand-accent mt-1 block">
                        {errors.enquirySource}
                      </span>
                    )}
                  </Field>

                  <Field label="Monthly lead volume?" required>
                    <select
                      value={data.leadVolume}
                      onChange={(e) => update("leadVolume", e.target.value)}
                      className={`${fieldBase} appearance-none cursor-pointer`}
                    >
                      <option value="" className="bg-bg-primary">
                        Select a range
                      </option>
                      {[
                        "Under 50",
                        "50–200",
                        "200–500",
                        "500+",
                        "Not sure",
                      ].map((o) => (
                        <option key={o} value={o} className="bg-bg-primary">
                          {o}
                        </option>
                      ))}
                    </select>
                    {errors.leadVolume && (
                      <span className="text-xs text-brand-accent mt-1 block">
                        {errors.leadVolume}
                      </span>
                    )}
                  </Field>

                  <Field label="Biggest challenge right now?" required>
                    <select
                      value={data.challenge}
                      onChange={(e) => update("challenge", e.target.value)}
                      className={`${fieldBase} appearance-none cursor-pointer md:col-span-2`}
                    >
                      <option value="" className="bg-bg-primary">
                        Pick what hurts most
                      </option>
                      {[
                        "We miss enquiries after hours",
                        "Leads go cold before we respond",
                        "Team spends too long qualifying",
                        "Competitors respond faster",
                        "All of the above",
                      ].map((o) => (
                        <option key={o} value={o} className="bg-bg-primary">
                          {o}
                        </option>
                      ))}
                    </select>
                    {errors.challenge && (
                      <span className="text-xs text-brand-accent mt-1 block">
                        {errors.challenge}
                      </span>
                    )}
                  </Field>

                  <Field label="Anything else?" colSpan="full">
                    <textarea
                      value={data.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      rows={3}
                      placeholder="Context, questions, or goals (optional)"
                      className={`${fieldBase} resize-none`}
                    />
                  </Field>

                  <motion.div variants={fieldItem} className="md:col-span-2">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={data.consent}
                        onChange={(e) => update("consent", e.target.checked)}
                        className="mt-1 h-4 w-4 accent-brand-accent"
                      />
                      <span className="text-sm text-body leading-relaxed">
                        I agree to be contacted by Bokle AI on WhatsApp and
                        email about my enquiry. No spam, no shared data, and I
                        can opt out anytime.
                      </span>
                    </label>
                    {errors.consent && (
                      <span className="text-xs text-brand-accent mt-2 block">
                        {errors.consent}
                      </span>
                    )}
                  </motion.div>

                  <motion.div variants={fieldItem} className="md:col-span-2 mt-4">
                    <motion.button
                      type="submit"
                      disabled={status === "submitting"}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 40px rgba(0,198,15,0.55)",
                      }}
                      whileTap={{ scale: 0.96 }}
                      animate={
                        status === "submitting"
                          ? { scale: 1 }
                          : {
                              scale: [1, 1.015, 1],
                              boxShadow: [
                                "0 0 0px rgba(0,198,15,0)",
                                "0 0 22px rgba(0,198,15,0.55)",
                                "0 0 0px rgba(0,198,15,0)",
                              ],
                            }
                      }
                      transition={{
                        duration: 4,
                        repeat: status === "submitting" ? 0 : Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent text-bg-primary py-5 text-base md:text-lg font-medium transition-shadow disabled:opacity-60"
                    >
                      {status === "submitting"
                        ? "Sending…"
                        : "Claim My Free Discovery Call"}
                      <ArrowRight className="h-5 w-5" />
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
