import styled from 'styled-components';

export const CounterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 20px;
  background: ${p => p.theme.colors.surface};
  padding: 10px 16px;
  border-radius: ${p => p.theme.radii.full};
  border: 1.5px solid ${p => p.theme.colors.border};
  box-shadow: ${p => p.theme.shadows.sm};
`;

export const Dot = styled.div<{ $used: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${p => (p.$used ? p.theme.colors.deepOrange : p.theme.colors.surfaceAlt)};
  border: 1.5px solid ${p => (p.$used ? p.theme.colors.deepOrange : p.theme.colors.border)};
  transition: all 0.3s ease;
`;

export const TurnLabel = styled.span`
  font-size: 12px;
  font-weight: ${p => p.theme.fontWeights.extrabold};
  color: ${p => p.theme.colors.textSub};
  margin-left: 8px;
`;
