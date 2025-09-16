/**
 * Computes the sum of an array of numbers.
 * @param values An array of numbers.
 * @returns The sum of the numbers in the array.
 */
export const computeScore = (values: number[]): number =>
  values.reduce((acc, v) => acc + v, 0);
