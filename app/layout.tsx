import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

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
    <html lang="en" className={dmSans.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Expanded:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg-primary text-white antialiased">{children}</body>
    </html>
  );
}
