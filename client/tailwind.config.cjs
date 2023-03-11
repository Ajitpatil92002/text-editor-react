/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        ul: { listStyle: "disc" },
        li: { listStyle: "decimal" },
        h1: { fontSize: "1.875rem;", fontWeight: 500 },
        h2: { fontSize: "1.5rem", fontWeight: 500 },
        h3: { fontSize: "1.25rem", fontWeight: 500 },
        h4: { fontSize: "1.25rem", fontWeight: 500 },
        h5: { fontSize: "1.25rem", fontWeight: 500 },
        h6: { fontSize: "1.25rem", fontWeight: 500 },
      });
    }),
  ],
};
