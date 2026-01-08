import { Options } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { Task } from '../modules/tasks/models/entities/task.entity';

/**
 * MikroORM configuration.
 * Using SQLite for development. For production, switch to PostgreSQL.
 */
export const mikroOrmConfig: Options<SqliteDriver> = {
  driver: SqliteDriver,
  dbName: process.env.DB_NAME || './task_management.db',
  entities: [Task],
  migrations: {
    path: './migrations',
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
