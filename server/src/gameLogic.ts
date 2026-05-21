import { GuessResult } from './types.js';

export function judge(answer: number[], guess: number[]): GuessResult {
  let strike = 0;
  let ball = 0;

  for (let i = 0; i < 3; i++) {
    if (guess[i] === answer[i]) {
      strike++;
    } else if (answer.includes(guess[i])) {
      ball++;
    }
  }

  return {
    strike,
    ball,
    isOut: strike === 0 && ball === 0,
    isHomerun: strike === 3,
  };
}

export function isValidSecret(digits: number[]): boolean {
  if (digits.length !== 3) return false;
  if (new Set(digits).size !== 3) return false;
  return digits.every(d => d >= 1 && d <= 9);
}
