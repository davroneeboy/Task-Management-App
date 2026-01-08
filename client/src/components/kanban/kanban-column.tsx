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
      ref={drop}
      className={`kanban-column ${isOver ? 'kanban-column--over' : ''}`}
      style={{
        borderTop: `4px solid ${getStatusColor(status)}`,
      }}
    >
      <div className="kanban-column__header">
        <h2 className="kanban-column__title">{title}</h2>
        <span className="kanban-column__count">{tasks.length}</span>
      </div>
      <div className="kanban-column__content">
        {sortedTasks.length === 0 ? (
          <div className="kanban-column__empty">Нет задач</div>
        ) : (
          sortedTasks.map((task) => (
            <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
          ))
        )}
      </div>
    </div>
  );
}
