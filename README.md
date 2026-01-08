# Task-Management-App

Полнофункциональное приложение для управления задачами с Kanban Board интерфейсом.

## Архитектура

Проект состоит из двух частей:
- **Backend** - NestJS API сервер с TypeScript и MikroORM
- **Frontend** - React + TypeScript Kanban Board клиент

## Features

### Backend (NestJS)
- Модульная архитектура по принципам NestJS
- TypeScript со строгой типизацией
- MikroORM для работы с PostgreSQL
- Глобальные фильтры исключений и interceptors
- Валидация входных данных с class-validator
- Unit и E2E тесты
- Принципы чистого кода и паттерны проектирования

### Frontend (React)
- Drag & Drop задачи между колонками
- CRUD операции для задач
- Статусы: Todo / In Progress / Done
- Локальное хранение + синхронизация с API
- Роль менеджера: создание, назначение, контроль задач
- Современный и красивый UI

## Project Structure

```
.
├── src/                    # Backend (NestJS)
│   ├── core/              # Global NestJS artifacts
│   ├── shared/            # Shared utilities
│   ├── modules/           # Feature modules
│   │   └── tasks/        # Tasks module
│   └── main.ts
├── client/                 # Frontend (React)
│   ├── src/
│   │   ├── api/          # API client
│   │   ├── components/   # React components
│   │   ├── store/        # Zustand stores
│   │   ├── types/        # TypeScript types
│   │   └── utils/        # Utilities
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

### Backend

1. Установите зависимости:
```bash
npm install
```

2. Создайте `.env` файл на основе `.env.example`:
```bash
cp .env.example .env
```

3. Обновите `.env` файл с вашими данными базы данных

4. Запустите миграции базы данных:
```bash
npm run migration:up
```

### Frontend

1. Перейдите в папку client:
```bash
cd client
```

2. Установите зависимости:
```bash
npm install
```

## Running the Application

### Backend (Development)
```bash
npm run start:dev
```
Backend будет доступен на `http://localhost:3000`

### Frontend (Development)
```bash
cd client
npm run dev
```
Frontend будет доступен на `http://localhost:3001`

### Production

Backend:
```bash
npm run build
npm run start:prod
```

Frontend:
```bash
cd client
npm run build
npm run preview
```

## Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Test Coverage
```bash
npm run test:cov
```

## Code Style

The project follows strict TypeScript and NestJS conventions:

- English for all code and documentation
- Explicit types (no `any`)
- JSDoc for public APIs
- PascalCase for classes
- camelCase for variables and functions
- kebab-case for files and directories
- Short functions (< 20 instructions)
- SOLID principles
- Clean code patterns

## API Endpoints

### Tasks

- `GET /api/tasks` - Получить все задачи
- `GET /api/tasks/:id` - Получить задачу по ID
- `POST /api/tasks` - Создать новую задачу
- `PUT /api/tasks/:id` - Обновить задачу
- `DELETE /api/tasks/:id` - Удалить задачу
- `GET /api/tasks/admin/test` - Smoke test endpoint

## Технологии

### Backend
- NestJS 10
- TypeScript 5
- MikroORM 6
- PostgreSQL
- Jest для тестирования

### Frontend
- React 18
- TypeScript 5
- React DnD для Drag & Drop
- Zustand для state management
- Axios для API запросов
- Vite для сборки

## License

MIT
