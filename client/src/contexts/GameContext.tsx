import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useSocketContext } from './SocketContext';
import { Player, GuessEntry, GuessResult, GamePhase } from '../types/game';

interface GameState {
  roomCode: string | null;
  phase: GamePhase;
  myPlayer: Player | null;
  opponent: Player | null;
  isMyTurn: boolean;
  currentTurn: number;
  maxTurns: number;
  myGuesses: GuessEntry[];
  opponentResults: GuessResult[];
  winner: string | null;
  opponentSecret: number[] | null;
  error: string | null;
  rematchRequested: boolean;
  opponentSelecting: number[];
}

interface GameActions {
  socketId: string | null;
  createRoom: (nickname: string) => void;
  joinRoom: (code: string, nickname: string) => void;
  setSecret: (secret: number[]) => void;
  makeGuess: (guess: number[]) => void;
  requestRematch: () => void;
  resetAll: () => void;
  emitSelecting: (digits: number[]) => void;
}

const initialState: GameState = {
  roomCode: null,
  phase: 'WAITING',
  myPlayer: null,
  opponent: null,
  isMyTurn: false,
  currentTurn: 1,
  maxTurns: 10,
  myGuesses: [],
  opponentResults: [],
  winner: null,
  opponentSecret: null,
  error: null,
  rematchRequested: false,
  opponentSelecting: [],
};

const GameContext = createContext<(GameState & GameActions) | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const socket = useSocketContext();
  const [state, setState] = useState<GameState>(initialState);

  const resetGame = useCallback(() => {
    setState(prev => ({
      ...initialState,
      roomCode: prev.roomCode,
      myPlayer: prev.myPlayer ? { ...prev.myPlayer, secretNumber: null, guesses: [], isReady: false } : null,
      opponent: prev.opponent ? { ...prev.opponent, secretNumber: null, guesses: [], isReady: false } : null,
      phase: 'SETUP',
    }));
  }, []);

  useEffect(() => {
    if (!socket) return;

    const onCreated = (code: string) => {
      setState(prev => ({
        ...prev,
        roomCode: code,
        phase: 'WAITING',
        myPlayer: {
          id: socket.id!,
          nickname: prev.myPlayer?.nickname || '',
          secretNumber: null,
          guesses: [],
          isReady: false,
        },
      }));
    };

    const onJoined = (room: any) => {
      const me = room.players.find((p: Player) => p.id === socket.id);
      const opp = room.players.find((p: Player) => p.id !== socket.id);
      setState(prev => ({
        ...prev,
        roomCode: room.code,
        phase: room.phase,
        myPlayer: me || prev.myPlayer,
        opponent: opp || null,
      }));
    };

    const onPlayerJoined = (player: Player) => {
      setState(prev => ({
        ...prev,
        phase: 'SETUP',
        opponent: player,
      }));
    };

    const onError = (message: string) => {
      setState(prev => ({ ...prev, error: message }));
      setTimeout(() => setState(prev => ({ ...prev, error: null })), 3000);
    };

    const onBothReady = () => {
      setState(prev => ({ ...prev, phase: 'PLAYING' }));
    };

    const onMyTurn = () => {
      setState(prev => ({ ...prev, isMyTurn: true, opponentSelecting: [] }));
    };

    const onOpponentTurn = () => {
      setState(prev => ({ ...prev, isMyTurn: false }));
    };

    const onGuessResult = (entry: GuessEntry) => {
      setState(prev => ({
        ...prev,
        myGuesses: [...prev.myGuesses, entry],
        currentTurn: entry.turn,
      }));
    };

    const onOpponentGuessed = (result: GuessResult) => {
      setState(prev => ({
        ...prev,
        opponentResults: [...prev.opponentResults, result],
      }));
    };

    const onFinished = (winner: string | null, answer: number[]) => {
      setState(prev => ({
        ...prev,
        phase: 'FINISHED',
        winner,
        opponentSecret: answer,
      }));
    };

    const onOpponentSelecting = (digits: number[]) => {
      setState(prev => ({ ...prev, opponentSelecting: digits }));
    };

    const onRematchRequested = () => {
      setState(prev => ({ ...prev, rematchRequested: true }));
    };

    const onRematchStart = () => {
      resetGame();
    };

    const onDisconnected = () => {
      setState(prev => ({
        ...prev,
        error: '상대방이 나갔습니다.',
        phase: 'FINISHED',
      }));
    };

    socket.on('room:created', onCreated);
    socket.on('room:joined', onJoined);
    socket.on('room:player-joined', onPlayerJoined);
    socket.on('room:error', onError);
    socket.on('game:both-ready', onBothReady);
    socket.on('game:your-turn', onMyTurn);
    socket.on('game:opponent-turn', onOpponentTurn);
    socket.on('game:guess-result', onGuessResult);
    socket.on('game:opponent-guessed', onOpponentGuessed);
    socket.on('game:finished', onFinished);
    socket.on('game:opponent-selecting', onOpponentSelecting);
    socket.on('game:rematch-requested', onRematchRequested);
    socket.on('game:rematch-start', onRematchStart);
    socket.on('player:disconnected', onDisconnected);

    return () => {
      socket.off('room:created', onCreated);
      socket.off('room:joined', onJoined);
      socket.off('room:player-joined', onPlayerJoined);
      socket.off('room:error', onError);
      socket.off('game:both-ready', onBothReady);
      socket.off('game:your-turn', onMyTurn);
      socket.off('game:opponent-turn', onOpponentTurn);
      socket.off('game:guess-result', onGuessResult);
      socket.off('game:opponent-guessed', onOpponentGuessed);
      socket.off('game:finished', onFinished);
      socket.off('game:opponent-selecting', onOpponentSelecting);
      socket.off('game:rematch-requested', onRematchRequested);
      socket.off('game:rematch-start', onRematchStart);
      socket.off('player:disconnected', onDisconnected);
    };
  }, [socket, resetGame]);

  const createRoom = useCallback((nickname: string) => {
    if (!socket) return;
    setState(prev => ({
      ...prev,
      myPlayer: { id: socket.id!, nickname, secretNumber: null, guesses: [], isReady: false },
    }));
    socket.emit('room:create', nickname);
  }, [socket]);

  const joinRoom = useCallback((code: string, nickname: string) => {
    if (!socket) return;
    setState(prev => ({
      ...prev,
      myPlayer: { id: socket.id!, nickname, secretNumber: null, guesses: [], isReady: false },
    }));
    socket.emit('room:join', code, nickname);
  }, [socket]);

  const setSecret = useCallback((secret: number[]) => {
    if (!socket) return;
    socket.emit('game:set-secret', secret);
    setState(prev => ({
      ...prev,
      myPlayer: prev.myPlayer ? { ...prev.myPlayer, secretNumber: secret, isReady: true } : null,
    }));
  }, [socket]);

  const makeGuess = useCallback((guess: number[]) => {
    if (!socket) return;
    socket.emit('game:guess', guess);
  }, [socket]);

  const requestRematch = useCallback(() => {
    if (!socket) return;
    socket.emit('game:rematch');
    setState(prev => ({ ...prev, rematchRequested: true }));
  }, [socket]);

  const emitSelecting = useCallback((digits: number[]) => {
    if (!socket) return;
    socket.emit('game:selecting' as any, digits);
  }, [socket]);

  const resetAll = useCallback(() => {
    setState(initialState);
  }, []);

  const value: GameState & GameActions = {
    ...state,
    socketId: socket?.id ?? null,
    createRoom,
    joinRoom,
    setSecret,
    makeGuess,
    requestRematch,
    resetAll,
    emitSelecting,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
