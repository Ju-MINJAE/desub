import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx}', // Storybook에서 사용할 컴포넌트 경로
    './.storybook/**/*.{js,jsx,ts,tsx}', // Storybook 파일 추가
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#88FF00',
        red: '#FF0000',
        green: '#008129',
        gray: '#B3B3B3',
        lightgray: '#e9e9e9',
        darkgray: '#4c4c4c',
      },
      gridTemplateColumns: {
        '24': 'repeat(24, minmax(0, 1fr))',
      },
      keyframes: {
        spinner: {
          '0%': { transform: 'rotate(0deg)', opacity: '0.2' },
          '50%': { opacity: '1' },
          '100%': { transform: 'rotate(360deg)', opacity: '0.2' },
        },
      },
      animation: {
        spinner: 'spinner 1.5s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
