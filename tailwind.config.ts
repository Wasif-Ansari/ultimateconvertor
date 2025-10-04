import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          950: "#0e1335",
          900: "#1b1f4b",
          800: "#1f2d6b",
          700: "#243a8b",
          600: "#2c46a1",
          500: "#4053c8",
          400: "#6675d1",
          300: "#8c97db",
          200: "#b2b8e6",
          100: "#d9daf0",
          50: "#f1f2fb"
        }
      },
      boxShadow: {
        "glow": "0 40px 80px -40px rgba(64, 83, 200, 0.45)"
      }
    }
  },
  plugins: []
};

export default config;
