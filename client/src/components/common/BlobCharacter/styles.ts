import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50% { transform: translateY(-8px) rotate(2deg); }
`;

const wiggle = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-3deg); }
  75% { transform: rotate(3deg); }
`;

export const BlobSvg = styled.svg<{ $animate?: boolean; $size?: number }>`
  width: ${p => p.$size || 80}px;
  height: ${p => p.$size || 80}px;
  animation: ${p => (p.$animate ? float : 'none')} 3.5s ease-in-out infinite;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.06));
  transition: transform 0.3s ease;
`;

export const BlobWrapper = styled.div<{ $bounce?: boolean }>`
  display: inline-flex;
  position: relative;

  &:hover ${BlobSvg} {
    animation: ${wiggle} 0.4s ease-in-out;
  }
`;
