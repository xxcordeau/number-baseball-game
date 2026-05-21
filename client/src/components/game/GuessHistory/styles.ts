import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(8px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

export const HistoryList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;
`;


export const HistoryTitle = styled.h3`
  font-size: 13px;
  font-weight: ${p => p.theme.fontWeights.black};
  color: ${p => p.theme.colors.textMuted};
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: ${p => p.theme.colors.surface};
  border-radius: ${p => p.theme.radii.lg};
  border: 1.5px solid ${p => p.theme.colors.border};
  box-shadow: ${p => p.theme.shadows.sm};
  animation: ${slideIn} 0.25s ease-out;
`;

export const GuessDigits = styled.span`
  font-size: 20px;
  font-weight: ${p => p.theme.fontWeights.black};
  letter-spacing: 6px;
  color: ${p => p.theme.colors.text};
  white-space: nowrap;
`;

export const EmptyHint = styled.p`
  font-size: 13px;
  font-weight: ${p => p.theme.fontWeights.bold};
  color: ${p => p.theme.colors.textMuted};
  text-align: center;
  padding: 32px 16px;
  border: 1.5px dashed ${p => p.theme.colors.border};
  border-radius: ${p => p.theme.radii.lg};
`;

export const TurnNum = styled.span`
  font-size: 12px;
  font-weight: ${p => p.theme.fontWeights.extrabold};
  color: ${p => p.theme.colors.textMuted};
  margin-left: auto;
  background: ${p => p.theme.colors.surfaceAlt};
  padding: 2px 8px;
  border-radius: ${p => p.theme.radii.full};
`;
