import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TestAppModule } from './test-app.module';

describe('TasksController (e2e)', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestAppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });
  afterEach(async () => {
    await app.close();
  });
  describe('GET /tasks/admin/test', () => {
    it('should return ok status', () => {
      return request(app.getHttpServer())
        .get('/tasks/admin/test')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toEqual({ status: 'ok' });
        });
    });
  });
  describe('POST /tasks', () => {
    it('should create a task', () => {
      const inputCreateTaskDto = {
        title: 'E2E Test Task',
        description: 'E2E Test Description',
      };
      return request(app.getHttpServer())
        .post('/tasks')
        .send(inputCreateTaskDto)
        .expect(201)
        .expect((res) => {
          expect(res.body.data).toMatchObject({
            title: inputCreateTaskDto.title,
            description: inputCreateTaskDto.description,
            isCompleted: false,
          });
          expect(res.body.data.id).toBeDefined();
        });
    });
    it('should return 400 when title is missing', () => {
      const inputInvalidDto = {
        description: 'Test Description',
      };
      return request(app.getHttpServer())
        .post('/tasks')
        .send(inputInvalidDto)
        .expect(400);
    });
  });
  describe('GET /tasks', () => {
    it('should return all tasks', () => {
      return request(app.getHttpServer())
        .get('/tasks')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body.data)).toBe(true);
        });
    });
  });
});
