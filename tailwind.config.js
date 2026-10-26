/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#240A16',
          deep: '#19050e',
          light: '#2e0e1d',
          surface: '#1d0711',
        },
        wine: {
          DEFAULT: '#3A1024',
          hover: '#4a152e',
          active: '#561937',
          card: 'rgba(58, 16, 36, 0.75)',
          border: 'rgba(223, 166, 160, 0.18)',
        },
        rosegold: {
          DEFAULT: '#DFA6A0',
          hover: '#e8b8b3',
          dim: 'rgba(223, 166, 160, 0.14)',
          glow: 'rgba(223, 166, 160, 0.35)',
        },
        softpink: {
          DEFAULT: '#F3C7C3',
          dim: 'rgba(243, 199, 195, 0.12)',
        },
        warmwhite: {
          DEFAULT: '#FFF5F5',
          muted: 'rgba(255, 245, 245, 0.75)',
          dim: 'rgba(255, 245, 245, 0.45)',
        }
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-space)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      boxShadow: {
        'rose': '0 0 25px rgba(223, 166, 160, 0.25)',
        'rose-lg': '0 0 50px rgba(223, 166, 160, 0.4)',
        'wine': '0 8px 32px rgba(36, 10, 22, 0.7)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
