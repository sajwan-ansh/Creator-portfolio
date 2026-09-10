/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgMain: '#f7f6f2',
        bgCard: '#efece6',
        darkSection: '#0e1117',
        darkCard: '#181c24',
        textMain: '#1c1c1e',
        textMuted: '#646466',
        accentGold: '#d99b26',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        handwriting: ['"Caveat"', '"Reenie Beanie"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
