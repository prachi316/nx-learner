/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './src/**/*.scss'],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {},
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disables Tailwind's reset styles globally
  },
};
