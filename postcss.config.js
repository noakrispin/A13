module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

/*module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production'
      ? {
          'postcss-dark-theme-class': {
            // Add configuration for generating dark theme classes
            darkSelector: '.dark-theme', // Selector for dark theme
            lightSelector: '.light-theme', // Selector for light theme
          },
        }
      : {}),
  },
};
*/