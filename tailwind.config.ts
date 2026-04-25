import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F5F7FB",
        surface: "#FFFFFF",
        navy: "#101828",
        harbor: "#1E3A8A",
        softblue: "#3B82F6",
        gold: "#F4B860",
        sunset: "#FF8A5B",
        softgray: "#E5E7EB"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(16,24,40,.08)",
        insetSoft: "inset 0 2px 10px rgba(16,24,40,.08)"
      }
    }
  },
  plugins: []
};

export default config;
