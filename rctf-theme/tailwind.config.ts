import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          "main": "rgb(var(--rgb-surface-main) / <alpha-value>)",
          "text": "rgb(var(--rgb-surface-text) / <alpha-value>)",
          "textalt": "rgb(var(--rgb-surface-textalt) / <alpha-value>)",
          "panel": "rgb(var(--rgb-surface-panel) / <alpha-value>)",
          "panelalt": "rgb(var(--rgb-surface-panelalt) / <alpha-value>)",
        },
        trainline: {
          "red": "rgb(var(--rgb-trainline-red) / <alpha-value>)",
          "orange": "rgb(var(--rgb-trainline-orange) / <alpha-value>)",
          "yellow": "rgb(var(--rgb-trainline-yellow) / <alpha-value>)",
          "green": "rgb(var(--rgb-trainline-green) / <alpha-value>)",
          "blue": "rgb(var(--rgb-trainline-blue) / <alpha-value>)",
          "purple": "rgb(var(--rgb-trainline-purple) / <alpha-value>)",
          "brown": "rgb(var(--rgb-trainline-brown) / <alpha-value>)",
        },
        button: {
          "normal": "rgb(var(--rgb-button-normal) / <alpha-value>)",
          "normalhover": "rgb(var(--rgb-button-normalhover) / <alpha-value>)",
          "active": "rgb(var(--rgb-button-active) / <alpha-value>)",
          "activehover": "rgb(var(--rgb-button-activehover) / <alpha-value>)",
          "disabled": "rgb(var(--rgb-button-disabled) / <alpha-value>)",
          "textdisabled": "rgb(var(--rgb-button-textdisabled) / <alpha-value>)",
        },
      },
      rotate: {
        "nw": "0deg",
        "n": "45deg",
        "ne": "90deg",
        "e": "135deg",
        "se": "180deg",
        "s": "225deg",
        "sw": "270deg",
        "w": "315deg",
      },
    },
  },
  safelist: [
    "rotate-nw",
    "rotate-n",
    "rotate-ne",
    "rotate-e",
    "rotate-se",
    "rotate-s",
    "rotate-sw",
    "rotate-w",
  ],
  plugins: [],
};
export default config;
