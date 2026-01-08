# React TypeScript Kanban Board

Kanban Board приложение для управления задачами, построенное на React + TypeScript.

## Фичи

- ✅ Drag & Drop задач между колонками
- ✅ CRUD операции для задач
- ✅ Статусы: Todo / In Progress / Done
- ✅ Локальное хранение + синхронизация с API
- ✅ Роль менеджера: создание, назначение, контроль задач
- ✅ Современный и красивый UI

## Технологии

- **React 18** + **TypeScript**
- **React DnD** - для Drag & Drop функциональности
- **Zustand** - для state management
- **Axios** - для REST API запросов
- **Vite** - сборщик и dev server

## Установка

```bash
npm install
```

## Запуск

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

Приложение будет доступно на `http://localhost:3001`

## Структура проекта

```
client/
├── src/
│   ├── api/              # API клиент
│   ├── components/       # React компоненты
│   │   ├── kanban/      # Kanban компоненты
│   │   ├── layout/      # Layout компоненты
│   │   └── modals/      # Модальные окна
│   ├── store/           # Zustand stores
│   ├── types/           # TypeScript типы
│   ├── utils/           # Утилиты
│   ├── App.tsx          # Главный компонент
│   └── main.tsx         # Точка входа
├── package.json
└── vite.config.ts
```

## API

Приложение работает с NestJS бэкендом на `http://localhost:3000/api`

### Endpoints

- `GET /api/tasks` - получить все задачи
- `GET /api/tasks/:id` - получить задачу по ID
- `POST /api/tasks` - создать задачу
- `PUT /api/tasks/:id` - обновить задачу
- `DELETE /api/tasks/:id` - удалить задачу

## Локальное хранение

Приложение автоматически сохраняет данные в localStorage и синхронизирует с API. При отсутствии соединения с сервером используются данные из localStorage.

## Роли пользователей

- **MANAGER** - может создавать, редактировать и назначать задачи
- **DEVELOPER** - может просматривать и обновлять назначенные задачи
- **VIEWER** - только просмотр

## Лицензия

MIT
