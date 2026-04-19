import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#050A06",
          alt: "#0A1500",
        },
        cream: "#F5F0E8",
        brand: {
          green: "#15621B",
          accent: "#00C60F",
        },
        body: "rgba(255,255,255,0.55)",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-instrument-serif)", "serif"],
      },
      fontSize: {
        "display": ["clamp(3rem, 9vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(3.5rem, 11vw, 7.5rem)", { lineHeight: "0.92", letterSpacing: "-0.035em" }],
      },
      animation: {
        "pulse-glow": "pulseGlow 2.4s ease-in-out infinite",
        "sparkle-a": "sparkle 5s ease-in-out infinite",
        "sparkle-b": "sparkle 7s ease-in-out infinite 1s",
        "sparkle-c": "sparkle 9s ease-in-out infinite 2s",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 40px 0 rgba(0, 198, 15, 0.25)" },
          "50%": { boxShadow: "0 0 80px 10px rgba(0, 198, 15, 0.45)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.05" },
          "50%": { opacity: "0.25" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
