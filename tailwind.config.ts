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
        // D2P Foods Design Token System
        bone: "#F7F3EA",    // Primary background
        char: "#1B1714",    // Headlines, nav, primary text
        ember: "#D62828",   // The one accent — CTAs, prices, active states
        ash: "#E7E1D3",     // Card surfaces, dividers, hover states
        smoke: "#6E6557",   // Secondary/muted text, captions
        charcoal: "#2A2521", // Footer, dark sections, overlays
      },
      fontFamily: {
        display: ["Anton", "sans-serif"],    // H1, H2, CTA labels
        body: ["Work Sans", "sans-serif"],   // Body text
        mono: ["IBM Plex Mono", "monospace"], // Prices, order numbers
      },
      clipPath: {
        card: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)",
        "card-lg": "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)",
        "card-xl": "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
