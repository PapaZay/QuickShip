import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          
"primary": "#ff00b4",
          
"secondary": "#0084ff",
          
"accent": "#007eff",
          
"neutral": "#060900",
          
"base-100": "#22272b",
          
"info": "#00c6ff",
          
"success": "#b3d51e",
          
"warning": "#fb9000",
          
"error": "#c5293f",
          },
        },
      ],
    },
};
export default config;
