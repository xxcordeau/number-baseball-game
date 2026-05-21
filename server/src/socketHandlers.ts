import { Server, Socket } from 'socket.io';
import { RoomManager } from './roomManager.js';
import { isValidSecret } from './gameLogic.js';
import { ClientEvents, ServerEvents } from './types.js';

const TURN_DURATION = 25_000; // 25 seconds

export function registerSocketHandlers(
  io: Server<ClientEvents, ServerEvents>,
  roomManager: RoomManager,
) {

  function emitTurnChange(room: ReturnType<RoomManager['getRoom']>) {
    if (!room) return;
    room.players.forEach(p => {
      const idx = roomManager.getPlayerIndex(room.code, p.id);
      if (idx === room.activePlayerIndex) {
        io.to(p.id).emit('game:your-turn');
      } else {
        io.to(p.id).emit('game:opponent-turn');
      }
    });
    // Start turn timer for the active player
    startTurnTimer(room.code);
  }

  function startTurnTimer(roomCode: string) {
    roomManager.clearTurnTimer(roomCode);
    const room = roomManager.getRoom(roomCode);
    if (!room || room.phase !== 'PLAYING') return;

    const activePlayer = room.players[room.activePlayerIndex];
    if (!activePlayer) return;

    const timer = setTimeout(() => {
      const currentRoom = roomManager.getRoom(roomCode);
      if (!currentRoom || currentRoom.phase !== 'PLAYING') return;

      const currentActive = currentRoom.players[currentRoom.activePlayerIndex];
      if (!currentActive || currentActive.id !== activePlayer.id) return;

      // Generate random guess (not the answer)
      const randomGuess = roomManager.generateRandomGuess(roomCode, activePlayer.id);
      console.log(`[timeout] ${activePlayer.id} timed out, auto-guess: ${randomGuess}`);

      // Notify the player their turn timed out
      io.to(activePlayer.id).emit('game:turn-timeout', randomGuess);

      // Process the guess through normal flow
      processGuess(roomCode, activePlayer.id, randomGuess);
    }, TURN_DURATION);

    roomManager.setTurnTimer(roomCode, timer);
  }

  function processGuess(roomCode: string, socketId: string, guess: number[]) {
    const room = roomManager.getRoom(roomCode);
    if (!room) return;

    const result = roomManager.makeGuess(roomCode, socketId, guess);
    if (!result) return;

    console.log(`[guess] ${socketId} guessed ${guess} => ${result.result.strike}S ${result.result.ball}B`);

    io.to(socketId).emit('game:guess-result', result.entry);

    const opponent = room.players.find(p => p.id !== socketId);
    if (opponent) {
      io.to(opponent.id).emit('game:opponent-guessed', result.result);
    }

    const updatedRoom = roomManager.getRoom(roomCode)!;
    if (updatedRoom.phase === 'FINISHED') {
      roomManager.clearTurnTimer(roomCode);
      updatedRoom.players.forEach(p => {
        const opponentSecret = roomManager.getOpponentSecret(roomCode, p.id);
        io.to(p.id).emit('game:finished', updatedRoom.winner, opponentSecret ?? []);
      });
    } else {
      emitTurnChange(updatedRoom);
    }
  }

  io.on('connection', (socket: Socket<ClientEvents, ServerEvents>) => {
    console.log(`Connected: ${socket.id}`);

    socket.on('room:create', (nickname: string) => {
      const code = roomManager.createRoom(socket.id, nickname);
      socket.join(code);
      socket.emit('room:created', code);
      console.log(`[room:create] ${socket.id} created room ${code} as "${nickname}"`);
    });

    socket.on('room:join', (code: string, nickname: string) => {
      const upperCode = code.toUpperCase();
      const room = roomManager.joinRoom(upperCode, socket.id, nickname);

      if (!room) {
        console.log(`[room:join] FAILED ${socket.id} tried to join ${upperCode}`);
        socket.emit('room:error', '방을 찾을 수 없거나 이미 가득 찼습니다.');
        return;
      }
      console.log(`[room:join] ${socket.id} joined room ${upperCode} as "${nickname}"`);

      socket.join(upperCode);
      socket.emit('room:joined', sanitizeRoom(room, socket.id));

      const host = room.players[0];
      io.to(host.id).emit('room:player-joined', {
        id: socket.id,
        nickname,
        secretNumber: null,
        guesses: [],
        isReady: false,
      });
    });

    socket.on('game:set-secret', (secret: number[]) => {
      const room = roomManager.getRoomByPlayer(socket.id);
      if (!room) return;

      if (!isValidSecret(secret)) {
        socket.emit('room:error', '유효하지 않은 숫자입니다.');
        return;
      }

      const success = roomManager.setSecret(room.code, socket.id, secret);
      if (!success) return;

      if (roomManager.areBothReady(room.code)) {
        const updatedRoom = roomManager.getRoom(room.code)!;
        updatedRoom.players.forEach(p => {
          io.to(p.id).emit('game:both-ready');
        });
        emitTurnChange(updatedRoom);
      }
    });

    socket.on('game:guess', (guess: number[]) => {
      const room = roomManager.getRoomByPlayer(socket.id);
      if (!room) {
        console.log(`[guess] room not found for ${socket.id}`);
        socket.emit('room:error', '연결이 끊어졌습니다. 새로고침 해주세요.');
        return;
      }

      if (!isValidSecret(guess)) {
        socket.emit('room:error', '유효하지 않은 숫자입니다.');
        return;
      }

      const activePlayer = room.players[room.activePlayerIndex];
      if (activePlayer.id !== socket.id) {
        console.log(`[guess] rejected: socketId=${socket.id}, active=${activePlayer?.id}, phase=${room.phase}, guess=${guess}`);
        socket.emit('room:error', '추측할 수 없습니다.');
        return;
      }

      // Clear the turn timer since player guessed in time
      roomManager.clearTurnTimer(room.code);

      processGuess(room.code, socket.id, guess);
    });

    socket.on('game:selecting', (digits: number[]) => {
      const room = roomManager.getRoomByPlayer(socket.id);
      if (!room || room.phase !== 'PLAYING') return;
      const opponent = room.players.find(p => p.id !== socket.id);
      if (opponent) {
        io.to(opponent.id).emit('game:opponent-selecting', digits);
      }
    });

    socket.on('game:rematch', () => {
      const room = roomManager.getRoomByPlayer(socket.id);
      if (!room) return;

      const status = roomManager.requestRematch(room.code, socket.id);
      if (status === 'requested') {
        const opponent = room.players.find(p => p.id !== socket.id);
        if (opponent) {
          io.to(opponent.id).emit('game:rematch-requested');
        }
      } else if (status === 'start') {
        room.players.forEach(p => {
          io.to(p.id).emit('game:rematch-start');
        });
      }
    });

    socket.on('disconnect', () => {
      console.log(`Disconnected: ${socket.id}`);
      const room = roomManager.getRoomByPlayer(socket.id);
      if (!room) return;

      // Give 30s grace period for reconnection
      const disconnectTimer = setTimeout(() => {
        const currentRoom = roomManager.getRoomByPlayer(socket.id);
        if (!currentRoom) return;
        roomManager.clearTurnTimer(currentRoom.code);
        const opponent = currentRoom.players.find(p => p.id !== socket.id);
        roomManager.removePlayer(socket.id);
        if (opponent) {
          io.to(opponent.id).emit('player:disconnected');
        }
        console.log(`Removed ${socket.id} after timeout from room ${currentRoom.code}`);
      }, 30000);

      // Store timer so reconnect can cancel it
      roomManager.setDisconnectTimer(socket.id, disconnectTimer);
    });
  });
}

function sanitizeRoom(room: any, forPlayerId: string) {
  return {
    ...room,
    players: room.players.map((p: any) => ({
      ...p,
      secretNumber: null,
    })),
  };
}
