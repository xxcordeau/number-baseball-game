export type Mood = 'excited' | 'happy' | 'thinking' | 'confused' | 'sad' | 'neutral' | 'win';

export interface GuessResult {
  strike: number;
  ball: number;
  isOut: boolean;
  isHomerun: boolean;
}

export interface GuessEntry {
  guess: number[];
  result: GuessResult;
  turn: number;
}

export interface Player {
  id: string;
  nickname: string;
  secretNumber: number[] | null;
  guesses: GuessEntry[];
  isReady: boolean;
}

export type GamePhase = 'WAITING' | 'SETUP' | 'PLAYING' | 'FINISHED';

export interface Room {
  code: string;
  players: Player[];
  currentTurn: number;
  activePlayerIndex: number;
  phase: GamePhase;
  winner: string | null;
  maxTurns: number;
}
