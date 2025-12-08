/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        // 1. BRAND COLORS
        primary: "var(--color-primary)",

        // 2. THEME MAPPING
        slate: {
          950: "var(--bg-main)", // Main Background
          900: "var(--bg-alt)", // Secondary Background
          800: "var(--bg-card)", // Cards & Chat Bubbles
          700: "var(--border)", // Borders

          600: "var(--text-muted)",
          500: "var(--text-muted)",
          400: "var(--text-main)", // Body Text
          300: "var(--text-muted)",
          // FIX: Map 200 to Heading color so it is dark/visible in Pink Mode
          200: "var(--text-heading)",
          100: "var(--text-heading)",
        },

        // 3. TEXT VISIBILITY
        white: "var(--text-heading)",

        // 4. ACCENTS
        indigo: {
          300: "var(--color-badge)",
          400: "var(--color-primary)",
          500: "var(--color-primary)",
          600: "var(--color-btn)",
          700: "var(--color-primary)",
        },
      },
      animation: {
        blob: "blob 7s infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
