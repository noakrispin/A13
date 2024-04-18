module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          "primaryBG": "#0a090b", // Dark mode background color
          // Define other dark mode colors here
          "text": "#ffffff", // Dark mode text color
        },
        light: {
          "primaryBG": "#ffffff", // Light mode background color
          // Define other light mode colors here
          "text": "#000000", // Light mode text color
        },
        "Purple": "#f5f2ff", // Common color
      },
      fontFamily: {
        'primary': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderWidth: {
        'border': '1px', // Define the border-border class with a border width of 1px
      },
    },
  },
  plugins: [],
}
