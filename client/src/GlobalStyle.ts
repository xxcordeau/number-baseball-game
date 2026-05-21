import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    font-family: 'Nunito', sans-serif;
    background: #FAFAF8;
    background-image: radial-gradient(circle, #e0ddd6 1px, transparent 1px);
    background-size: 24px 24px;
    color: #222222;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
  }

  input {
    font-family: inherit;
    outline: none;
    border: none;
  }

  ::selection {
    background: #FFD93D;
    color: #222;
  }
`;
