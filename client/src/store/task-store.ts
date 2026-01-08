import { create } from 'zustand';
import { Task, TaskStatus, CreateTaskDto, UpdateTaskDto } from '../types/task.types';
import { apiClient } from '../api/api-client';
import { LocalStorageUtil } from '../utils/local-storage.util';

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (dto: CreateTaskDto) => Promise<void>;
  updateTask: (id: string, dto: UpdateTaskDto) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  moveTask: (taskId: string, newStatus: TaskStatus, newOrder: number) => Promise<void>;
  syncWithLocalStorage: () => void;
  loadFromLocalStorage: () => void;
}

/**
 * Zustand store for task management.
 */
export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,
  fetchTasks: async (): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      const tasks = await apiClient.getAllTasks();
      const normalizedTasks = tasks.map((task) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
      }));
      set({ tasks: normalizedTasks, isLoading: false });
      LocalStorageUtil.saveTasks(normalizedTasks);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch tasks';
      set({ error: errorMessage, isLoading: false });
      const localTasks = LocalStorageUtil.loadTasks<Task>();
      if (localTasks) {
        set({ tasks: localTasks });
      }
    }
  },
  createTask: async (dto: CreateTaskDto): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      const newTask = await apiClient.createTask(dto);
      const normalizedTask = {
        ...newTask,
        createdAt: new Date(newTask.createdAt),
        updatedAt: new Date(newTask.updatedAt),
      };
      const currentTasks = get().tasks;
      const updatedTasks = [...currentTasks, normalizedTask];
      set({ tasks: updatedTasks, isLoading: false });
      LocalStorageUtil.saveTasks(updatedTasks);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create task';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },
  updateTask: async (id: string, dto: UpdateTaskDto): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      const updatedTask = await apiClient.updateTask(id, dto);
      const normalizedTask = {
        ...updatedTask,
        createdAt: new Date(updatedTask.createdAt),
        updatedAt: new Date(updatedTask.updatedAt),
      };
      const currentTasks = get().tasks;
      const updatedTasks = currentTasks.map((task) =>
        task.id === id ? normalizedTask : task,
      );
      set({ tasks: updatedTasks, isLoading: false });
      LocalStorageUtil.saveTasks(updatedTasks);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update task';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },
  deleteTask: async (id: string): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.deleteTask(id);
      const currentTasks = get().tasks;
      const updatedTasks = currentTasks.filter((task) => task.id !== id);
      set({ tasks: updatedTasks, isLoading: false });
      LocalStorageUtil.saveTasks(updatedTasks);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete task';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },
  moveTask: async (taskId: string, newStatus: TaskStatus, newOrder: number): Promise<void> => {
    const currentTasks = get().tasks;
    const task = currentTasks.find((t) => t.id === taskId);
    if (!task) {
      return;
    }
    const optimisticTasks = currentTasks.map((t) =>
      t.id === taskId ? { ...t, status: newStatus, order: newOrder } : t,
    );
    set({ tasks: optimisticTasks });
    LocalStorageUtil.saveTasks(optimisticTasks);
    try {
      await apiClient.updateTask(taskId, { status: newStatus, order: newOrder });
    } catch (error) {
      set({ tasks: currentTasks });
      LocalStorageUtil.saveTasks(currentTasks);
      const errorMessage = error instanceof Error ? error.message : 'Failed to move task';
      set({ error: errorMessage });
    }
  },
  syncWithLocalStorage: (): void => {
    const tasks = get().tasks;
    LocalStorageUtil.saveTasks(tasks);
  },
  loadFromLocalStorage: (): void => {
    const localTasks = LocalStorageUtil.loadTasks<Task>();
    if (localTasks) {
      set({ tasks: localTasks });
    }
  },
}));
