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
        "TextPrimary": "#5A6A45"
      },
      dropShadow: {
        "button": "0 4px 3px #999",
      },
      boxShadow: {
        "sombra": "1px 6px 10px -5px #000"
      }
    },
  },
  plugins: [],
};
export default config;
