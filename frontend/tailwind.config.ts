import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        ss: "420px"
      },
      colors: {
        // fondos
        "FondoPrimary": "#868F7A",

        // textos
        "TextPrimary": "#6C7263"
      }
    },
  },
  plugins: [],
};
export default config;
