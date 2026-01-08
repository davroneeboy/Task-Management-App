import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { AppModule } from './app.module';

const logger = new Logger('Bootstrap');

/**
 * Bootstrap function to start the application.
 */
async function bootstrap(): Promise<void> {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });

    // Initialize database schema
    try {
      const orm = app.get(MikroORM);
      const generator = orm.getSchemaGenerator();
      logger.log('Initializing database...');
      await generator.ensureDatabase();
      await generator.updateSchema();
      logger.log('Database schema updated successfully');
    } catch (error) {
      logger.error('Failed to initialize database:', error);
      throw error;
    }

    // Set global API prefix
    app.setGlobalPrefix('api');

    // Enable CORS
    app.enableCors({
      origin: ['http://localhost:3001', 'http://localhost:5173'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

    // Global validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    const port = process.env.PORT || 3000;
    await app.listen(port);

    logger.log(`🚀 Application is running on: http://localhost:${port}`);
    logger.log(`📚 API documentation: http://localhost:${port}/api`);

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      logger.log('SIGTERM signal received: closing HTTP server');
      await app.close();
      process.exit(0);
    });

    process.on('SIGINT', async () => {
      logger.log('SIGINT signal received: closing HTTP server');
      await app.close();
      process.exit(0);
    });
  } catch (error) {
    logger.error('Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap();
