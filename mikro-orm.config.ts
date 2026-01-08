import { Options } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { Task } from './src/modules/tasks/models/entities/task.entity';

const config: Options<SqliteDriver> = {
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

export default config;
