/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0a0f',
          light: '#1a1a24',
          accent: '#00f0ff',
          alert: '#ff2a2a',
          success: '#00ff66'
        }
      }
    },
  },
  plugins: [],
}
