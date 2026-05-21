import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px 20px;
  max-width: 400px;
  margin: 0 auto;
  animation: ${fadeInUp} 0.5s ease-out;
`;

export const PlayingLayout = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
  padding: 32px 20px;
  gap: 24px;
  animation: ${fadeInUp} 0.5s ease-out;

  @media (max-width: 700px) {
    flex-direction: column;
    max-width: 400px;
    align-items: center;
    justify-content: center;
  }
`;

export const GameColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 0;
  max-width: 400px;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const HistoryColumn = styled.div`
  width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  max-height: 100vh;
  position: sticky;
  top: 16px;
  overflow-y: auto;

  @media (max-width: 700px) {
    width: 100%;
    position: static;
    max-height: none;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
  background: ${p => p.theme.colors.surface};
  padding: 12px 20px;
  border-radius: ${p => p.theme.radii.xl};
  border: 2px solid ${p => p.theme.colors.border};
`;

export const OpponentInfo = styled.span`
  font-size: 14px;
  font-weight: ${p => p.theme.fontWeights.extrabold};
  color: ${p => p.theme.colors.textSub};
`;

export const TurnInfo = styled.span`
  font-size: 14px;
  font-weight: ${p => p.theme.fontWeights.black};
  color: ${p => p.theme.colors.text};
  background: ${p => p.theme.colors.yellow};
  padding: 4px 12px;
  border-radius: ${p => p.theme.radii.full};
`;

export const PhaseTitle = styled.h2`
  font-size: 26px;
  font-weight: ${p => p.theme.fontWeights.black};
  color: ${p => p.theme.colors.text};
  text-align: center;
  margin-bottom: 6px;
  letter-spacing: -1px;
`;

export const PhaseSubtitle = styled.p`
  font-size: 14px;
  font-weight: ${p => p.theme.fontWeights.bold};
  color: ${p => p.theme.colors.textSub};
  text-align: center;
  margin-bottom: 24px;
`;

export const BlobSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
`;

export const MoodMessage = styled.p`
  font-size: 14px;
  font-weight: ${p => p.theme.fontWeights.extrabold};
  color: ${p => p.theme.colors.textSub};
  background: ${p => p.theme.colors.surface};
  padding: 6px 16px;
  border-radius: ${p => p.theme.radii.full};
  border: 2px solid ${p => p.theme.colors.border};
`;

export const WaitingOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px;
`;

export const OpponentBar = styled.div<{ $active?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  background: ${p => p.$active ? '#FFF8E1' : p.theme.colors.surface};
  border-radius: ${p => p.theme.radii.lg};
  border: 2px solid ${p => p.$active ? p.theme.colors.yellow : p.theme.colors.border};
  margin-bottom: 16px;
`;

export const OpponentBarText = styled.span<{ $active?: boolean }>`
  font-size: 14px;
  font-weight: ${p => p.theme.fontWeights.extrabold};
  color: ${p => p.$active ? p.theme.colors.text : p.theme.colors.textSub};
`;

export const PulseIcon = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-left: auto;
  animation: ${pulse} 1.5s infinite;
`;

export const MySecretBanner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${p => p.theme.colors.surfaceAlt};
  border-radius: ${p => p.theme.radii.full};
  margin-bottom: 12px;
`;

export const SecretLabel = styled.span`
  font-size: 12px;
  font-weight: ${p => p.theme.fontWeights.extrabold};
  color: ${p => p.theme.colors.textMuted};
  letter-spacing: 0.5px;
`;

export const SecretDigits = styled.span`
  font-size: 18px;
  font-weight: ${p => p.theme.fontWeights.black};
  color: ${p => p.theme.colors.text};
  letter-spacing: 6px;
`;

export const OpponentSelectingBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 16px;
  background: #F0F4FF;
  border-radius: ${p => p.theme.radii.lg};
  border: 2px solid #D6E0F5;
  margin-bottom: 12px;
`;

export const OpponentDigit = styled.span<{ $filled: boolean }>`
  width: 28px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${p => p.$filled ? '#38B6FF' : 'rgba(0,0,0,0.06)'};
  color: ${p => p.$filled ? '#fff' : 'transparent'};
  font-size: 16px;
  font-weight: ${p => p.theme.fontWeights.black};
  border-radius: ${p => p.theme.radii.md};
  transition: all 0.2s ease;
`;

export const ErrorMsg = styled.p`
  color: ${p => p.theme.colors.pink};
  font-size: 13px;
  font-weight: ${p => p.theme.fontWeights.extrabold};
  text-align: center;
  margin-top: 8px;
  padding: 6px 12px;
  background: #FFF0F3;
  border-radius: ${p => p.theme.radii.full};
`;
