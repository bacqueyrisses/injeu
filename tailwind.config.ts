import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    letterSpacing: {
      wider: ".08em",
    },
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
        "injeu-light-red": "#F6BCAB",
        "injeu-yellow": "#FEF445",
        "injeu-dark-yellow": "#CEE741",
        "injeu-green": "#00963E",
        "injeu-pop-green": "#5AC95D",
        "injeu-purple": "#652CB3",
        "injeu-light-green": "#62BEB1",
        "injeu-light-gray": "#E6E6E6",
        "injeu-gray": "#808080",
        "injeu-brown": "#493D42",
      },
    },
  },
  plugins: [],
};
export default config;
