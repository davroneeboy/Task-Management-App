/**
 * Date utility functions.
 */
export class DateUtil {
  /**
   * Formats a date to ISO string.
   */
  static formatToIso(date: Date): string {
    return date.toISOString();
  }
  /**
   * Checks if a date is in the past.
   */
  static isPast(date: Date): boolean {
    return date.getTime() < Date.now();
  }
  /**
   * Checks if a date is in the future.
   */
  static isFuture(date: Date): boolean {
    return date.getTime() > Date.now();
  }
}
