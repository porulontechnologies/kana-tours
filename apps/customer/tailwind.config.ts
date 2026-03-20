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
          50:  "#e8edf5",
          100: "#c5d0e6",
          200: "#9eb1d5",
          300: "#7691c4",
          400: "#577ab8",
          500: "#3863ab",
          600: "#1A3A6E",
          700: "#152f5a",
          800: "#102446",
          900: "#0D1F3C",
          DEFAULT: "#1A3A6E",
        },
        gold: {
          50:  "#fff3ea",
          100: "#ffdfc2",
          200: "#ffca99",
          300: "#ffb470",
          400: "#ffa04d",
          500: "#F07322",
          600: "#d4611a",
          700: "#b25013",
          800: "#8f3f0d",
          900: "#6d2f08",
          DEFAULT: "#F07322",
        },
        sky: {
          50:  "#e8f0fd",
          100: "#c3d5fa",
          200: "#9bbbf7",
          300: "#70a0f4",
          400: "#508bf1",
          500: "#1E6FDB",
          600: "#175ec2",
          700: "#124ea8",
          800: "#0d3d8e",
          900: "#082c74",
          DEFAULT: "#1E6FDB",
        },
        background: "#F5F7FA",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
