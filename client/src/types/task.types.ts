/**
 * Task status enum.
 */
export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

/**
 * Task interface.
 */
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  projectId?: string;
  assigneeId?: string;
  assigneeName?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Create task DTO.
 */
export interface CreateTaskDto {
  title: string;
  description?: string;
  status?: TaskStatus;
  projectId?: string;
  assigneeId?: string;
  assigneeName?: string;
  order?: number;
}

/**
 * Update task DTO.
 */
export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
  projectId?: string;
  assigneeId?: string;
  assigneeName?: string;
  order?: number;
}
