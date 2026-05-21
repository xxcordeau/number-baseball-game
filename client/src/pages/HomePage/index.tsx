import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../contexts/GameContext';
import BlobCharacter from '../../components/common/BlobCharacter';
import Button from '../../components/common/Button';
import {
  Container,
  HeroSection,
  Title,
  Subtitle,
  FormCard,
  InputField,
  Divider,
  JoinRow,
  CodeInput,
  ErrorMsg,
  Section,
  DecoRow,
} from './styles';

export default function HomePage() {
  const [nickname, setNickname] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const { createRoom, joinRoom, error, roomCode, phase } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (roomCode && phase === 'WAITING') {
      navigate(`/room/${roomCode}`);
    }
    if (roomCode && (phase === 'SETUP' || phase === 'PLAYING')) {
      navigate(`/game/${roomCode}`);
    }
  }, [roomCode, phase, navigate]);

  const handleCreate = () => {
    if (!nickname.trim()) return;
    createRoom(nickname.trim());
  };

  const handleJoin = () => {
    if (!nickname.trim() || !joinCode.trim()) return;
    joinRoom(joinCode.trim().toUpperCase(), nickname.trim());
  };

  return (
    <Container>
      <HeroSection>
        <BlobCharacter mood="happy" size={120} animate />
        <Title>숫자야구</Title>
        <Subtitle>친구와 1:1 두뇌 대결!</Subtitle>
      </HeroSection>

      <FormCard>
        <Section>
          <InputField
            placeholder="닉네임"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            maxLength={10}
          />

          <Button fullWidth onClick={handleCreate} disabled={!nickname.trim()}>
            방 만들기
          </Button>
        </Section>

        <Divider><span>or</span></Divider>

        <JoinRow>
          <CodeInput
            placeholder="코드"
            value={joinCode}
            onChange={e => setJoinCode(e.target.value.toUpperCase())}
            maxLength={6}
          />
          <Button variant="secondary" onClick={handleJoin} disabled={!nickname.trim() || !joinCode.trim()}>
            참가
          </Button>
        </JoinRow>
      </FormCard>

      {error && <ErrorMsg>{error}</ErrorMsg>}

      <DecoRow>
        <span /><span /><span /><span />
      </DecoRow>
    </Container>
  );
}
