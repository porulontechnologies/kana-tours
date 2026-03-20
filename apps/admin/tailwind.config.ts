import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
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
        sky: {
          50: "#eaf2fb",
          100: "#cbe0f5",
          200: "#a9ccee",
          300: "#87b8e7",
          400: "#6da9e1",
          500: "#4A90D9",
          600: "#3a78c4",
          700: "#2e60a3",
          800: "#234882",
          900: "#173061",
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
