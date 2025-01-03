/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        cBlack: "#000",
        cDarkGray: "#353535",
        cDarkerPurple: "#3A1479",
        cWhite: "#FFF",
        cGolden: "#EFD05B",
        cGradient1: "#18043A",
        cGradient2: "#0E0B13",
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700,
      },
      animation: {
        text: "text 5s ease infinite",
        box: "text 5s ease infinite",
        scrollDown: "scrollDown 3s ease infinite",
        scrollText: "scrollText 3s ease infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
          "25%": {
            "background-size": "200% 200%",
            "background-position": "top center",
          },
        },
        box: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "top center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "bottom center",
          },
          "25%": {
            "background-size": "200% 200%",
            "background-position": "top center",
          },
        },
        scrollDown: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
            "background-color": "#86198F",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        scrollText: {
          "0%, 100%": {
            position: "relative",
            top: "0px",
          },
          "50%": {
            top: "20px",
          },
        },
      },
    },
  },
  plugins: [],
};
