import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
`;

const wiggle = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-4deg); }
  75% { transform: rotate(4deg); }
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

export const PageTitle = styled.h2`
  font-size: 32px;
  font-weight: ${p => p.theme.fontWeights.black};
  color: ${p => p.theme.colors.text};
  margin-bottom: 28px;
  letter-spacing: -1px;
`;

export const CodeBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: ${p => p.theme.colors.orange};
  padding: 18px 28px;
  border-radius: ${p => p.theme.radii.xl};
  box-shadow: 0 3px 14px ${p => p.theme.colors.orange}40;
  margin-bottom: 40px;
`;

export const Code = styled.span`
  font-size: 32px;
  font-weight: ${p => p.theme.fontWeights.black};
  letter-spacing: 8px;
  color: ${p => p.theme.colors.text};
`;

export const CopyButton = styled.button`
  background: rgba(0,0,0,0.08);
  color: ${p => p.theme.colors.text};
  padding: 8px 16px;
  border-radius: ${p => p.theme.radii.md};
  font-size: 13px;
  font-weight: ${p => p.theme.fontWeights.extrabold};
  transition: all 0.2s;

  &:hover {
    background: rgba(0,0,0,0.15);
  }
  &:active {
    transform: scale(0.95);
  }
`;

export const PlayersRow = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: center;
  margin-bottom: 36px;
`;

export const PlayerSlot = styled.div<{ $ready?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 24px 28px;
  background: ${p => p.theme.colors.surface};
  border-radius: ${p => p.theme.radii.xl};
  border: 1.5px solid ${p => (p.$ready ? p.theme.colors.green : p.theme.colors.border)};
  box-shadow: ${p => (p.$ready ? `0 2px 12px ${p.theme.colors.green}30` : p.theme.shadows.md)};
  min-width: 150px;
  position: relative;
  transition: all 0.3s;
`;

export const SlotName = styled.span`
  font-size: 17px;
  font-weight: ${p => p.theme.fontWeights.extrabold};
  color: ${p => p.theme.colors.text};
`;

export const SlotStatus = styled.span<{ $ready?: boolean }>`
  font-size: 12px;
  font-weight: ${p => p.theme.fontWeights.extrabold};
  color: ${p => (p.$ready ? p.theme.colors.green : p.theme.colors.textMuted)};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const WaitingText = styled.p`
  font-size: 15px;
  color: ${p => p.theme.colors.textSub};
  font-weight: ${p => p.theme.fontWeights.bold};
  text-align: center;
`;

export const Dots = styled.span`
  display: inline-flex;
  gap: 3px;
  margin-left: 2px;

  & span {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${p => p.theme.colors.textSub};
    animation: ${pulse} 1.4s infinite;
  }
  & span:nth-child(2) { animation-delay: 0.2s; }
  & span:nth-child(3) { animation-delay: 0.4s; }
`;

export const VsLabel = styled.div`
  font-size: 20px;
  font-weight: ${p => p.theme.fontWeights.black};
  color: ${p => p.theme.colors.textMuted};
  align-self: center;
  animation: ${wiggle} 2s ease-in-out infinite;
`;
