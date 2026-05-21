import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { SocketProvider } from './contexts/SocketContext';
import { GameProvider } from './contexts/GameContext';
import { GlobalStyle } from './GlobalStyle';
import { theme } from './theme';
import HomePage from './pages/HomePage';
import LobbyPage from './pages/LobbyPage';
import GamePage from './pages/GamePage';
import ResultPage from './pages/ResultPage';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <SocketProvider>
        <BrowserRouter>
          <GameProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/room/:code" element={<LobbyPage />} />
              <Route path="/game/:code" element={<GamePage />} />
              <Route path="/result/:code" element={<ResultPage />} />
            </Routes>
          </GameProvider>
        </BrowserRouter>
      </SocketProvider>
    </ThemeProvider>
  );
}
