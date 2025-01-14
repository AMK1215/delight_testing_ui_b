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
        destructive: "rgba(255, 99, 71, 1)",
      },
      backgroundColor: {
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
        DEFAULT: "rgba(31,41,55,1)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
