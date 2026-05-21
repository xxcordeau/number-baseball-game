import styled, { keyframes } from 'styled-components';

const pop = keyframes`
  0% { transform: scale(0.9); }
  60% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const DIGIT_COLORS = [
  '', // 0 unused
  '#FF6B8A', // 1 pink
  '#FF914D', // 2 orange
  '#FFD93D', // 3 yellow
  '#7ED957', // 4 green
  '#38B6FF', // 5 blue
  '#A97BFF', // 6 purple
  '#FF6B8A', // 7 pink
  '#38B6FF', // 8 blue
  '#FFD93D', // 9 yellow
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
  border: 2.5px solid ${p =>
    p.$selected
      ? 'transparent'
      : p.theme.colors.border};
  border-bottom: ${p =>
    p.$selected
      ? `4px solid rgba(0,0,0,0.2)`
      : `5px solid ${p.theme.colors.border}`};
  transition: all 0.12s ease;
  opacity: ${p => (p.$disabled && !p.$selected ? 0.3 : 1)};
  pointer-events: ${p => (p.$disabled ? 'none' : 'auto')};
  animation: ${p => (p.$selected ? pop : 'none')} 0.2s ease-out;

  &:hover {
    transform: translateY(-2px);
    border-bottom-width: 6px;
  }

  &:active {
    transform: translateY(1px);
    border-bottom-width: 3px;
  }
`;

export const ActionRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 16px;
`;
