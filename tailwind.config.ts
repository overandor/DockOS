import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Base colors
        bg: "#0f0d0a",
        surface: "#1a1410",
        card: "#242118",
        border: "#3a2e28",
        
        // Primary palette - Golden/Orange
        primary: "#d4a574",
        primaryLight: "#e8c299",
        primaryDark: "#a67c52",
        secondary: "#c17a3d",
        secondaryLight: "#d89957",
        
        // Status colors
        success: "#10b981",
        error: "#ef4444",
        warning: "#f59e0b",
        info: "#3b82f6",
        
        // Text colors
        text: "#f5f1ed",
        textMuted: "#a89080",
        textDark: "#6b5f52",
        
        // Legacy support
        navy: "#0a0805",
        harbor: "#c17a3d",
        softblue: "#d4a574",
        gold: "#d4a574",
        sunset: "#e67e3c",
        softgray: "#5a4a3a"
      },
      boxShadow: {
        neo: "8px 8px 16px rgba(0,0,0,0.4), -8px -8px 16px rgba(255,255,255,0.05)",
        neoSm: "4px 4px 8px rgba(0,0,0,0.4), -4px -4px 8px rgba(255,255,255,0.05)",
        neoInset: "inset 4px 4px 8px rgba(0,0,0,0.5), inset -4px -4px 8px rgba(255,255,255,0.03)",
        soft: "0 10px 30px rgba(0,0,0,0.3)",
        insetSoft: "inset 0 2px 10px rgba(0,0,0,0.2)"
      }
    }
  },
  plugins: []
};

export default config;
