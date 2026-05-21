import { useMemo } from 'react';
import { ConfettiContainer, Piece } from './styles';

const COLORS = ['#FF6B8A', '#FFD93D', '#38B6FF', '#7ED957', '#A97BFF', '#FF914D'];

export default function Confetti() {
  const pieces = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      color: COLORS[i % COLORS.length],
      size: 5 + Math.random() * 10,
      shape: (Math.random() > 0.5 ? 'circle' : 'rect') as 'circle' | 'rect',
    }));
  }, []);

  return (
    <ConfettiContainer>
      {pieces.map(p => (
        <Piece
          key={p.id}
          $left={p.left}
          $delay={p.delay}
          $color={p.color}
          $size={p.size}
          $shape={p.shape}
        />
      ))}
    </ConfettiContainer>
  );
}
