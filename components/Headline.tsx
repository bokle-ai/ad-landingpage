"use client";

import { motion } from "framer-motion";
import { wordsContainer, wordItem } from "@/lib/motion";
import { ReactNode } from "react";

type Line = {
  text: string;
  italic?: boolean;
  className?: string;
};

export default function Headline({
  lines,
  className = "",
  as = "h2",
}: {
  lines: Line[];
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const Tag = motion[as] as any;
  return (
    <Tag
      variants={wordsContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden">
          <span className="inline-flex flex-wrap">
            {line.text.split(" ").map((word, wi) => (
              <motion.span
                key={`${li}-${wi}`}
                variants={wordItem}
                className={`inline-block mr-[0.22em] ${
                  line.italic ? "italic-serif text-cream" : ""
                } ${line.className ?? ""}`}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </span>
      ))}
    </Tag>
  );
}

export function InlineWords({
  text,
  italic,
  className,
}: {
  text: string;
  italic?: boolean;
  className?: string;
}): ReactNode {
  return (
    <motion.span
      variants={wordsContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="inline-flex flex-wrap"
    >
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          variants={wordItem}
          className={`inline-block mr-[0.22em] ${
            italic ? "italic-serif text-cream" : ""
          } ${className ?? ""}`}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
