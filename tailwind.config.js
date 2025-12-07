/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        // 1. BRAND COLORS
        primary: "#f472b6", // Soft Barbie Pink
        secondary: "#fbcfe8", // Pastel Cotton Candy
        dark: "#be185d", // Medium Raspberry

        // 2. THEME BALANCING (Pastel Light Mode)
        slate: {
          950: "#fff0f5", // Main BG -> Lavender Blush
          900: "#fff1f2", // Alt BG  -> Rose 50
          800: "#ffffff", // Cards   -> Pure White
          700: "#fce7f3", // Borders -> Pink 100

          // Text Colors
          600: "#db2777", // Pink 600
          500: "#db2777", // Pink 600
          400: "#be185d", // Pink 700 (Body text)
          300: "#be185d", // Pink 700 (Questions)
          200: "#9d174d", // Pink 800
          100: "#831843",
          50: "#ffffff",
        },

        // 3. TEXT VISIBILITY
        white: "#831843", // Deep Raspberry (for Headings)

        // 4. ACCENT & VISIBILITY FIXES
        indigo: {
          // FIX: Changed from Light Pink (#f9a8d4) to Deep Raspberry (#be185d)
          // This makes "Creative Engineer" and Project Tags visible.
          300: "#be185d",

          400: "#f472b6",
          500: "#ec4899",
          600: "#ff80bf", // "Contact Me" Button
          700: "#be185d", // Hover state
        },
        purple: {
          400: "#e879f9", // Soft Lilac
          500: "#d946ef", // Fuchsia
          600: "#c026d3",
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
