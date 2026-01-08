/**
 * Validation utility functions.
 */
export class ValidationUtil {
  /**
   * Checks if a string is not empty.
   */
  static isNotEmpty(value: string): boolean {
    return value.trim().length > 0;
  }
  /**
   * Checks if a value is defined.
   */
  static isDefined<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
  }
}
