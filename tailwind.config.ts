import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: { twinkle: { "0%,100%": { opacity: "0.55", transform: "scale(0.97)" }, "50%": { opacity: "1", transform: "scale(1.03)" } } },
      animation: { twinkle: "twinkle 5s ease-in-out infinite" },
      fontFamily: {
        sans: ["var(--font-nunito)", "ui-rounded", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-fredoka)", "ui-rounded", "ui-sans-serif", "system-ui", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        script: ["var(--font-poppins)", "sans-serif"],
        serif: ["var(--font-instrument-serif)", "Georgia", "serif"],
        tech: ["var(--font-tech)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
