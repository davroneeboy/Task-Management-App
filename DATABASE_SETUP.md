# Настройка базы данных PostgreSQL

## Проблема: ECONNREFUSED

Ошибка `ECONNREFUSED` означает, что приложение не может подключиться к PostgreSQL.

## Решение

### Шаг 1: Убедитесь, что PostgreSQL запущен

**Windows:**
```powershell
# Проверьте статус службы PostgreSQL
Get-Service -Name postgresql*

# Если не запущен, запустите:
Start-Service -Name postgresql-x64-14  # замените на вашу версию
```

**Или через Services (Службы):**
1. Нажмите `Win + R`
2. Введите `services.msc`
3. Найдите PostgreSQL
4. Убедитесь, что служба запущена

### Шаг 2: Проверьте настройки в .env

Убедитесь, что файл `.env` содержит правильные настройки:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=ваш_пароль_postgres
DB_NAME=task_management

PORT=3000
NODE_ENV=development
```

### Шаг 3: Создайте базу данных

Подключитесь к PostgreSQL и создайте базу данных:

**Через psql:**
```bash
psql -U postgres
```

Затем выполните:
```sql
CREATE DATABASE task_management;
\q
```

**Или через pgAdmin:**
1. Откройте pgAdmin
2. Подключитесь к серверу
3. Правой кнопкой на "Databases" → "Create" → "Database"
4. Имя: `task_management`
5. Сохраните

### Шаг 4: Проверьте подключение

Попробуйте подключиться вручную:
```bash
psql -U postgres -d task_management -h localhost -p 5432
```

Если подключение успешно, значит настройки правильные.

### Шаг 5: Запустите миграции (опционально)

После создания базы данных:
```bash
npm run migration:up
```

### Альтернатива: Использовать SQLite для разработки

Если не хотите настраивать PostgreSQL, можно временно использовать SQLite:

1. Установите пакет:
```bash
npm install @mikro-orm/sqlite
```

2. Измените конфигурацию в `src/config/mikro-orm.config.ts`:
```typescript
import { SqliteDriver } from '@mikro-orm/sqlite';

export const mikroOrmConfig: Options<SqliteDriver> = {
  driver: SqliteDriver,
  dbName: './task_management.db',
  // ... остальные настройки
};
```

## Проверка

После настройки перезапустите приложение:
```bash
npm run start:dev
```

Если все настроено правильно, вы увидите:
```
[Nest] LOG [NestFactory] Starting Nest application...
[Nest] LOG [InstanceLoader] MikroOrmModule dependencies initialized
Application is running on: http://localhost:3000
```
