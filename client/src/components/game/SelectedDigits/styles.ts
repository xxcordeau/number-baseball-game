import styled, { keyframes } from 'styled-components';

const dropIn = keyframes`
  from { transform: translateY(-10px) scale(0.8); opacity: 0; }
  to { transform: translateY(0) scale(1); opacity: 1; }
`;

export const DigitsRow = styled.div`
  display: flex;
  gap: 14px;
  justify-content: center;
  margin-bottom: 24px;
`;

export const Slot = styled.div<{ $filled: boolean; $color?: string }>`
  width: 60px;
  height: 68px;
  border-radius: ${p => p.theme.radii.lg};
  background: ${p => (p.$filled ? (p.$color || p.theme.colors.surface) : p.theme.colors.surfaceAlt)};
  border: 3px solid ${p => (p.$filled ? p.theme.colors.text : p.theme.colors.border)};
  border-bottom: ${p => (p.$filled ? '6px' : '4px')} solid ${p => (p.$filled ? p.theme.colors.text : p.theme.colors.border)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: ${p => p.theme.fontWeights.black};
  color: ${p => p.theme.colors.text};
  transition: all 0.15s ease;
  animation: ${p => (p.$filled ? dropIn : 'none')} 0.2s ease-out;
`;
