/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        pop: {
          transform: "scale(1)",
        },
      },
      animation: {
        pop: "wiggle 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
