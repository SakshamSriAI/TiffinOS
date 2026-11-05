/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#173D35',
          dark: '#172E2A',
          deep: '#172E2A',
          light: '#235248',
          hover: '#13332c',
        },
        surface: {
          DEFAULT: '#EDEBE4', // Warm Off-white
          warm: '#EDEBE4',
          card: '#FFFFFF',
          sidebar: '#172E2A',
          subtle: '#F7F6F2',
          muted: '#E6E4DD'
        },
        mint: {
          DEFAULT: '#D6F1E4',
          light: '#EAF8F1',
          dark: '#B0E2CC',
        },
        amber: {
          accent: '#D49A34',
          subtle: '#FCF5E8',
          dark: '#B27D23',
        },
        charcoal: {
          DEFAULT: '#252B29',
          heading: '#161A19',
          body: '#252B29',
        },
        muted: {
          text: '#737A75',
          border: '#E2E4DE',
          light: '#A3AAA5',
        },
        border: {
          DEFAULT: '#E2E4DE',
          subtle: '#EAECE6',
          strong: '#D1D4CC',
        },
        status: {
          success: '#27845D',
          'success-bg': '#EAF7F1',
          error: '#C94F4F',
          'error-bg': '#FDF2F2',
          pending: '#D49A34',
          'pending-bg': '#FCF5E8',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(23, 61, 53, 0.05), 0 1px 2px -1px rgba(23, 61, 53, 0.05)',
        'card': '0 4px 6px -1px rgba(23, 61, 53, 0.04), 0 2px 4px -2px rgba(23, 61, 53, 0.04)',
        'dropdown': '0 10px 15px -3px rgba(23, 61, 53, 0.08), 0 4px 6px -4px rgba(23, 61, 53, 0.04)',
        'modal': '0 20px 25px -5px rgba(23, 46, 42, 0.12), 0 8px 10px -6px rgba(23, 46, 42, 0.08)',
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'input': '8px',
      }
    },
  },
  plugins: [],
}
