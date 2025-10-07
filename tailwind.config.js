/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './src/**/*.scss'],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        'surface-page': '#F3F8FB',
        'surface-card': '#F4F1E7',
        'surface-blue': '#F3F8FB',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disables Tailwind's reset styles globally
  },
};
