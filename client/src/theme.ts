export const theme = {
  colors: {
    bg: '#F7F8FC',
    text: '#1B1D28',
    textSub: '#5F6477',
    textMuted: '#A0A4B8',
    surface: '#FFFFFF',
    surfaceAlt: '#F0F1F7',
    border: '#E2E4EE',
    pink: '#FF6B8A',
    yellow: '#FFD93D',
    blue: '#38B6FF',
    green: '#7ED957',
    purple: '#A97BFF',
    orange: '#FF914D',
    red: '#FF4D4D',
  },
  radii: {
    sm: '12px',
    md: '14px',
    lg: '18px',
    xl: '24px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
    md: '0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
    lg: '0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
    soft: '0 8px 32px rgba(0,0,0,0.06)',
  },
  fonts: {
    primary: "'Nunito', sans-serif",
  },
  fontWeights: {
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
} as const;

export type Theme = typeof theme;
