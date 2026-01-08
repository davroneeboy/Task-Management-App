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
        return '#3b82f6';
      case TaskStatus.IN_PROGRESS:
        return '#f59e0b';
      case TaskStatus.DONE:
        return '#10b981';
      default:
        return '#667eea';
    }
  };
  return (
    <div
      ref={drag}
      className={`task-card ${isDragging ? 'task-card--dragging' : ''}`}
      onClick={onClick}
      style={{
        borderLeftColor: getStatusColor(task.status),
      }}
    >
      <div className="task-card__header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px' }}>{getStatusBadge(task.status)}</span>
          <h3 className="task-card__title">{task.title}</h3>
        </div>
      </div>
      {task.description && (
        <p className="task-card__description">{task.description}</p>
      )}
      {task.assigneeName && (
        <div className="task-card__assignee">
          <span className="task-card__assignee-label">👤</span>
          <span className="task-card__assignee-name">{task.assigneeName}</span>
        </div>
      )}
    </div>
  );
}
