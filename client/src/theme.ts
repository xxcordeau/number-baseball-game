export const theme = {
  colors: {
    bg: '#FAFAF8',
    text: '#1A1A1A',
    textSub: '#6B6B6B',
    textMuted: '#AAAAAA',
    surface: '#FFFFFF',
    surfaceAlt: '#F2F0EC',
    border: '#E0DDD6',
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
    md: '16px',
    lg: '20px',
    xl: '28px',
    full: '9999px',
  },
  shadows: {
    sm: '0 2px 0 rgba(0,0,0,0.08)',
    md: '0 3px 0 rgba(0,0,0,0.1)',
    lg: '0 4px 0 rgba(0,0,0,0.12)',
    soft: '0 8px 24px rgba(0,0,0,0.06)',
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
