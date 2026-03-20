import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#e8edf3",
          100: "#c5d0e0",
          200: "#9fb3cc",
          300: "#7896b8",
          400: "#5b80a9",
          500: "#3e6b9a",
          600: "#1B3A5C",
          700: "#162f4a",
          800: "#112438",
          900: "#0b1926",
        },
        gold: {
          50: "#fdf5e6",
          100: "#fae6bf",
          200: "#f6d695",
          300: "#f2c56b",
          400: "#eeb94b",
          500: "#E8A317",
          600: "#d49414",
          700: "#b37c11",
          800: "#92650e",
          900: "#604208",
        },
        surface: "#F0F4F8",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
