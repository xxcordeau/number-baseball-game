import styled, { keyframes } from 'styled-components';

const fall = keyframes`
  0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
  70% { opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
`;

const sway = keyframes`
  0%, 100% { margin-left: 0; }
  50% { margin-left: 30px; }
`;

export const ConfettiContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 100;
`;

export const Piece = styled.div<{ $left: number; $delay: number; $color: string; $size: number; $shape: 'circle' | 'rect' }>`
  position: absolute;
  top: -20px;
  left: ${p => p.$left}%;
  width: ${p => p.$size}px;
  height: ${p => p.$shape === 'rect' ? p.$size * 1.5 : p.$size}px;
  background: ${p => p.$color};
  border-radius: ${p => (p.$shape === 'circle' ? '50%' : '3px')};
  animation:
    ${fall} ${p => 2.5 + p.$delay}s ease-in forwards,
    ${sway} ${p => 1 + p.$delay * 0.5}s ease-in-out infinite;
  animation-delay: ${p => p.$delay * 0.2}s;
`;
