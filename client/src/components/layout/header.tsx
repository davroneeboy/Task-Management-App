import { useUserStore } from '../../store/user-store';
import './header.css';

interface HeaderProps {
  onAddTask: () => void;
}

/**
 * Header component.
 */
export function Header({ onAddTask }: HeaderProps): JSX.Element {
  const currentUser = useUserStore((state) => state.currentUser);
  const isManager = useUserStore((state) => state.isManager());
  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__title">Kanban Board</h1>
        <div className="header__actions">
          {currentUser && (
            <div className="header__user">
              <span className="header__user-name">{currentUser.name}</span>
              <span className="header__user-role">
                {currentUser.role === 'MANAGER' ? 'Менеджер' : 'Разработчик'}
              </span>
            </div>
          )}
          {isManager && (
            <button className="btn btn-primary" onClick={onAddTask}>
              + Создать задачу
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
