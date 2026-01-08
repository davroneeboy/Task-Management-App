import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { Task } from '../models/entities/task.entity';
import { CreateTaskDto } from '../models/dto/create-task.dto';
import { UpdateTaskDto } from '../models/dto/update-task.dto';
import { TaskOutput } from '../models/types/task-output.type';
import { TaskStatus } from '../models/types/task-status.enum';

/**
 * Service for task business logic and persistence.
 */
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: EntityRepository<Task>,
    private readonly em: EntityManager,
  ) {}
  /**
   * Creates a new task.
   */
  async createTask(createTaskDto: CreateTaskDto): Promise<TaskOutput> {
    const task = new Task();
    this.taskRepository.assign(task, {
      ...createTaskDto,
      status: createTaskDto.status || TaskStatus.TODO,
      order: createTaskDto.order || 0,
    });
    await this.em.persistAndFlush(task);
    return this.mapToOutput(task);
  }
  /**
   * Retrieves all tasks.
   */
  async findAllTasks(): Promise<TaskOutput[]> {
    try {
      const tasks = await this.taskRepository.findAll();
      return tasks.map((task) => this.mapToOutput(task));
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }
  /**
   * Retrieves a task by ID.
   */
  async findTaskById(id: string): Promise<TaskOutput> {
    const task = await this.taskRepository.findOne({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return this.mapToOutput(task);
  }
  /**
   * Updates a task.
   */
  async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskOutput> {
    const task = await this.taskRepository.findOne({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    this.taskRepository.assign(task, updateTaskDto);
    await this.em.flush();
    return this.mapToOutput(task);
  }
  /**
   * Deletes a task.
   */
  async deleteTask(id: string): Promise<void> {
    const task = await this.taskRepository.findOne({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    await this.em.removeAndFlush(task);
  }
  /**
   * Maps entity to output type.
   */
  private mapToOutput(task: Task): TaskOutput {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      projectId: task.projectId,
      assigneeId: task.assigneeId,
      assigneeName: task.assigneeName,
      order: task.order,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
