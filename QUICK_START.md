# Быстрый старт без PostgreSQL

Если у вас не установлен PostgreSQL, можно использовать SQLite для быстрой разработки.

## Вариант 1: Установить SQLite (рекомендуется для разработки)

### Шаг 1: Установите пакет
```bash
npm install @mikro-orm/sqlite
```

### Шаг 2: Обновите конфигурацию

Измените файл `src/config/mikro-orm.config.ts`:

```typescript
import { Options } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { Task } from '../modules/tasks/models/entities/task.entity';

export const mikroOrmConfig: Options<SqliteDriver> = {
  driver: SqliteDriver,
  dbName: './task_management.db',
  entities: [Task],
  migrations: {
    path: './migrations',
    transactional: true,
    allOrNothing: true,
    dropTables: false,
    safe: false,
    snapshot: true,
    emit: 'ts',
  },
};
```

### Шаг 3: Обновите mikro-orm.config.ts в корне

Измените файл `mikro-orm.config.ts` аналогично.

### Шаг 4: Запустите приложение
```bash
npm run start:dev
```

База данных SQLite будет создана автоматически в файле `task_management.db`.

## Вариант 2: Установить PostgreSQL

### Windows:

1. Скачайте PostgreSQL: https://www.postgresql.org/download/windows/
2. Установите с настройками по умолчанию
3. Запомните пароль для пользователя `postgres`
4. Создайте базу данных:
   ```sql
   CREATE DATABASE task_management;
   ```
5. Обновите `.env` файл с вашим паролем

### Проверка установки:
```bash
psql --version
```

## Вариант 3: Использовать Docker (если установлен)

```bash
docker run --name postgres-task -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=task_management -p 5432:5432 -d postgres
```

Затем в `.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=task_management
```
