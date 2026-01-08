import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../models/dto/create-task.dto';
import { UpdateTaskDto } from '../models/dto/update-task.dto';
import { TaskOutput } from '../models/types/task-output.type';

/**
 * Controller for task routes.
 */
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  /**
   * Creates a new task.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskOutput> {
    return this.taskService.createTask(createTaskDto);
  }
  /**
   * Retrieves all tasks.
   */
  @Get()
  async findAllTasks(): Promise<TaskOutput[]> {
    return this.taskService.findAllTasks();
  }
  /**
   * Retrieves a task by ID.
   */
  @Get(':id')
  async findTaskById(@Param('id') id: string): Promise<TaskOutput> {
    return this.taskService.findTaskById(id);
  }
  /**
   * Updates a task.
   */
  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskOutput> {
    return this.taskService.updateTask(id, updateTaskDto);
  }
  /**
   * Deletes a task.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }
  /**
   * Smoke test endpoint.
   */
  @Get('admin/test')
  @HttpCode(HttpStatus.OK)
  async test(): Promise<{ status: string }> {
    return { status: 'ok' };
  }
}
