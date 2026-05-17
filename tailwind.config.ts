import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#2563EB",
          blueDark: "#0A2C80",
          navy: "#071A52",
          blueBright: "#60A5FA",
          blueLight: "#8FC4FF",
          amber: "#3B82F6",
          violet: "#4F7CFF",
          surface: "rgba(255,255,255,0.06)",
          text: "#FFFFFF",
          muted: "#CBD5E1",
        },
      },
      fontFamily: {
        sans: ["Sora", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        card: "12px",
        pill: "9999px",
      },
    },
  },
};

export default config;
