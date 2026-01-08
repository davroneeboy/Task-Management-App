import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Task, TaskStatus } from '../../types/task.types';
import { KanbanColumn } from './kanban-column';
import './kanban-board.css';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onTaskDrop: (taskId: string, newStatus: TaskStatus) => void;
}

const COLUMNS: Array<{ status: TaskStatus; title: string }> = [
  { status: TaskStatus.TODO, title: 'К выполнению' },
  { status: TaskStatus.IN_PROGRESS, title: 'В работе' },
  { status: TaskStatus.DONE, title: 'Выполнено' },
];

/**
 * Kanban board component.
 */
export function KanbanBoard({
  tasks,
  onTaskClick,
  onTaskDrop,
}: KanbanBoardProps): JSX.Element {
  const getTasksByStatus = (status: TaskStatus): Task[] => {
    return tasks.filter((task) => task.status === status);
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="kanban-board">
        {COLUMNS.map((column) => (
          <KanbanColumn
            key={column.status}
            status={column.status}
            title={column.title}
            tasks={getTasksByStatus(column.status)}
            onTaskClick={onTaskClick}
            onTaskDrop={onTaskDrop}
          />
        ))}
      </div>
    </DndProvider>
  );
}
