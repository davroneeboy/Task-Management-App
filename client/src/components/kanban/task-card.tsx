import { useDrag } from 'react-dnd';
import { Task } from '../../types/task.types';
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
  return (
    <div
      ref={drag}
      className={`task-card ${isDragging ? 'task-card--dragging' : ''}`}
      onClick={onClick}
    >
      <div className="task-card__header">
        <h3 className="task-card__title">{task.title}</h3>
      </div>
      {task.description && (
        <p className="task-card__description">{task.description}</p>
      )}
      {task.assigneeName && (
        <div className="task-card__assignee">
          <span className="task-card__assignee-label">Назначено:</span>
          <span className="task-card__assignee-name">{task.assigneeName}</span>
        </div>
      )}
    </div>
  );
}
