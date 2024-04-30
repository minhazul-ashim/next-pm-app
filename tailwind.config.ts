import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      padding: {
        xs: "1rem",
        sm: "1.25rem",
        md: "1.5rem",
        lg: "1.75rem",
        xl: "2rem",
      },
      margin: {
        xs: "1rem",
        sm: "1.25rem",
        md: "1.5rem",
        lg: "1.75rem",
        xl: "2rem",
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        hoverPrimary: "var(--hoverPrimary)",
        hoverSecondary: "var(--hoverSecondary)",
        dark: "var(--textDark)",
        light: "var(--textLight)",
        accent: "var(--accent)",
      },
    },
  },
  plugins: [],
};
export default config;
