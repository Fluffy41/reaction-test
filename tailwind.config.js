module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Tailwind needs to know which files to scan
  ],
  darkMode: 'class', // Enable dark mode based on a class (we will use this later)
  theme: {
    extend: {
      colors: {
        // Custom colors
      },
    },
  },
  plugins: [],
}
