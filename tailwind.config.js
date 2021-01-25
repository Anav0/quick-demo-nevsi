const production = !process.env.ROLLUP_WATCH;

module.exports = {
  darkMode: 'class', // This can be 'media' if preferred.
  purge: [
    './src/**/*.svelte',
    './src/**/*.html',
    './public/**/*.html',
  ],
  css: ["./public/**/*.css"],
  enabled: production,
  theme: {
    extend: {

    },
  },
  variants: {},
  plugins: [require('@tailwindcss/forms')],
}
