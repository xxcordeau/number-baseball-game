import { ButtonHTMLAttributes } from 'react';
import { StyledButton } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
}

export default function Button({
  variant = 'primary',
  fullWidth = false,
  children,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton $variant={variant} $fullWidth={fullWidth} {...rest}>
      {children}
    </StyledButton>
  );
}
