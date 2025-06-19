// tailwind.config.ts
export default {
  darkMode: "class", // or "media", but "class" gives more control
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // etc...
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
