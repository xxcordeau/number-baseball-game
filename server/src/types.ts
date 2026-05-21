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

export interface ClientEvents {
  'room:create': (nickname: string) => void;
  'room:join': (code: string, nickname: string) => void;
  'game:set-secret': (secret: number[]) => void;
  'game:guess': (guess: number[]) => void;
  'game:rematch': () => void;
  'game:selecting': (digits: number[]) => void;
}

export interface ServerEvents {
  'room:created': (code: string) => void;
  'room:joined': (room: Room) => void;
  'room:player-joined': (player: Player) => void;
  'room:error': (message: string) => void;
  'game:both-ready': () => void;
  'game:your-turn': () => void;
  'game:opponent-turn': () => void;
  'game:guess-result': (entry: GuessEntry) => void;
  'game:opponent-guessed': (result: GuessResult) => void;
  'game:finished': (winner: string | null, answer: number[]) => void;
  'game:rematch-requested': () => void;
  'game:rematch-start': () => void;
  'game:opponent-selecting': (digits: number[]) => void;
  'player:disconnected': () => void;
}
