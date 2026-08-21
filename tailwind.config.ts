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
        brand: {
          red: "#D7181F",
          redHover: "#B81117",
          navy: "#04266F",
          navyDark: "#021233",
          navyLight: "#124DB3",
          pastelPink: "#FAD7D8",
          pastelBlue: "#EBF2FB",
          textDark: "#131313",
        },
      },
    },
  },
  plugins: [],
};

export default config;
