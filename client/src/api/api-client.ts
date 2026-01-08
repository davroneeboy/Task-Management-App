import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Task, CreateTaskDto, UpdateTaskDto } from '../types/task.types';
import { Project, CreateProjectDto, UpdateProjectDto } from '../types/project.types';

/**
 * API client for backend communication.
 */
class ApiClient {
  private client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.setupInterceptors();
  }
  private setupInterceptors(): void {
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.data && response.data.data) {
          return response.data.data;
        }
        return response.data;
      },
      (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
      },
    );
  }
  /**
   * Tasks API.
   */
  async getAllTasks(): Promise<Task[]> {
    return this.client.get('/tasks');
  }
  async getTaskById(id: string): Promise<Task> {
    return this.client.get(`/tasks/${id}`);
  }
  async createTask(dto: CreateTaskDto): Promise<Task> {
    return this.client.post('/tasks', dto);
  }
  async updateTask(id: string, dto: UpdateTaskDto): Promise<Task> {
    return this.client.put(`/tasks/${id}`, dto);
  }
  async deleteTask(id: string): Promise<void> {
    return this.client.delete(`/tasks/${id}`);
  }
  /**
   * Projects API (placeholder for future implementation).
   */
  async getAllProjects(): Promise<Project[]> {
    return this.client.get('/projects');
  }
  async getProjectById(id: string): Promise<Project> {
    return this.client.get(`/projects/${id}`);
  }
  async createProject(dto: CreateProjectDto): Promise<Project> {
    return this.client.post('/projects', dto);
  }
  async updateProject(id: string, dto: UpdateProjectDto): Promise<Project> {
    return this.client.put(`/projects/${id}`, dto);
  }
  async deleteProject(id: string): Promise<void> {
    return this.client.delete(`/projects/${id}`);
  }
}

export const apiClient = new ApiClient();
