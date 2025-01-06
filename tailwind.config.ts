import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgba(23,23,23,255)",
        secondary: "rgba(35,35,35,255)",
        active: "rgba(127,248,2,255)",
        primary: "rgba(23,23,23,255)",
      },
      borderRadius: {
        lg: "20px",
        md: "10px",
        sm: "5px",
      },
      borderColor: {
        DEFAULT: "rgba(31,41,55,1)", // Custom default border color (equivalent to gray-800)
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
