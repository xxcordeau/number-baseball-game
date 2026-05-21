import { useNavigate } from 'react-router-dom';
import { useGame } from '../../contexts/GameContext';
import BlobCharacter from '../../components/common/BlobCharacter';
import Button from '../../components/common/Button';
import Confetti from '../../components/result/Confetti';
import {
  Container,
  ResultTitle,
  ResultSubtitle,
  SummaryRow,
  SummaryCard,
  CardLabel,
  CardValue,
  CardTurns,
  ButtonRow,
  RematchLabel,
} from './styles';

export default function ResultPage() {
  const navigate = useNavigate();
  const {
    winner,
    socketId,
    myPlayer,
    opponent,
    myGuesses,
    opponentSecret,
    requestRematch,
    rematchRequested,
    resetAll,
  } = useGame();

  const isWinner = winner === socketId;
  const isDraw = winner === null;

  const handleLeave = () => {
    resetAll();
    navigate('/');
  };

  return (
    <Container>
      {isWinner && <Confetti />}

      <BlobCharacter
        mood={isWinner ? 'win' : isDraw ? 'neutral' : 'sad'}
        size={120}
        animate
      />

      <ResultTitle $color={isWinner ? '#FF6B8A' : isDraw ? '#FFD93D' : '#38B6FF'}>
        {isWinner ? '승리!' : isDraw ? '무승부' : '패배'}
      </ResultTitle>
      <ResultSubtitle>
        {isWinner
          ? `${myGuesses.length}번 만에 맞혔어요!`
          : isDraw
            ? '10턴 안에 아무도 못 맞혔어요'
            : '다음엔 꼭 이겨봐요!'}
      </ResultSubtitle>

      <SummaryRow>
        <SummaryCard $highlight={isWinner} $color={isWinner ? '#FFF0F3' : undefined}>
          <CardLabel>도전</CardLabel>
          <CardValue>{myGuesses.length}턴</CardValue>
          <CardTurns>{myPlayer?.nickname ?? '나'}</CardTurns>
        </SummaryCard>
        <SummaryCard $highlight={!isWinner && !isDraw} $color={!isWinner && !isDraw ? '#FFF0F3' : undefined}>
          <CardLabel>정답</CardLabel>
          <CardValue>{opponentSecret?.join('') ?? '???'}</CardValue>
          <CardTurns>{opponent?.nickname ?? '상대'}</CardTurns>
        </SummaryCard>
      </SummaryRow>

      <ButtonRow>
        <Button fullWidth onClick={handleLeave}>
          나가기
        </Button>
      </ButtonRow>
    </Container>
  );
}
