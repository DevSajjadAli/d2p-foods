import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Zomato Inspired Design Token System
        primary: "#E23744",   // The one accent — Zomato Red (same as ember)
        ink: "#1C1C1C",       // Headings, item names (same as char)
        muted: "#696B79",     // Descriptions, timestamps
        success: "#267E3E",   // "Open" status, delivery confirmation
        surface: "#FFFFFF",   // Card backgrounds
        bg: "#F7F7F8",        // Page background
        // Keep old tokens for backwards compatibility if needed during transition
        bone: "#FFFFFF",
        char: "#1C1C1C",
        ember: "#E23744",
        ash: "#F8F8F8",
        smoke: "#696969",
        charcoal: "#000000",
      },
      fontFamily: {
        sans: ["var(--font-body)", "Manrope", "Inter", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "Manrope", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "IBM Plex Mono", "monospace"],
      },
      borderRadius: {
        'card': '14px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.06)',
      },
      clipPath: {
        card: "none",
        "card-lg": "none",
        "card-xl": "none",
      },
    },
  },
  plugins: [],
};

export default config;
