import { GuessResult, Mood } from '../types/game';

export function getMoodFromResult(result: GuessResult): Mood {
  if (result.isHomerun) return 'win';
  if (result.strike >= 2) return 'excited';
  if (result.strike === 1) return 'happy';
  if (result.ball >= 2) return 'thinking';
  if (result.ball === 1) return 'confused';
  if (result.isOut) return 'sad';
  return 'neutral';
}

export const moodColors: Record<Mood, string> = {
  excited: '#FF6B8A',
  happy: '#7ED957',
  thinking: '#38B6FF',
  confused: '#A97BFF',
  sad: '#FF914D',
  neutral: '#FFD93D',
  win: '#FF6B8A',
};

export const moodMessages: Record<Mood, string> = {
  excited: '거의 다 왔어요!',
  happy: '좋은 감이에요!',
  thinking: '음... 뭔가 있어요',
  confused: '조금 더 생각해봐요',
  sad: '이런... 다시 해봐요!',
  neutral: '화이팅!',
  win: '정답! 축하해요!',
};
