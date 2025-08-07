/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Architectonic AI Platform Color Palette
        architectonic: {
          // Primary brand colors
          primary: '#3c373b',      // Main brand color (from original logo)
          secondary: '#4ECDC4',    // Teal accent
          accent: '#FDCB6E',       // Golden yellow
          brand: {
            blue: '#3498db',       // Blue variation
            green: '#2ecc71',      // Green variation
            purple: '#A29BFE',     // Purple variation
            orange: '#E17055',     // Orange variation
          },
          
          // Neutral colors
          dark: '#2D3436',         // Dark text/strokes
          light: '#FFFFFF',        // Light backgrounds
          gray: {
            50: '#f8f9fa',
            100: '#f1f3f4',
            200: '#e8eaed',
            300: '#dadce0',
            400: '#bdc1c6',
            500: '#9aa0a6',
            600: '#80868b',
            700: '#5f6368',
            800: '#3c4043',
            900: '#202124',
          },
          
          // Semantic colors
          success: '#2ecc71',
          warning: '#FDCB6E',
          error: '#E17055',
          info: '#3498db',
        },
        
        // Legacy support (keeping original colors for compatibility)
        primary: '#3c373b',
        secondary: '#4ECDC4',
        accent: '#FDCB6E',
      },
      
      // Custom gradients
      backgroundImage: {
        'architectonic-gradient': 'linear-gradient(135deg, #3c373b 0%, #4ECDC4 100%)',
        'architectonic-gradient-radial': 'radial-gradient(circle, #3c373b 0%, #4ECDC4 100%)',
        'architectonic-gradient-diagonal': 'linear-gradient(45deg, #3c373b 0%, #FDCB6E 50%, #4ECDC4 100%)',
      },
      
      // Custom shadows
      boxShadow: {
        'architectonic': '0 4px 6px -1px rgba(60, 55, 59, 0.1), 0 2px 4px -1px rgba(60, 55, 59, 0.06)',
        'architectonic-lg': '0 10px 15px -3px rgba(60, 55, 59, 0.1), 0 4px 6px -2px rgba(60, 55, 59, 0.05)',
        'architectonic-xl': '0 20px 25px -5px rgba(60, 55, 59, 0.1), 0 10px 10px -5px rgba(60, 55, 59, 0.04)',
      },
      
      // Custom animations
      animation: {
        'architectonic-pulse': 'architectonic-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'architectonic-bounce': 'architectonic-bounce 1s infinite',
        'architectonic-spin': 'architectonic-spin 1s linear infinite',
      },
      
      keyframes: {
        'architectonic-pulse': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '.5',
          },
        },
        'architectonic-bounce': {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'architectonic-spin': {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
      },
      
      // Custom fonts
      fontFamily: {
        'architectonic': ['Inter', 'system-ui', 'sans-serif'],
        'architectonic-mono': ['JetBrains Mono', 'monospace'],
      },
      
      // Custom spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Custom border radius
      borderRadius: {
        'architectonic': '0.75rem',
        'architectonic-lg': '1rem',
        'architectonic-xl': '1.5rem',
      },
    },
  },
  plugins: [
    // Custom plugin for Architectonic-specific utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.architectonic-text-gradient': {
          background: 'linear-gradient(135deg, #3c373b 0%, #4ECDC4 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.architectonic-border-gradient': {
          border: '2px solid transparent',
          background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #3c373b 0%, #4ECDC4 100%) border-box',
        },
        '.architectonic-glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}