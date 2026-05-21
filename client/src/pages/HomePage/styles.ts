import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const wobble = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-6deg); }
  75% { transform: rotate(6deg); }
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
`;

export const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeInUp} 0.7s ease-out;
  margin-bottom: 36px;
`;

export const Deco = styled.span`
  font-size: 32px;
  animation: ${wobble} 2s ease-in-out infinite;
  display: inline-block;
  margin-bottom: 4px;
`;

export const Title = styled.h1`
  font-size: 48px;
  font-weight: ${p => p.theme.fontWeights.black};
  color: ${p => p.theme.colors.text};
  letter-spacing: -2px;
  line-height: 1.1;
  margin-top: 12px;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: ${p => p.theme.colors.textSub};
  font-weight: ${p => p.theme.fontWeights.bold};
  margin-top: 6px;
`;

export const FormCard = styled.div`
  width: 100%;
  background: ${p => p.theme.colors.surface};
  border-radius: ${p => p.theme.radii.xl};
  border: 2.5px solid ${p => p.theme.colors.border};
  border-bottom: 6px solid ${p => p.theme.colors.border};
  padding: 28px 24px;
  animation: ${fadeInUp} 0.7s ease-out 0.15s both;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 14px 18px;
  border-radius: ${p => p.theme.radii.md};
  background: ${p => p.theme.colors.surfaceAlt};
  border: 2px solid transparent;
  font-size: 16px;
  font-weight: ${p => p.theme.fontWeights.bold};
  color: ${p => p.theme.colors.text};
  transition: border-color 0.2s, background 0.2s;
  text-align: center;

  &:focus {
    border-color: ${p => p.theme.colors.yellow};
    background: #fff;
  }

  &::placeholder {
    color: ${p => p.theme.colors.textMuted};
    font-weight: ${p => p.theme.fontWeights.semibold};
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 20px 0;
  gap: 12px;

  &::before, &::after {
    content: '';
    flex: 1;
    height: 2px;
    background: ${p => p.theme.colors.surfaceAlt};
    border-radius: 1px;
  }

  span {
    font-size: 12px;
    color: ${p => p.theme.colors.textMuted};
    font-weight: ${p => p.theme.fontWeights.extrabold};
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

export const JoinRow = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

export const CodeInput = styled(InputField)`
  flex: 1;
  letter-spacing: 5px;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: ${p => p.theme.fontWeights.black};
`;

export const ErrorMsg = styled.p`
  color: ${p => p.theme.colors.pink};
  font-size: 14px;
  font-weight: ${p => p.theme.fontWeights.extrabold};
  margin-top: 16px;
  text-align: center;
  background: #FFF0F3;
  padding: 10px 20px;
  border-radius: ${p => p.theme.radii.md};
  border: 2px solid ${p => p.theme.colors.pink}33;
`;

export const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DecoRow = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  margin-top: 24px;
  opacity: 0.3;

  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${p => p.theme.colors.text};
  }

  span:nth-child(2) { background: ${p => p.theme.colors.pink}; }
  span:nth-child(3) { background: ${p => p.theme.colors.yellow}; }
  span:nth-child(4) { background: ${p => p.theme.colors.blue}; }
`;
