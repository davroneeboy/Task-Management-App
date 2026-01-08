import { useState, useEffect } from 'react';
import { Task, TaskStatus, CreateTaskDto, UpdateTaskDto } from '../../types/task.types';
import './task-modal.css';

interface TaskModalProps {
  task?: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (dto: CreateTaskDto | UpdateTaskDto) => Promise<void>;
  isManager: boolean;
  availableUsers?: Array<{ id: string; name: string }>;
}

/**
 * Task modal component for creating and editing tasks.
 */
export function TaskModal({
  task,
  isOpen,
  onClose,
  onSave,
  isManager,
  availableUsers = [],
}: TaskModalProps): JSX.Element | null {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.TODO);
  const [assigneeId, setAssigneeId] = useState('');
  const [assigneeName, setAssigneeName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status);
      setAssigneeId(task.assigneeId || '');
      setAssigneeName(task.assigneeName || '');
    } else {
      setTitle('');
      setDescription('');
      setStatus(TaskStatus.TODO);
      setAssigneeId('');
      setAssigneeName('');
    }
  }, [task, isOpen]);
  if (!isOpen) {
    return null;
  }
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }
    setIsSaving(true);
    try {
      const dto: CreateTaskDto | UpdateTaskDto = {
        title: title.trim(),
        description: description.trim() || undefined,
        status,
        assigneeId: assigneeId || undefined,
        assigneeName: assigneeName || undefined,
      };
      await onSave(dto);
      onClose();
    } catch (error) {
      console.error('Failed to save task:', error);
    } finally {
      setIsSaving(false);
    }
  };
  const handleUserSelect = (userId: string): void => {
    setAssigneeId(userId);
    const user = availableUsers.find((u) => u.id === userId);
    setAssigneeName(user?.name || '');
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{task ? 'Редактировать задачу' : 'Создать задачу'}</h2>
          <button className="modal-close" onClick={onClose} type="button">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label required">
              Название
            </label>
            <input
              id="title"
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isSaving}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Описание
            </label>
            <textarea
              id="description"
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              disabled={isSaving}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status" className="form-label">
              Статус
            </label>
            <select
              id="status"
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              disabled={isSaving}
            >
              <option value={TaskStatus.TODO}>К выполнению</option>
              <option value={TaskStatus.IN_PROGRESS}>В работе</option>
              <option value={TaskStatus.DONE}>Выполнено</option>
            </select>
          </div>
          {isManager && availableUsers.length > 0 && (
            <div className="form-group">
              <label htmlFor="assignee" className="form-label">
                Назначить на
              </label>
              <select
                id="assignee"
                className="form-select"
                value={assigneeId}
                onChange={(e) => handleUserSelect(e.target.value)}
                disabled={isSaving}
              >
                <option value="">Не назначено</option>
                {availableUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSaving}>
              Отмена
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSaving || !title.trim()}>
              {isSaving ? 'Сохранение...' : task ? 'Сохранить' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
