import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { NotFoundException } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '../models/entities/task.entity';
import { CreateTaskDto } from '../models/dto/create-task.dto';
import { UpdateTaskDto } from '../models/dto/update-task.dto';

describe('TaskService', () => {
  let service: TaskService;
  let mockRepository: jest.Mocked<EntityRepository<Task>>;
  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Task;
  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      persistAndFlush: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      assign: jest.fn(),
      flush: jest.fn(),
      removeAndFlush: jest.fn(),
    } as unknown as jest.Mocked<EntityRepository<Task>>;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockRepository,
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
      } as Task;
      mockRepository.create.mockReturnValue(expectedTask);
      mockRepository.persistAndFlush.mockResolvedValue(undefined);
      const actualResult = await service.createTask(inputCreateTaskDto);
      expect(mockRepository.create).toHaveBeenCalledWith(inputCreateTaskDto);
      expect(mockRepository.persistAndFlush).toHaveBeenCalledWith(
        expectedTask,
      );
      expect(actualResult).toMatchObject({
        id: expectedTask.id,
        title: expectedTask.title,
        description: expectedTask.description,
        isCompleted: expectedTask.isCompleted,
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
        isCompleted: true,
      };
      const updatedTask: Task = {
        ...mockTask,
        ...inputUpdateTaskDto,
      } as Task;
      mockRepository.findOne.mockResolvedValue(mockTask);
      mockRepository.assign.mockImplementation((task, dto) => {
        Object.assign(task, dto);
      });
      mockRepository.flush.mockResolvedValue(undefined);
      const actualResult = await service.updateTask(
        inputId,
        inputUpdateTaskDto,
      );
      expect(mockRepository.findOne).toHaveBeenCalledWith({ id: inputId });
      expect(mockRepository.assign).toHaveBeenCalledWith(
        mockTask,
        inputUpdateTaskDto,
      );
      expect(mockRepository.flush).toHaveBeenCalled();
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
      mockRepository.removeAndFlush.mockResolvedValue(undefined);
      await service.deleteTask(inputId);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ id: inputId });
      expect(mockRepository.removeAndFlush).toHaveBeenCalledWith(mockTask);
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
