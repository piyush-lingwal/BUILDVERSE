import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-nunito)", "ui-rounded", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-fredoka)", "ui-rounded", "ui-sans-serif", "system-ui", "sans-serif"],
        script: ["var(--font-pacifico)", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
