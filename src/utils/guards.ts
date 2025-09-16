/**
 * Checks if a value is defined (not null or undefined).
 * This is a type guard, meaning it will narrow the type of the value if it returns true.
 * @param value The value to check.
 * @returns True if the value is defined, false otherwise.
 * @template T The type of the value.
 */
export const isDefined = <T>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined;
