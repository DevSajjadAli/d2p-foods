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
        bone: "#FFFFFF",    // Primary background
        char: "#1C1C1C",    // Headlines, nav, primary text
        ember: "#E23744",   // The one accent — Zomato Red
        ash: "#F8F8F8",     // Card surfaces, dividers, hover states
        smoke: "#696969",   // Secondary/muted text, captions
        charcoal: "#000000", // Footer, dark sections, overlays
      },
      fontFamily: {
        display: ["Work Sans", "sans-serif"],    // Clean UI font
        body: ["Work Sans", "sans-serif"],   // Body text
        mono: ["IBM Plex Mono", "monospace"], // Prices, order numbers
      },
      clipPath: {
        // Using basic rounded corners instead of harsh polygons for a cleaner look
        card: "none",
        "card-lg": "none",
        "card-xl": "none",
      },
    },
  },
  plugins: [],
};

export default config;
