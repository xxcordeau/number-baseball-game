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
  EmptyHint,
} from './styles';

interface GuessHistoryProps {
  guesses: GuessEntry[];
}

export default function GuessHistory({ guesses }: GuessHistoryProps) {
  return (
    <HistoryList>
      <HistoryTitle>기록</HistoryTitle>
      {guesses.length === 0 ? (
        <EmptyHint>추측 결과가 여기에 표시됩니다</EmptyHint>
      ) : (
        [...guesses].reverse().map((entry, i) => (
          <HistoryItem key={i}>
            <BlobCharacter
              mood={getMoodFromResult(entry.result)}
              size={36}
              animate={false}
            />
            <GuessDigits>{entry.guess.join('')}</GuessDigits>
            <Badge result={entry.result} />
            <TurnNum>#{entry.turn}</TurnNum>
          </HistoryItem>
        ))
      )}
    </HistoryList>
  );
}
