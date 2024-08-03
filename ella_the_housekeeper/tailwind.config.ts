import type { Config } from "tailwindcss";



const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "possible-background-image": "url('/background.jpg')",
      },
      padding: {
        '10%': '10%'
      },
      dropShadow: {
        'custom': '0 0 0.75rem rgba(0, 0, 0, 0.5)',
      },
      fontFamily: {
        'lilita': ['Lilita One', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
