import { GuessEntry } from '../../../types/game';
import { getMoodFromResult } from '../../../utils/mood';
import BlobCharacter from '../../common/BlobCharacter';
import Badge from '../../common/Badge';
import {
  HistoryList,
  HistoryTitle,
  HistoryItem,
  GuessDigits,
  TurnNum,
  RuleHint,
  RuleLine,
  RuleBadge,
} from './styles';

interface GuessHistoryProps {
  guesses: GuessEntry[];
}

export default function GuessHistory({ guesses }: GuessHistoryProps) {
  if (guesses.length === 0) return null;

  return (
    <HistoryList>
      <HistoryTitle>기록</HistoryTitle>
      <RuleHint>
        <RuleLine><RuleBadge $color="#FF6B8A">S</RuleBadge> 스트라이크 — 숫자와 자리 모두 맞음</RuleLine>
        <RuleLine><RuleBadge $color="#38B6FF">B</RuleBadge> 볼 — 숫자는 맞지만 자리가 다름</RuleLine>
        <RuleLine><RuleBadge $color="#FF914D">OUT</RuleBadge> 아웃 — 맞는 숫자가 하나도 없음</RuleLine>
      </RuleHint>
      {[...guesses].reverse().map((entry, i) => (
        <HistoryItem key={i}>
          <BlobCharacter
            mood={getMoodFromResult(entry.result)}
            size={36}
            animate={false}
          />
          <GuessDigits>{entry.guess.join(' ')}</GuessDigits>
          <Badge result={entry.result} />
          <TurnNum>#{entry.turn}</TurnNum>
        </HistoryItem>
      ))}
    </HistoryList>
  );
}
