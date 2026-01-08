import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { mikroOrmConfig } from './config/mikro-orm.config';

/**
 * Root application module.
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MikroOrmModule.forRoot(mikroOrmConfig),
    CoreModule,
    SharedModule,
    TasksModule,
  ],
})
export class AppModule {}
