import { create } from 'zustand';
import { Project, CreateProjectDto, UpdateProjectDto } from '../types/project.types';
import { apiClient } from '../api/api-client';
import { LocalStorageUtil } from '../utils/local-storage.util';

interface ProjectStore {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  createProject: (dto: CreateProjectDto) => Promise<void>;
  updateProject: (id: string, dto: UpdateProjectDto) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

/**
 * Zustand store for project management.
 */
export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,
  fetchProjects: async (): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      const projects = await apiClient.getAllProjects();
      set({ projects, isLoading: false });
      LocalStorageUtil.saveProjects(projects);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch projects';
      set({ error: errorMessage, isLoading: false });
      const localProjects = LocalStorageUtil.loadProjects<Project>();
      if (localProjects) {
        set({ projects: localProjects });
      }
    }
  },
  createProject: async (dto: CreateProjectDto): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      const newProject = await apiClient.createProject(dto);
      const currentProjects = get().projects;
      const updatedProjects = [...currentProjects, newProject];
      set({ projects: updatedProjects, isLoading: false });
      LocalStorageUtil.saveProjects(updatedProjects);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create project';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },
  updateProject: async (id: string, dto: UpdateProjectDto): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      const updatedProject = await apiClient.updateProject(id, dto);
      const currentProjects = get().projects;
      const updatedProjects = currentProjects.map((project) =>
        project.id === id ? updatedProject : project,
      );
      set({ projects: updatedProjects, isLoading: false });
      LocalStorageUtil.saveProjects(updatedProjects);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update project';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },
  deleteProject: async (id: string): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.deleteProject(id);
      const currentProjects = get().projects;
      const updatedProjects = currentProjects.filter((project) => project.id !== id);
      set({ projects: updatedProjects, isLoading: false });
      LocalStorageUtil.saveProjects(updatedProjects);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete project';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },
}));
