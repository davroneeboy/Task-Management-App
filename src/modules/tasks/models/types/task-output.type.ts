import { TaskStatus } from './task-status.enum';

/**
 * Task output type.
 */
export type TaskOutput = {
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
};
