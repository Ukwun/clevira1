import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: "#173d32",
        botanical: "#dce9df",
      },
    },
  },
  plugins: [],
};

export default config;
