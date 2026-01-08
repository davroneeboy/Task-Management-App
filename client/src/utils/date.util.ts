/**
 * Date utility functions.
 */
export class DateUtil {
  /**
   * Converts a date string to Date object.
   */
  static parseDate(date: string | Date): Date {
    if (date instanceof Date) {
      return date;
    }
    return new Date(date);
  }
  /**
   * Formats a date to readable string.
   */
  static formatDate(date: Date | string): string {
    const d = this.parseDate(date);
    return d.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
