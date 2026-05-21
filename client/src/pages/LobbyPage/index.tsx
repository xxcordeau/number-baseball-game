import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../contexts/GameContext';
import BlobCharacter from '../../components/common/BlobCharacter';
import {
  Container,
  PageTitle,
  CodeBox,
  Code,
  CopyButton,
  PlayersRow,
  PlayerSlot,
  SlotName,
  SlotStatus,
  WaitingText,
  Dots,
  VsLabel,
} from './styles';

export default function LobbyPage() {
  const { roomCode, phase, myPlayer, opponent } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (!roomCode) {
      navigate('/');
    }
  }, [roomCode, navigate]);

  useEffect(() => {
    if (phase === 'SETUP' && opponent) {
      navigate(`/game/${roomCode}`);
    }
  }, [phase, opponent, roomCode, navigate]);

  const handleCopy = () => {
    if (roomCode) {
      navigator.clipboard.writeText(roomCode);
    }
  };

  return (
    <Container>
      <PageTitle>대기실</PageTitle>

      <CodeBox>
        <Code>{roomCode}</Code>
        <CopyButton onClick={handleCopy}>복사</CopyButton>
      </CodeBox>

      <PlayersRow>
        <PlayerSlot $ready>
          <BlobCharacter mood="happy" size={72} />
          <SlotName>{myPlayer?.nickname || '나'}</SlotName>
          <SlotStatus $ready>Ready</SlotStatus>
        </PlayerSlot>

        <VsLabel>VS</VsLabel>

        <PlayerSlot>
          <BlobCharacter mood="neutral" size={72} color="#D4D0C8" />
          <SlotName>{opponent?.nickname || '???'}</SlotName>
          <SlotStatus>waiting</SlotStatus>
        </PlayerSlot>
      </PlayersRow>

      <WaitingText>
        친구에게 코드를 공유하세요
        <Dots>
          <span /><span /><span />
        </Dots>
      </WaitingText>
    </Container>
  );
}
