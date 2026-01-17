/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "slide-in-from-top-5": {
          "0%": { transform: "translateY(-20px)" },
          "100%": { transform: "translateY(0)" },
        },
        "zoom-in-95": {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
      },
	   animation: {
        "in": "in 150ms ease-out",
        "slide-in-from-top-5": "slide-in-from-top-5 150ms ease-out",
        "zoom-in-95": "zoom-in-95 150ms ease-out",
      },
    },
  },
  plugins: [],
}

