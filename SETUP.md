# Инструкция по запуску проекта

## Шаг 1: Настройка Backend

1. Установите зависимости:
```bash
npm install
```

2. Создайте файл `.env` на основе `.env.example`:
```bash
cp .env.example .env
```

3. Настройте базу данных PostgreSQL в `.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=task_management
```

4. Запустите миграции:
```bash
npm run migration:up
```

5. Запустите backend сервер:
```bash
npm run start:dev
```

Backend будет доступен на `http://localhost:3000`

## Шаг 2: Настройка Frontend

1. Перейдите в папку client:
```bash
cd client
```

2. Установите зависимости:
```bash
npm install
```

3. Запустите frontend сервер:
```bash
npm run dev
```

Frontend будет доступен на `http://localhost:3001`

## Проверка работы

1. Откройте браузер и перейдите на `http://localhost:3001`
2. Вы должны увидеть Kanban Board с тремя колонками: "К выполнению", "В работе", "Выполнено"
3. Нажмите "Создать задачу" (доступно для менеджера)
4. Попробуйте перетащить задачу между колонками (Drag & Drop)

## Возможные проблемы

### Backend не запускается
- Проверьте, что PostgreSQL запущен и доступен
- Убедитесь, что данные в `.env` правильные
- Проверьте, что порт 3000 свободен

### Frontend не подключается к Backend
- Убедитесь, что backend запущен на порту 3000
- Проверьте настройки CORS в `src/main.ts`
- Проверьте proxy настройки в `client/vite.config.ts`

### Ошибки с базой данных
- Убедитесь, что база данных создана
- Проверьте права доступа пользователя PostgreSQL
- Запустите миграции заново: `npm run migration:up`
