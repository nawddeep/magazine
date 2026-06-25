/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme-aware colors using CSS variables
        'theme-primary': 'var(--color-primary)',
        'theme-primary-hover': 'var(--color-primary-hover)',
        'theme-accent': 'var(--color-accent)',
        'theme-accent-hover': 'var(--color-accent-hover)',
        'theme-bg': 'var(--color-background)',
        'theme-bg-secondary': 'var(--color-background-secondary)',
        'theme-bg-tertiary': 'var(--color-background-tertiary)',
        'theme-surface': 'var(--color-surface)',
        'theme-surface-elevated': 'var(--color-surface-elevated)',
        'theme-surface-hover': 'var(--color-surface-hover)',
        'theme-text': 'var(--color-text-primary)',
        'theme-text-secondary': 'var(--color-text-secondary)',
        'theme-text-tertiary': 'var(--color-text-tertiary)',
        'theme-text-muted': 'var(--color-text-muted)',
        'theme-text-inverse': 'var(--color-text-inverse)',
        'theme-border': 'var(--color-border-primary)',
        'theme-border-secondary': 'var(--color-border-secondary)',
        'theme-border-accent': 'var(--color-border-accent)',
        'theme-card-bg': 'var(--color-card-bg)',
        'theme-card-border': 'var(--color-card-border)',
        'theme-card-hover': 'var(--color-card-hover)',
        'theme-input-bg': 'var(--color-input-bg)',
        'theme-input-border': 'var(--color-input-border)',
      },
      fontFamily: {
        serif: ['var(--font-serif)'],
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      boxShadow: {
        'theme-sm': 'var(--shadow-sm)',
        'theme-md': 'var(--shadow-md)',
        'theme-lg': 'var(--shadow-lg)',
        'theme-xl': 'var(--shadow-xl)',
      },
    },
  },
  plugins: [],
}
