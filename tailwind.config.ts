import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#faf8f4',
          100: '#f7f4ef',
          200: '#ede8df',
          300: '#ddd8ce',
        },
        forest: {
          50:  '#e8f0e9',
          100: '#d0e2d1',
          300: '#7aa882',
          500: '#3d6b45',
          700: '#2d5238',
          900: '#1b3a22',
        },
        amber: {
          400: '#c4922a',
          50:  '#fbf4e3',
        },
      },
      fontFamily: {
        sans:    ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,.07), 0 1px 3px rgba(0,0,0,.04)',
        'card-hover': '0 8px 32px rgba(0,0,0,.12), 0 2px 8px rgba(0,0,0,.06)',
        drawer: '-8px 0 40px rgba(0,0,0,.12)',
      },
      borderRadius: {
        xl2: '1rem',
        xl3: '1.5rem',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.8s infinite linear',
      },
    },
  },
  plugins: [],
}
export default config
