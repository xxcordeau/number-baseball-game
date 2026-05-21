import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const popIn = keyframes`
  0% { transform: scale(0) rotate(-10deg); }
  60% { transform: scale(1.15) rotate(3deg); }
  100% { transform: scale(1) rotate(0deg); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-3px) rotate(-1deg); }
  75% { transform: translateX(3px) rotate(1deg); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px 20px;
  max-width: 400px;
  margin: 0 auto;
  animation: ${fadeInUp} 0.6s ease-out;
`;

export const ResultTitle = styled.h1<{ $color: string }>`
  font-size: 42px;
  font-weight: ${p => p.theme.fontWeights.black};
  color: ${p => p.$color};
  margin-top: 16px;
  margin-bottom: 4px;
  letter-spacing: -2px;
  animation: ${popIn} 0.6s ease-out 0.2s both;
`;

export const ResultSubtitle = styled.p`
  font-size: 15px;
  font-weight: ${p => p.theme.fontWeights.bold};
  color: ${p => p.theme.colors.textSub};
  margin-bottom: 32px;
`;

export const SummaryRow = styled.div`
  display: flex;
  gap: 14px;
  width: 100%;
  margin-bottom: 28px;
`;

export const SummaryCard = styled.div<{ $highlight?: boolean; $color?: string }>`
  flex: 1;
  padding: 20px;
  background: ${p => p.$highlight ? (p.$color || '#FFF0F3') : p.theme.colors.surface};
  border-radius: ${p => p.theme.radii.xl};
  border: 1.5px solid ${p => p.$highlight ? p.theme.colors.text : p.theme.colors.border};
  box-shadow: ${p => p.$highlight ? p.theme.shadows.lg : p.theme.shadows.sm};
  text-align: center;
  animation: ${p => p.$highlight ? shake : 'none'} 0.4s ease-in-out 0.8s;
`;

export const CardLabel = styled.p`
  font-size: 13px;
  font-weight: ${p => p.theme.fontWeights.extrabold};
  color: ${p => p.theme.colors.textSub};
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const CardValue = styled.p`
  font-size: 32px;
  font-weight: ${p => p.theme.fontWeights.black};
  color: ${p => p.theme.colors.text};
  letter-spacing: 6px;
`;

export const CardTurns = styled.p`
  font-size: 12px;
  font-weight: ${p => p.theme.fontWeights.bold};
  color: ${p => p.theme.colors.textMuted};
  margin-top: 4px;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

export const RematchLabel = styled.p`
  font-size: 13px;
  color: ${p => p.theme.colors.textMuted};
  font-weight: ${p => p.theme.fontWeights.bold};
  margin-top: 12px;
`;
