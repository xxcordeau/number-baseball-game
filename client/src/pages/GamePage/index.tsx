import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../contexts/GameContext';
import BlobCharacter from '../../components/common/BlobCharacter';
import NumberPad from '../../components/game/NumberPad';
import SelectedDigits from '../../components/game/SelectedDigits';
import GuessHistory from '../../components/game/GuessHistory';
import TurnCounter from '../../components/game/TurnCounter';
import { getMoodFromResult, moodMessages } from '../../utils/mood';
import { Mood } from '../../types/game';
import {
  Container,
  PlayingLayout,
  GameColumn,
  HistoryColumn,
  Header,
  OpponentInfo,
  TurnInfo,
  PhaseTitle,
  PhaseSubtitle,
  BlobSection,
  MoodMessage,
  WaitingOverlay,
  OpponentBar,
  OpponentBarText,
  PulseIcon,
  MySecretBanner,
  SecretLabel,
  SecretDigits,
  OpponentSelectingBar,
  OpponentDigit,
  ErrorMsg,
  RuleHint,
  RuleLine,
  RuleBadge,
} from './styles';

export default function GamePage() {
  const navigate = useNavigate();
  const {
    roomCode,
    phase,
    opponent,
    isMyTurn,
    currentTurn,
    maxTurns,
    myGuesses,
    myPlayer,
    setSecret,
    makeGuess,
    emitSelecting,
    opponentSelecting,
    guessAcknowledged,
    error,
  } = useGame();

  const [digits, setDigits] = useState<number[]>([]);
  const [isSecretSet, setIsSecretSet] = useState(false);

  useEffect(() => {
    if (!roomCode) navigate('/');
  }, [roomCode, navigate]);

  useEffect(() => {
    if (phase === 'FINISHED') {
      navigate(`/result/${roomCode}`);
    }
  }, [phase, roomCode, navigate]);

  useEffect(() => {
    if (phase === 'SETUP') {
      setIsSecretSet(false);
      setDigits([]);
    }
  }, [phase]);

  // Emit digit selection to opponent during PLAYING phase
  useEffect(() => {
    if (phase === 'PLAYING' && isMyTurn) {
      emitSelecting(digits);
    }
  }, [digits, phase, isMyTurn, emitSelecting]);

  const handleSelect = (n: number) => {
    if (digits.length < 3 && !digits.includes(n)) {
      setDigits([...digits, n]);
    }
  };

  const handleDelete = () => {
    setDigits(digits.slice(0, -1));
  };

  const handleConfirmSecret = () => {
    if (digits.length === 3) {
      setSecret(digits);
      setIsSecretSet(true);
      setDigits([]);
    }
  };

  const handleConfirmGuess = () => {
    if (digits.length === 3 && guessAcknowledged) {
      makeGuess(digits);
    }
  };

  // Clear digits only after server acknowledges the guess
  useEffect(() => {
    if (guessAcknowledged && myGuesses.length > 0) {
      setDigits([]);
    }
  }, [guessAcknowledged, myGuesses.length]);

  const lastResult = myGuesses.length > 0 ? myGuesses[myGuesses.length - 1].result : null;
  const currentMood: Mood = lastResult ? getMoodFromResult(lastResult) : 'neutral';
  const mySecret = myPlayer?.secretNumber;

  // ── SETUP phase ──
  if (phase === 'SETUP') {
    if (isSecretSet) {
      return (
        <Container>
          <WaitingOverlay>
            <BlobCharacter mood="happy" size={110} animate />
            <PhaseTitle>준비 완료!</PhaseTitle>
            <PhaseSubtitle>상대방이 숫자를 정하는 중...</PhaseSubtitle>
          </WaitingOverlay>
        </Container>
      );
    }

    return (
      <Container>
        <PhaseTitle>비밀 숫자를 정하세요</PhaseTitle>
        <PhaseSubtitle>1~9 중 서로 다른 3자리</PhaseSubtitle>
        <SelectedDigits digits={digits} />
        <NumberPad
          selected={digits}
          onSelect={handleSelect}
          onDelete={handleDelete}
          onConfirm={handleConfirmSecret}
        />
      </Container>
    );
  }

  // ── PLAYING phase ──
  if (phase === 'PLAYING') {
    return (
      <PlayingLayout>
        <GameColumn>
          <Header>
            <OpponentInfo>vs {opponent?.nickname ?? '???'}</OpponentInfo>
            <TurnInfo>{currentTurn}/{maxTurns}</TurnInfo>
          </Header>

          {mySecret && (
            <MySecretBanner>
              <SecretLabel>내 비밀번호</SecretLabel>
              <SecretDigits>{mySecret.join('')}</SecretDigits>
            </MySecretBanner>
          )}

          {isMyTurn ? (
            <OpponentBar $active>
              <BlobCharacter mood="excited" size={32} animate={false} />
              <OpponentBarText $active>내 차례!</OpponentBarText>
              <PulseIcon style={{ background: '#FFD93D' }} />
            </OpponentBar>
          ) : (
            <>
              <OpponentBar>
                <BlobCharacter mood="thinking" size={32} animate={false} />
                <OpponentBarText>상대방 추측 중...</OpponentBarText>
                <PulseIcon style={{ background: '#38B6FF' }} />
              </OpponentBar>
              {opponentSelecting.length > 0 && (
                <OpponentSelectingBar>
                  <SecretLabel>상대 선택중</SecretLabel>
                  {[0, 1, 2].map(i => (
                    <OpponentDigit key={i} $filled={i < opponentSelecting.length}>
                      {i < opponentSelecting.length ? '?' : ''}
                    </OpponentDigit>
                  ))}
                </OpponentSelectingBar>
              )}
            </>
          )}

          <BlobSection>
            <BlobCharacter mood={currentMood} size={80} animate />
            <MoodMessage>{moodMessages[currentMood]}</MoodMessage>
          </BlobSection>

          <TurnCounter current={currentTurn} max={maxTurns} />

          <RuleHint>
            <RuleLine><RuleBadge $color="#FF6B8A">S</RuleBadge> 스트라이크 — 숫자와 자리 모두 맞음</RuleLine>
            <RuleLine><RuleBadge $color="#38B6FF">B</RuleBadge> 볼 — 숫자는 맞지만 자리가 다름</RuleLine>
            <RuleLine><RuleBadge $color="#FF914D">OUT</RuleBadge> 아웃 — 맞는 숫자가 하나도 없음</RuleLine>
          </RuleHint>

          {isMyTurn && (
            <>
              <SelectedDigits digits={digits} />
              <NumberPad
                selected={digits}
                onSelect={handleSelect}
                onDelete={handleDelete}
                onConfirm={handleConfirmGuess}
              />
              {error && <ErrorMsg>{error}</ErrorMsg>}
            </>
          )}
        </GameColumn>

        <HistoryColumn>
          <GuessHistory guesses={myGuesses} />
        </HistoryColumn>
      </PlayingLayout>
    );
  }

  return (
    <Container>
      <BlobCharacter mood="neutral" size={80} animate />
      <PhaseSubtitle>로딩 중...</PhaseSubtitle>
    </Container>
  );
}
