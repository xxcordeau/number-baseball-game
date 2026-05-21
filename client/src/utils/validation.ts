export function isValidSecret(digits: number[]): boolean {
  if (digits.length !== 3) return false;
  if (new Set(digits).size !== 3) return false;
  return digits.every(d => d >= 1 && d <= 9);
}
