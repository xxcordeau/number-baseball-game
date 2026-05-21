import { customAlphabet } from 'nanoid';
import { Room, Player, GuessEntry, GuessResult } from './types.js';
import { judge, isValidSecret } from './gameLogic.js';

const generateCode = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 6);

export class RoomManager {
  private rooms = new Map<string, Room>();
  private playerToRoom = new Map<string, string>();
  private disconnectTimers = new Map<string, NodeJS.Timeout>();

  setDisconnectTimer(socketId: string, timer: NodeJS.Timeout) {
    this.disconnectTimers.set(socketId, timer);
  }

  clearDisconnectTimer(socketId: string) {
    const timer = this.disconnectTimers.get(socketId);
    if (timer) {
      clearTimeout(timer);
      this.disconnectTimers.delete(socketId);
    }
  }

  // Replace old socket ID with new one when player reconnects
  reconnectPlayer(oldSocketId: string, newSocketId: string): Room | null {
    this.clearDisconnectTimer(oldSocketId);
    const code = this.playerToRoom.get(oldSocketId);
    if (!code) return null;
    const room = this.rooms.get(code);
    if (!room) return null;

    const player = room.players.find(p => p.id === oldSocketId);
    if (!player) return null;

    player.id = newSocketId;
    this.playerToRoom.delete(oldSocketId);
    this.playerToRoom.set(newSocketId, code);
    return room;
  }

  createRoom(hostSocketId: string, nickname: string): string {
    let code: string;
    do {
      code = generateCode();
    } while (this.rooms.has(code));

    const player: Player = {
      id: hostSocketId,
      nickname,
      secretNumber: null,
      guesses: [],
      isReady: false,
    };

    const room: Room = {
      code,
      players: [player],
      currentTurn: 1,
      activePlayerIndex: 0,
      phase: 'WAITING',
      winner: null,
      maxTurns: 10,
    };

    this.rooms.set(code, room);
    this.playerToRoom.set(hostSocketId, code);
    return code;
  }

  joinRoom(code: string, socketId: string, nickname: string): Room | null {
    const room = this.rooms.get(code);
    if (!room) return null;
    if (room.players.length >= 2) return null;
    if (room.phase !== 'WAITING') return null;

    const player: Player = {
      id: socketId,
      nickname,
      secretNumber: null,
      guesses: [],
      isReady: false,
    };

    room.players.push(player);
    room.phase = 'SETUP';
    this.playerToRoom.set(socketId, code);
    return room;
  }

  getRoom(code: string): Room | null {
    return this.rooms.get(code) ?? null;
  }

  getRoomByPlayer(socketId: string): Room | null {
    const code = this.playerToRoom.get(socketId);
    if (!code) return null;
    return this.rooms.get(code) ?? null;
  }

  setSecret(code: string, socketId: string, secret: number[]): boolean {
    const room = this.rooms.get(code);
    if (!room || room.phase !== 'SETUP') return false;
    if (!isValidSecret(secret)) return false;

    const player = room.players.find(p => p.id === socketId);
    if (!player || player.isReady) return false;

    player.secretNumber = secret;
    player.isReady = true;

    if (room.players.every(p => p.isReady)) {
      room.phase = 'PLAYING';
      room.activePlayerIndex = 0;
      room.currentTurn = 1;
    }

    return true;
  }

  areBothReady(code: string): boolean {
    const room = this.rooms.get(code);
    if (!room) return false;
    return room.players.every(p => p.isReady);
  }

  makeGuess(code: string, socketId: string, guess: number[]): { entry: GuessEntry; result: GuessResult } | null {
    const room = this.rooms.get(code);
    if (!room || room.phase !== 'PLAYING') return null;
    if (!isValidSecret(guess)) return null;

    const activePlayer = room.players[room.activePlayerIndex];
    if (activePlayer.id !== socketId) return null;

    const opponentIndex = room.activePlayerIndex === 0 ? 1 : 0;
    const opponent = room.players[opponentIndex];
    if (!opponent.secretNumber) return null;

    const result = judge(opponent.secretNumber, guess);
    const entry: GuessEntry = {
      guess,
      result,
      turn: room.currentTurn,
    };

    activePlayer.guesses.push(entry);

    if (result.isHomerun) {
      room.phase = 'FINISHED';
      room.winner = socketId;
    } else {
      if (room.activePlayerIndex === 1) {
        room.currentTurn++;
        if (room.currentTurn > room.maxTurns) {
          room.phase = 'FINISHED';
          room.winner = null;
        }
      }
      room.activePlayerIndex = opponentIndex;
    }

    return { entry, result };
  }

  getOpponentSecret(code: string, socketId: string): number[] | null {
    const room = this.rooms.get(code);
    if (!room) return null;
    const opponent = room.players.find(p => p.id !== socketId);
    return opponent?.secretNumber ?? null;
  }

  getPlayerIndex(code: string, socketId: string): number {
    const room = this.rooms.get(code);
    if (!room) return -1;
    return room.players.findIndex(p => p.id === socketId);
  }

  resetForRematch(code: string): void {
    const room = this.rooms.get(code);
    if (!room) return;

    room.players.forEach(p => {
      p.secretNumber = null;
      p.guesses = [];
      p.isReady = false;
    });
    room.currentTurn = 1;
    room.activePlayerIndex = 0;
    room.phase = 'SETUP';
    room.winner = null;
  }

  private rematchRequests = new Map<string, Set<string>>();

  requestRematch(code: string, socketId: string): 'requested' | 'start' | null {
    const room = this.rooms.get(code);
    if (!room || room.phase !== 'FINISHED') return null;

    if (!this.rematchRequests.has(code)) {
      this.rematchRequests.set(code, new Set());
    }
    const requests = this.rematchRequests.get(code)!;
    requests.add(socketId);

    if (requests.size >= 2) {
      this.rematchRequests.delete(code);
      this.resetForRematch(code);
      return 'start';
    }

    return 'requested';
  }

  removePlayer(socketId: string): string | null {
    const code = this.playerToRoom.get(socketId);
    if (!code) return null;

    this.playerToRoom.delete(socketId);
    const room = this.rooms.get(code);
    if (!room) return null;

    room.players = room.players.filter(p => p.id !== socketId);

    if (room.players.length === 0) {
      this.rooms.delete(code);
      this.rematchRequests.delete(code);
    }

    return code;
  }
}
