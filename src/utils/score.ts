export const computeScore = (values: number[]): number =>
  values.reduce((acc, v) => acc + v, 0);
