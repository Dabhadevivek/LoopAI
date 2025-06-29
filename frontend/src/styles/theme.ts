import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #232946 0%, #1e293b 100%)',
        color: '#e0e7ef',
        fontFamily: 'Inter, Poppins, sans-serif',
      },
      '#root': {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #232946 0%, #1e293b 100%)',
      },
    },
  },
  fonts: {
    heading: 'Poppins, Inter, sans-serif',
    body: 'Inter, Poppins, sans-serif',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '2.5rem',
  },
  colors: {
    emerald: {
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
    },
    blue: {
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
    },
    red: {
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
    },
    amber: {
      400: '#fbbf24',
      500: '#f59e42',
      600: '#d97706',
    },
    slate: {
      700: '#232946',
      800: '#1e293b',
      900: '#0f172a',
    },
    glass: 'rgba(30, 41, 59, 0.6)',
  },
  components: {
    Card: {
      baseStyle: {
        bg: 'glass',
        borderRadius: '2xl',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(16px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.12)',
        transition: 'box-shadow 0.3s, transform 0.3s',
        _hover: {
          boxShadow: '0 12px 32px 0 rgba(31, 38, 135, 0.45)',
          transform: 'translateY(-2px) scale(1.01)',
        },
      },
    },
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'lg',
        transition: 'all 0.2s',
        _hover: {
          transform: 'translateY(-2px) scale(1.03)',
          boxShadow: '0 4px 16px rgba(16,185,129,0.15)',
        },
      },
      variants: {
        solid: {
          bg: 'emerald.500',
          color: 'white',
          _hover: {
            bg: 'emerald.400',
          },
        },
      },
    },
    Input: {
      baseStyle: {
        borderRadius: 'lg',
        bg: 'glass',
        border: '1px solid rgba(255,255,255,0.10)',
        color: '#e0e7ef',
        _placeholder: { color: '#94a3b8' },
        transition: 'box-shadow 0.2s',
        _focus: {
          borderColor: 'emerald.400',
          boxShadow: '0 0 0 2px #34d399',
        },
      },
    },
    Table: {
      baseStyle: {
        borderRadius: 'xl',
        bg: 'glass',
        th: {
          color: '#b0b0b0',
          fontWeight: 'semibold',
        },
        td: {
          color: '#e0e7ef',
        },
      },
    },
  },
});

export default theme; 