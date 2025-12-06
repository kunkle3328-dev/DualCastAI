/*
 * Tailwind CSS configuration for DualCast AI Studio Pro Max.
 *
 * This config enables dark mode via class toggling and defines a set of
 * neon‑inspired accent colours used throughout the interface. It also
 * specifies which files Tailwind should scan for class usage.
 */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-teal': '#00FFC6',
        'electric-purple': '#A600FF',
        'magenta': '#FF00D4',
        'cyan': '#00E0FF',
        'studio-bg': '#0D0D0D',
        'panel-bg': 'rgba(255,255,255,0.05)',
      },
      boxShadow: {
        neon: '0 0 15px rgba(0, 255, 198, 0.6), 0 0 30px rgba(166, 0, 255, 0.5)',
      },
    },
  },
  plugins: [],
};