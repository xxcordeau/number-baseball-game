import { CounterRow, Dot, TurnLabel } from './styles';

interface TurnCounterProps {
  current: number;
  max: number;
}

export default function TurnCounter({ current, max }: TurnCounterProps) {
  const remaining = max - current + 1;
  return (
    <CounterRow>
      {Array.from({ length: max }).map((_, i) => (
        <Dot key={i} $used={i < current} />
      ))}
      <TurnLabel>{remaining}번 남음</TurnLabel>
    </CounterRow>
  );
}
