import styled, { keyframes } from 'styled-components';

const pop = keyframes`
  0% { transform: scale(0.9); }
  60% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const DIGIT_COLORS = [
  '', // 0 unused
  '#FF6633', // 1 deep orange
  '#FFA830', // 2 orange
  '#FFD93D', // 3 yellow
  '#7ED957', // 4 green
  '#1A75FF', // 5 blue
  '#33CCFF', // 6 sky blue
  '#FF6633', // 7 deep orange
  '#1A75FF', // 8 blue
  '#FFA830', // 9 orange
];

export { DIGIT_COLORS };

export const PadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  max-width: 270px;
  margin: 0 auto;
`;

export const PadKey = styled.button<{ $selected?: boolean; $disabled?: boolean; $digit: number }>`
  width: 80px;
  height: 68px;
  border-radius: ${p => p.theme.radii.lg};
  font-size: 26px;
  font-weight: ${p => p.theme.fontWeights.black};
  background: ${p =>
    p.$selected
      ? DIGIT_COLORS[p.$digit]
      : p.theme.colors.surface};
  color: ${p =>
    p.$selected
      ? '#fff'
      : p.$disabled
        ? p.theme.colors.textMuted
        : p.theme.colors.text};
  border: 1.5px solid ${p =>
    p.$selected
      ? 'transparent'
      : p.theme.colors.border};
  box-shadow: ${p =>
    p.$selected
      ? `0 2px 8px ${DIGIT_COLORS[p.$digit]}40`
      : p.theme.shadows.sm};
  transition: all 0.12s ease;
  opacity: ${p => (p.$disabled && !p.$selected ? 0.35 : 1)};
  pointer-events: ${p => (p.$disabled ? 'none' : 'auto')};
  animation: ${p => (p.$selected ? pop : 'none')} 0.2s ease-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${p => p.theme.shadows.md};
  }

  &:active {
    transform: translateY(1px);
    box-shadow: none;
  }
`;

export const ActionRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 16px;
`;
