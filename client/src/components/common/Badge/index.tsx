import { GuessResult } from '../../../types/game';
import { StyledBadge } from './styles';

interface BadgeProps {
  result: GuessResult;
}

export default function Badge({ result }: BadgeProps) {
  if (result.isOut) {
    return <StyledBadge $color="#FF914D">OUT</StyledBadge>;
  }

  return (
    <span style={{ display: 'flex', gap: 4 }}>
      {result.strike > 0 && (
        <StyledBadge $color="#FF6B8A">{result.strike}S</StyledBadge>
      )}
      {result.ball > 0 && (
        <StyledBadge $color="#38B6FF">{result.ball}B</StyledBadge>
      )}
    </span>
  );
}
