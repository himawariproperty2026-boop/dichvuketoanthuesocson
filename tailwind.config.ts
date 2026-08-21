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
        navy: {
          900: "#081E36",
          800: "#0F3A66", // Primary Navy
          700: "#174E85",
          600: "#1E62A4",
          50: "#F0F5FA",
        },
        gold: {
          600: "#B89025",
          500: "#D4AF37", // Primary Gold Accent
          400: "#E5C158",
          100: "#FDF7E7",
          50: "#FFFDF7",
        },
        brand: {
          blue: "#0F3A66",
          gold: "#D4AF37",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
