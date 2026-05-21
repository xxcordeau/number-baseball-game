import { ReactNode } from 'react';
import { StyledCard } from './styles';

export default function Card({ children, ...rest }: { children: ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return <StyledCard {...rest}>{children}</StyledCard>;
}
