import { useState, useEffect } from 'react';
import { GaugeContainer, GaugeTrack, GaugeBar, GaugeTime, TimeoutMsg } from './styles';

const TURN_DURATION = 25;

interface TimerGaugeProps {
  active: boolean;
  turnKey: number;
  timedOut?: boolean;
}

export default function TimerGauge({ active, turnKey, timedOut }: TimerGaugeProps) {
  const [timeLeft, setTimeLeft] = useState(TURN_DURATION);

  useEffect(() => {
    if (!active) {
      setTimeLeft(TURN_DURATION);
      return;
    }

    setTimeLeft(TURN_DURATION);
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const remaining = Math.max(0, TURN_DURATION - elapsed);
      setTimeLeft(remaining);
      if (remaining <= 0) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, [active, turnKey]);

  if (timedOut) {
    return <TimeoutMsg>⏰ 시간 초과! 랜덤 숫자가 입력되었습니다</TimeoutMsg>;
  }

  if (!active) return null;

  return (
    <GaugeContainer>
      <GaugeTrack>
        <GaugeBar key={turnKey} $duration={TURN_DURATION} />
      </GaugeTrack>
      <GaugeTime $urgent={timeLeft <= 5}>
        {Math.ceil(timeLeft)}초
      </GaugeTime>
    </GaugeContainer>
  );
}
