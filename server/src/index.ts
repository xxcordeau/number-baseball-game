import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { RoomManager } from './roomManager.js';
import { registerSocketHandlers } from './socketHandlers.js';

const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5180';

const app = express();
app.use(cors({ origin: CLIENT_URL }));

app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Number Baseball Server' });
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_URL,
    methods: ['GET', 'POST'],
  },
});

const roomManager = new RoomManager();
registerSocketHandlers(io, roomManager);

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
