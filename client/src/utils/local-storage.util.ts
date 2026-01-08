/**
 * Local storage utility functions.
 */
export class LocalStorageUtil {
  private static readonly TASKS_KEY = 'kanban_tasks';
  private static readonly PROJECTS_KEY = 'kanban_projects';
  private static readonly LAST_SYNC_KEY = 'kanban_last_sync';
  /**
   * Saves tasks to local storage.
   */
  static saveTasks(tasks: unknown[]): void {
    try {
      localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
      localStorage.setItem(this.LAST_SYNC_KEY, new Date().toISOString());
    } catch (error) {
      console.error('Failed to save tasks to local storage:', error);
    }
  }
  /**
   * Loads tasks from local storage.
   */
  static loadTasks<T>(): T[] | null {
    try {
      const data = localStorage.getItem(this.TASKS_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load tasks from local storage:', error);
      return null;
    }
  }
  /**
   * Saves projects to local storage.
   */
  static saveProjects(projects: unknown[]): void {
    try {
      localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error('Failed to save projects to local storage:', error);
    }
  }
  /**
   * Loads projects from local storage.
   */
  static loadProjects<T>(): T[] | null {
    try {
      const data = localStorage.getItem(this.PROJECTS_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load projects from local storage:', error);
      return null;
    }
  }
  /**
   * Gets last sync timestamp.
   */
  static getLastSync(): string | null {
    return localStorage.getItem(this.LAST_SYNC_KEY);
  }
  /**
   * Clears all local storage data.
   */
  static clearAll(): void {
    localStorage.removeItem(this.TASKS_KEY);
    localStorage.removeItem(this.PROJECTS_KEY);
    localStorage.removeItem(this.LAST_SYNC_KEY);
  }
}
