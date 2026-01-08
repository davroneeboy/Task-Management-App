import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../models/dto/create-task.dto';
import { UpdateTaskDto } from '../models/dto/update-task.dto';
import { TaskOutput } from '../models/types/task-output.type';
import { TaskStatus } from '../models/types/task-status.enum';

describe('TaskController', () => {
  let controller: TaskController;
  let mockTaskService: jest.Mocked<TaskService>;
  const mockTaskOutput: TaskOutput = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: TaskStatus.TODO,
    order: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  beforeEach(async () => {
    mockTaskService = {
      createTask: jest.fn(),
      findAllTasks: jest.fn(),
      findTaskById: jest.fn(),
      updateTask: jest.fn(),
      deleteTask: jest.fn(),
    } as unknown as jest.Mocked<TaskService>;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
      ],
    }).compile();
    controller = module.get<TaskController>(TaskController);
  });
  describe('createTask', () => {
    it('should create a task', async () => {
      const inputCreateTaskDto: CreateTaskDto = {
        title: 'New Task',
        description: 'New Description',
      };
      const expectedResult: TaskOutput = mockTaskOutput;
      mockTaskService.createTask.mockResolvedValue(expectedResult);
      const actualResult = await controller.createTask(inputCreateTaskDto);
      expect(mockTaskService.createTask).toHaveBeenCalledWith(
        inputCreateTaskDto,
      );
      expect(actualResult).toEqual(expectedResult);
    });
  });
  describe('findAllTasks', () => {
    it('should return all tasks', async () => {
      const expectedResult: TaskOutput[] = [mockTaskOutput];
      mockTaskService.findAllTasks.mockResolvedValue(expectedResult);
      const actualResult = await controller.findAllTasks();
      expect(mockTaskService.findAllTasks).toHaveBeenCalled();
      expect(actualResult).toEqual(expectedResult);
    });
  });
  describe('findTaskById', () => {
    it('should return a task by id', async () => {
      const inputId = '1';
      const expectedResult: TaskOutput = mockTaskOutput;
      mockTaskService.findTaskById.mockResolvedValue(expectedResult);
      const actualResult = await controller.findTaskById(inputId);
      expect(mockTaskService.findTaskById).toHaveBeenCalledWith(inputId);
      expect(actualResult).toEqual(expectedResult);
    });
  });
  describe('updateTask', () => {
    it('should update a task', async () => {
      const inputId = '1';
      const inputUpdateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
      };
      const expectedResult: TaskOutput = {
        ...mockTaskOutput,
        ...inputUpdateTaskDto,
      };
      mockTaskService.updateTask.mockResolvedValue(expectedResult);
      const actualResult = await controller.updateTask(
        inputId,
        inputUpdateTaskDto,
      );
      expect(mockTaskService.updateTask).toHaveBeenCalledWith(
        inputId,
        inputUpdateTaskDto,
      );
      expect(actualResult).toEqual(expectedResult);
    });
  });
  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const inputId = '1';
      mockTaskService.deleteTask.mockResolvedValue(undefined);
      await controller.deleteTask(inputId);
      expect(mockTaskService.deleteTask).toHaveBeenCalledWith(inputId);
    });
  });
  describe('test', () => {
    it('should return ok status', async () => {
      const expectedResult = { status: 'ok' };
      const actualResult = await controller.test();
      expect(actualResult).toEqual(expectedResult);
    });
  });
});
