"use client";

import { motion } from "framer-motion";
import { sectionLabel } from "@/lib/motion";

export default function SectionLabel({
  children,
  className = "",
  align = "left",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      variants={sectionLabel}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6, margin: "0px 0px -100px 0px" }}
      className={`section-label ${align === "center" ? "text-center" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
