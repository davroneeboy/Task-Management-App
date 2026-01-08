import { Options } from '@mikro-orm/core';
import { Task } from '../modules/tasks/models/entities/task.entity';

/**
 * MikroORM configuration.
 */
export const mikroOrmConfig: Options = {
  type: 'postgresql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  dbName: process.env.DB_NAME || 'task_management',
  entities: [Task],
  migrations: {
    path: './migrations',
    pattern: /^[\w-]+\d+\.(ts|js)$/,
    transactional: true,
    disableForeignKeys: false,
    allOrNothing: true,
    dropTables: false,
    safe: false,
    snapshot: true,
    emit: 'ts',
  },
  seeder: {
    path: './seeders',
    defaultSeeder: 'DatabaseSeeder',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    fileName: (className: string) => className,
  },
};
