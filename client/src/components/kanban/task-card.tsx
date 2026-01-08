import { useDrag } from 'react-dnd';
import { Task, TaskStatus } from '../../types/task.types';
import './task-card.css';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

/**
 * Task card component for Kanban board.
 */
export function TaskCard({ task, onClick }: TaskCardProps): JSX.Element {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const getStatusBadge = (status: TaskStatus): string => {
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
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  return (
    <div
      ref={drag}
      className={`task-card ${isDragging ? 'task-card--dragging' : ''}`}
      onClick={onClick}
      style={{
        '--task-color': getStatusColor(task.status),
      } as React.CSSProperties}
    >
      <div className="task-card__header">
        <div className="task-card__status-badge">{getStatusBadge(task.status)}</div>
        <h3 className="task-card__title">{task.title}</h3>
      </div>
      {task.description && (
        <p className="task-card__description">{task.description}</p>
      )}
      {task.assigneeName && (
        <div className="task-card__footer">
          <div className="task-card__assignee">
            <div className="task-card__assignee-avatar">
              {getInitials(task.assigneeName)}
            </div>
            <span className="task-card__assignee-name">{task.assigneeName}</span>
          </div>
        </div>
      )}
    </div>
  );
}
