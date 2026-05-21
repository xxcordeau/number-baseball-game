import styled, { css } from 'styled-components';

type Variant = 'primary' | 'secondary' | 'ghost';

const variantStyles = {
  primary: css`
    background: ${p => p.theme.colors.blue};
    color: #fff;
    box-shadow: 0 2px 10px ${p => p.theme.colors.blue}40;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 16px ${p => p.theme.colors.blue}50;
    }
    &:active {
      transform: translateY(1px);
      box-shadow: 0 1px 4px ${p => p.theme.colors.blue}30;
    }
  `,
  secondary: css`
    background: ${p => p.theme.colors.surface};
    color: ${p => p.theme.colors.text};
    border: 2px solid ${p => p.theme.colors.border};
    box-shadow: ${p => p.theme.shadows.sm};

    &:hover {
      transform: translateY(-1px);
      border-color: ${p => p.theme.colors.orange};
      box-shadow: 0 2px 10px ${p => p.theme.colors.orange}25;
    }
    &:active {
      transform: translateY(1px);
      box-shadow: none;
    }
  `,
  ghost: css`
    background: transparent;
    color: ${p => p.theme.colors.textSub};

    &:hover {
      color: ${p => p.theme.colors.text};
      background: ${p => p.theme.colors.surfaceAlt};
    }
  `,
};

export const StyledButton = styled.button<{ $variant: Variant; $fullWidth?: boolean }>`
  padding: 14px 24px;
  border-radius: ${p => p.theme.radii.lg};
  font-size: 16px;
  font-weight: ${p => p.theme.fontWeights.extrabold};
  letter-spacing: -0.2px;
  transition: all 0.2s ease;
  width: ${p => (p.$fullWidth ? '100%' : 'auto')};
  min-width: fit-content;
  white-space: nowrap;
  ${p => variantStyles[p.$variant]}

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }
`;
