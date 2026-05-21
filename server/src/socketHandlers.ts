import { Server, Socket } from 'socket.io';
import { RoomManager } from './roomManager.js';
import { isValidSecret } from './gameLogic.js';
import { ClientEvents, ServerEvents } from './types.js';

export function registerSocketHandlers(
  io: Server<ClientEvents, ServerEvents>,
  roomManager: RoomManager,
) {
  io.on('connection', (socket: Socket<ClientEvents, ServerEvents>) => {
    console.log(`Connected: ${socket.id}`);

    socket.on('room:create', (nickname: string) => {
      const code = roomManager.createRoom(socket.id, nickname);
      socket.join(code);
      socket.emit('room:created', code);
    });

    socket.on('room:join', (code: string, nickname: string) => {
      const upperCode = code.toUpperCase();
      const room = roomManager.joinRoom(upperCode, socket.id, nickname);

      if (!room) {
        socket.emit('room:error', '방을 찾을 수 없거나 이미 가득 찼습니다.');
        return;
      }

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
          const idx = roomManager.getPlayerIndex(room.code, p.id);
          if (idx === updatedRoom.activePlayerIndex) {
            io.to(p.id).emit('game:your-turn');
          } else {
            io.to(p.id).emit('game:opponent-turn');
          }
        });
      }
    });

    socket.on('game:guess', (guess: number[]) => {
      const room = roomManager.getRoomByPlayer(socket.id);
      if (!room) return;

      const result = roomManager.makeGuess(room.code, socket.id, guess);
      if (!result) return;

      socket.emit('game:guess-result', result.entry);

      const opponent = room.players.find(p => p.id !== socket.id);
      if (opponent) {
        io.to(opponent.id).emit('game:opponent-guessed', result.result);
      }

      const updatedRoom = roomManager.getRoom(room.code)!;
      if (updatedRoom.phase === 'FINISHED') {
        updatedRoom.players.forEach(p => {
          const opponentSecret = roomManager.getOpponentSecret(room.code, p.id);
          io.to(p.id).emit('game:finished', updatedRoom.winner, opponentSecret ?? []);
        });
      } else {
        updatedRoom.players.forEach(p => {
          const idx = roomManager.getPlayerIndex(room.code, p.id);
          if (idx === updatedRoom.activePlayerIndex) {
            io.to(p.id).emit('game:your-turn');
          } else {
            io.to(p.id).emit('game:opponent-turn');
          }
        });
      }
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
      if (room) {
        const opponent = room.players.find(p => p.id !== socket.id);
        roomManager.removePlayer(socket.id);
        if (opponent) {
          io.to(opponent.id).emit('player:disconnected');
        }
      }
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
