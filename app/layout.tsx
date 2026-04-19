import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bokle AI — AI Agents for Businesses That Never Miss a Lead",
  description:
    "WhatsApp automation, AI voice agents, and AI website chatbots. Reply instantly across every channel. Book your free discovery call.",
  metadataBase: new URL("https://bokle.ai"),
  openGraph: {
    title: "Bokle AI — Never Miss Another Lead",
    description:
      "AI agents that respond 24/7 across WhatsApp, voice, and chat. Discovery call, not a demo.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${instrumentSerif.variable}`}>
      <body className="bg-bg-primary text-white antialiased">{children}</body>
    </html>
  );
}
