import { Controller, Get } from '@nestjs/common';

/**
 * Root application controller.
 */
@Controller()
export class AppController {
  /**
   * Root endpoint with API information.
   */
  @Get()
  getApiInfo(): { message: string; version: string; endpoints: string[] } {
    return {
      message: 'Task Management API',
      version: '1.0.0',
      endpoints: [
        'GET /api/tasks - Get all tasks',
        'GET /api/tasks/:id - Get task by ID',
        'POST /api/tasks - Create a new task',
        'PUT /api/tasks/:id - Update a task',
        'DELETE /api/tasks/:id - Delete a task',
        'GET /api/tasks/admin/test - Smoke test endpoint',
      ],
    };
  }
}
