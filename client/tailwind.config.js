import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ Your React files
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}", // ✅ HeroUI theme
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};
