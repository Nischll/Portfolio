/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F1ECE5",
        "primary-dark": "#E4E0DA",
        secondary: "#E4C982",
        "secondary-dark": "#D6B762",
        accent: "#BD9E89",
        "accent-dark": "#A87C6F",
        neutral: "#545454",
        "neutral-dark": "#3C3C3C",
        highlight: "#FAEDE0",
        muted: "#CED1D4",
      },
      fontFamily: {
        heading: ["Delius", "cursive"], // for headings
        body: ["Helvetica", "Arial", "sans-serif"], // for paragraphs
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
