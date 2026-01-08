import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';
import { Task } from './models/entities/task.entity';

/**
 * Tasks module.
 */
@Module({
  imports: [MikroOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TasksModule {}
