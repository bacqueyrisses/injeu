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
        primary: "#F9A715",
        secondary: "#CBBBA1",
        "injeu-blue": "#23376C",
        "injeu-red": "#D61518",
        "injeu-light-red": "#F6BCAB",
      },
    },
  },
  plugins: [],
};
export default config;
