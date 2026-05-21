import styled, { css } from 'styled-components';

type Variant = 'primary' | 'secondary' | 'ghost';

const variantStyles = {
  primary: css`
    background: ${p => p.theme.colors.text};
    color: #fff;
    border-bottom: 4px solid rgba(0,0,0,0.3);

    &:hover {
      transform: translateY(-1px);
      border-bottom-width: 5px;
    }
    &:active {
      transform: translateY(2px);
      border-bottom-width: 2px;
    }
  `,
  secondary: css`
    background: ${p => p.theme.colors.surface};
    color: ${p => p.theme.colors.text};
    border: 2.5px solid ${p => p.theme.colors.text};
    border-bottom: 5px solid ${p => p.theme.colors.text};

    &:hover {
      transform: translateY(-1px);
      border-bottom-width: 6px;
    }
    &:active {
      transform: translateY(2px);
      border-bottom-width: 3px;
    }
  `,
  ghost: css`
    background: transparent;
    color: ${p => p.theme.colors.textSub};
    text-decoration: underline;
    text-decoration-style: wavy;
    text-underline-offset: 4px;

    &:hover {
      color: ${p => p.theme.colors.text};
    }
  `,
};

export const StyledButton = styled.button<{ $variant: Variant; $fullWidth?: boolean }>`
  padding: 14px 24px;
  border-radius: ${p => p.theme.radii.lg};
  font-size: 16px;
  font-weight: ${p => p.theme.fontWeights.extrabold};
  letter-spacing: -0.2px;
  transition: all 0.15s ease;
  width: ${p => (p.$fullWidth ? '100%' : 'auto')};
  min-width: fit-content;
  white-space: nowrap;
  ${p => variantStyles[p.$variant]}

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    transform: none !important;
    border-bottom-width: 4px !important;
  }
`;
