/**
 * Project interface.
 */
export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Create project DTO.
 */
export interface CreateProjectDto {
  name: string;
  description?: string;
}

/**
 * Update project DTO.
 */
export interface UpdateProjectDto {
  name?: string;
  description?: string;
}
