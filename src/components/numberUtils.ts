/**
 * Rounds a number to a fixed number of decimal places
 * while keeping the result as a number.
 *
 * @param value - The number to round
 * @param decimals - Number of decimal places (default: 2)
 */
export function roundTo(value: number, decimals = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
