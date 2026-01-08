import { useEffect, useState } from 'react';
import { useTaskStore } from './store/task-store';
import { useUserStore } from './store/user-store';
import { Task, TaskStatus, CreateTaskDto, UpdateTaskDto } from './types/task.types';
import { UserRole } from './types/user.types';
import { Header } from './components/layout/header';
import { KanbanBoard } from './components/kanban/kanban-board';
import { TaskModal } from './components/modals/task-modal';
import { ToastContainer } from './components/common/toast-container';
import { ToastType } from './components/common/toast';
import './App.css';

/**
 * Main App component.
 */
function App(): JSX.Element {
  const {
    tasks,
    isLoading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    loadFromLocalStorage,
  } = useTaskStore();
  const { setCurrentUser, isManager } = useUserStore();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: ToastType }>>([]);
  
  const addToast = (message: string, type: ToastType): void => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, message, type }]);
  };
  
  const removeToast = (id: string): void => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  useEffect(() => {
    loadFromLocalStorage();
    setCurrentUser({
      id: '1',
      name: 'Иван Иванов',
      email: 'ivan@example.com',
      role: UserRole.MANAGER,
    });
    fetchTasks();
  }, []);
  const handleTaskClick = (task: Task): void => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };
  const handleAddTask = (): void => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };
  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };
  const handleSaveTask = async (dto: CreateTaskDto | UpdateTaskDto): Promise<void> => {
    try {
      if (selectedTask) {
        await updateTask(selectedTask.id, dto as UpdateTaskDto);
        addToast('Задача успешно обновлена', 'success');
      } else {
        await createTask(dto as CreateTaskDto);
        addToast('Задача успешно создана', 'success');
      }
    } catch (error) {
      addToast('Ошибка при сохранении задачи', 'error');
    }
  };
  const handleTaskDrop = async (taskId: string, newStatus: TaskStatus): Promise<void> => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) {
      return;
    }
    const tasksInNewStatus = tasks.filter((t) => t.status === newStatus);
    const newOrder = tasksInNewStatus.length;
    await moveTask(taskId, newStatus, newOrder);
  };
  const availableUsers = [
    { id: '1', name: 'Иван Иванов' },
    { id: '2', name: 'Петр Петров' },
    { id: '3', name: 'Мария Сидорова' },
  ];
  if (isLoading && tasks.length === 0) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <div className="loading-text">Загрузка...</div>
      </div>
    );
  }
  return (
    <div className="app">
      <Header onAddTask={handleAddTask} />
      {error && (
        <div className="app-error">
          <p>Ошибка: {error}</p>
        </div>
      )}
      <main className="app-main">
        <KanbanBoard
          tasks={tasks}
          onTaskClick={handleTaskClick}
          onTaskDrop={handleTaskDrop}
        />
      </main>
      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        isManager={isManager()}
        availableUsers={availableUsers}
      />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;
