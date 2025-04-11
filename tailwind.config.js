/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'rubik': ['Rubik-Regular', 'san-serif'],
        'rubik-bold': ['Rubik-Bold', 'san-serif'],
        'rubik-extrabold': ['Rubik-ExtraBold', 'san-serif'],
        'rubik-medium': ['Rubik-Medium', 'san-serif'],
        'rubik-light': ['Rubik-Light', 'san-serif'],
        'rubik-semibold': ['Rubik-SemiBold', 'san-serif'],
        'spacemono': ['SpaceMono-Regular', 'san-serif']

      },
      colors: {
        "primary": { 100: "#ffab82", 200: "#ff8c53", 300: "#FF6A00" },
        "black": { DEFAULT: "#000000", 100: "#8C8E89", 200: "#666876", 300: "#191d31" },
        "accent": { 100: "#FBFBFD" },
        "danger": "#F75555",
        "secondary": "#FFA400",
        "tertiary": "#FFD700",
        "dark": "#1A1A1A",
        "light": "#F5F5F5",
        "white": "#FFFF"
      }
    },
  },
  plugins: [],
}