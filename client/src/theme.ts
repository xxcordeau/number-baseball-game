export const theme = {
  colors: {
    bg: '#F0F0F0',
    text: '#1A1A1A',
    textSub: '#555555',
    textMuted: '#999999',
    surface: '#FFFFFF',
    surfaceAlt: '#F5F5F5',
    border: '#E0E0E0',
    orange: '#FFA830',
    deepOrange: '#FF6633',
    blue: '#1A75FF',
    skyBlue: '#33CCFF',
    yellow: '#FFD93D',
    green: '#7ED957',
    pink: '#FF6B8A',
    purple: '#A97BFF',
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
    md: '0 2px 8px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05)',
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
