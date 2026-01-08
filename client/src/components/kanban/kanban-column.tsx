import { useDrop } from 'react-dnd';
import { Task, TaskStatus } from '../../types/task.types';
import { TaskCard } from './task-card';
import './kanban-column.css';

interface KanbanColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onTaskDrop: (taskId: string, newStatus: TaskStatus) => void;
}

/**
 * Kanban column component.
 */
export function KanbanColumn({
  status,
  title,
  tasks,
  onTaskClick,
  onTaskDrop,
}: KanbanColumnProps): JSX.Element {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item: { id: string; status: TaskStatus }) => {
      if (item.status !== status) {
        onTaskDrop(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  const sortedTasks = [...tasks].sort((a, b) => a.order - b.order);
  const getStatusColor = (status: TaskStatus): string => {
    switch (status) {
      case TaskStatus.TODO:
        return 'var(--color-todo)';
      case TaskStatus.IN_PROGRESS:
        return 'var(--color-in-progress)';
      case TaskStatus.DONE:
        return 'var(--color-done)';
      default:
        return 'var(--color-primary)';
    }
  };
  const getStatusIcon = (status: TaskStatus): string => {
    switch (status) {
      case TaskStatus.TODO:
        return '📋';
      case TaskStatus.IN_PROGRESS:
        return '⚙️';
      case TaskStatus.DONE:
        return '✅';
      default:
        return '📝';
    }
  };
  return (
    <div
      ref={drop}
      className={`kanban-column ${isOver ? 'kanban-column--over' : ''}`}
      style={{
        '--column-color': getStatusColor(status),
      } as React.CSSProperties}
    >
      <div className="kanban-column__header">
        <div className="kanban-column__title-wrapper">
          <div className="kanban-column__icon">{getStatusIcon(status)}</div>
          <h2 className="kanban-column__title">{title}</h2>
        </div>
        <span className="kanban-column__count">{tasks.length}</span>
      </div>
      <div className="kanban-column__content">
        {sortedTasks.length === 0 ? (
          <div className="kanban-column__empty">
            <div className="kanban-column__empty-icon">📭</div>
            <div>Нет задач</div>
          </div>
        ) : (
          sortedTasks.map((task) => (
            <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
          ))
        )}
      </div>
    </div>
  );
}
