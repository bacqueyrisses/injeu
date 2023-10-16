import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      lineHeight: {
        "extra-tight": "1.20",
      },
      colors: {
        primary: "#F9A715",
        secondary: "#CBBBA1",
        "injeu-blue": "#23376C",
        "injeu-light-blue": "#2D9BF0",
        "injeu-red": "#D61518",
        "injeu-yellow": "#FEF445",
        "injeu-light-red": "#F6BCAB",
        "injeu-light-green": "#62BEB1",
        "injeu-light-gray": "#E6E6E6",
        "injeu-brown": "#493D42",
      },
    },
  },
  plugins: [],
};
export default config;
