import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { NotFoundException } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '../models/entities/task.entity';
import { CreateTaskDto } from '../models/dto/create-task.dto';
import { UpdateTaskDto } from '../models/dto/update-task.dto';
import { TaskStatus } from '../models/types/task-status.enum';

describe('TaskService', () => {
  let service: TaskService;
  let mockRepository: jest.Mocked<EntityRepository<Task>>;
  let mockEntityManager: jest.Mocked<EntityManager>;
  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: TaskStatus.TODO,
    order: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Task;
  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      assign: jest.fn(),
    } as unknown as jest.Mocked<EntityRepository<Task>>;
    mockEntityManager = {
      persistAndFlush: jest.fn(),
      flush: jest.fn(),
      removeAndFlush: jest.fn(),
    } as unknown as jest.Mocked<EntityManager>;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockRepository,
        },
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        },
      ],
    }).compile();
    service = module.get<TaskService>(TaskService);
  });
  describe('createTask', () => {
    it('should create a task successfully', async () => {
      const inputCreateTaskDto: CreateTaskDto = {
        title: 'New Task',
        description: 'New Description',
      };
      const expectedTask: Task = {
        ...mockTask,
        ...inputCreateTaskDto,
        status: TaskStatus.TODO,
        order: 0,
      } as Task;
      mockRepository.assign.mockImplementation((task, dto) => {
        Object.assign(task, dto);
        return task as Task;
      });
      mockEntityManager.persistAndFlush.mockResolvedValue(undefined);
      const actualResult = await service.createTask(inputCreateTaskDto);
      expect(mockRepository.assign).toHaveBeenCalled();
      expect(mockEntityManager.persistAndFlush).toHaveBeenCalledWith(
        expectedTask,
      );
      expect(actualResult).toMatchObject({
        id: expectedTask.id,
        title: expectedTask.title,
        description: expectedTask.description,
        status: expectedTask.status,
      });
    });
  });
  describe('findAllTasks', () => {
    it('should return all tasks', async () => {
      const expectedTasks: Task[] = [mockTask];
      mockRepository.findAll.mockResolvedValue(expectedTasks);
      const actualResult = await service.findAllTasks();
      expect(mockRepository.findAll).toHaveBeenCalled();
      expect(actualResult).toHaveLength(1);
      expect(actualResult[0]).toMatchObject({
        id: mockTask.id,
        title: mockTask.title,
      });
    });
  });
  describe('findTaskById', () => {
    it('should return a task by id', async () => {
      const inputId = '1';
      mockRepository.findOne.mockResolvedValue(mockTask);
      const actualResult = await service.findTaskById(inputId);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ id: inputId });
      expect(actualResult).toMatchObject({
        id: mockTask.id,
        title: mockTask.title,
      });
    });
    it('should throw NotFoundException when task not found', async () => {
      const inputId = '999';
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.findTaskById(inputId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
  describe('updateTask', () => {
    it('should update a task successfully', async () => {
      const inputId = '1';
      const inputUpdateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        status: TaskStatus.IN_PROGRESS,
      };
      const updatedTask: Task = {
        ...mockTask,
        ...inputUpdateTaskDto,
      } as Task;
      mockRepository.findOne.mockResolvedValue(mockTask);
      mockRepository.assign.mockImplementation((task, dto) => {
        Object.assign(task, dto);
        return task as Task;
      });
      mockEntityManager.flush.mockResolvedValue(undefined);
      const actualResult = await service.updateTask(
        inputId,
        inputUpdateTaskDto,
      );
      expect(mockRepository.findOne).toHaveBeenCalledWith({ id: inputId });
      expect(mockRepository.assign).toHaveBeenCalledWith(
        mockTask,
        inputUpdateTaskDto,
      );
      expect(mockEntityManager.flush).toHaveBeenCalled();
    });
    it('should throw NotFoundException when task not found', async () => {
      const inputId = '999';
      const inputUpdateTaskDto: UpdateTaskDto = { title: 'Updated' };
      mockRepository.findOne.mockResolvedValue(null);
      await expect(
        service.updateTask(inputId, inputUpdateTaskDto),
      ).rejects.toThrow(NotFoundException);
    });
  });
  describe('deleteTask', () => {
    it('should delete a task successfully', async () => {
      const inputId = '1';
      mockRepository.findOne.mockResolvedValue(mockTask);
      mockEntityManager.removeAndFlush.mockResolvedValue(undefined);
      await service.deleteTask(inputId);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ id: inputId });
      expect(mockEntityManager.removeAndFlush).toHaveBeenCalledWith(mockTask);
    });
    it('should throw NotFoundException when task not found', async () => {
      const inputId = '999';
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.deleteTask(inputId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
