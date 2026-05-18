/** @type {import('tailwindcss').Config} */

export default {

  darkMode: ["class"],

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {

    extend: {

      colors: {

        background: "#070B14",

        surface: "#0F172A",

        card: "rgba(15,23,42,0.72)",

        primary: "#8B5CF6",

        secondary: "#06B6D4",

        border: "rgba(255,255,255,0.08)",

        muted: "#94A3B8",

        success: "#22C55E",

        danger: "#EF4444",
      },

      backdropBlur: {
        xs: "2px",
      },

      boxShadow: {

        glow: `
          0 0 25px rgba(139,92,246,0.25)
        `,

        card: `
          0 10px 30px rgba(0,0,0,0.35)
        `,
      },

      borderRadius: {

        xl: "1rem",

        "2xl": "1.5rem",
      },
    },
  },

  plugins: [],
}