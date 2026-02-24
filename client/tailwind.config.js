export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        garage: {
          bg:       '#0F1923',
          surface:  '#1A2535',
          surface2: '#22334A',
          border:   '#2A3A50',
          gold:     '#C9A84C',
          'gold-hover': '#D4B460',
          text:     '#F0EDE6',
          muted:    '#8A95A3',
        },
      },
      fontFamily: {
        condensed: ['"Barlow Condensed"', 'sans-serif'],
        body:      ['Barlow', 'sans-serif'],
      },
    },
  },
  plugins: [],
}