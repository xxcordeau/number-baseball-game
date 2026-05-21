import styled, { keyframes } from 'styled-components';

const drain = keyframes`
  0%   { width: 100%; background: #7ED957; }
  55%  { background: #FFD93D; }
  80%  { background: #FF914D; }
  95%  { background: #FF6B8A; }
  100% { width: 0%; background: #FF4D4D; }
`;

const flash = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

export const GaugeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
`;

export const GaugeTrack = styled.div`
  flex: 1;
  height: 8px;
  background: ${p => p.theme.colors.surfaceAlt};
  border-radius: ${p => p.theme.radii.full};
  overflow: hidden;
`;

export const GaugeBar = styled.div<{ $duration: number }>`
  height: 100%;
  border-radius: ${p => p.theme.radii.full};
  animation: ${drain} ${p => p.$duration}s linear forwards;
  will-change: width;
`;

export const GaugeTime = styled.span<{ $urgent?: boolean }>`
  font-size: 14px;
  font-weight: ${p => p.theme.fontWeights.black};
  color: ${p => p.$urgent ? p.theme.colors.pink : p.theme.colors.textSub};
  min-width: 36px;
  text-align: right;
  font-variant-numeric: tabular-nums;
  animation: ${p => p.$urgent ? flash : 'none'} 0.6s infinite;
`;

export const TimeoutMsg = styled.span`
  font-size: 13px;
  font-weight: ${p => p.theme.fontWeights.extrabold};
  color: ${p => p.theme.colors.pink};
  text-align: center;
  width: 100%;
  display: block;
  margin-bottom: 8px;
  animation: ${flash} 0.5s ease-in-out 3;
`;
