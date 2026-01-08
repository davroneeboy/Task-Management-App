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
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__left">
          <a href="/" className="header__logo">
            <div className="header__logo-icon">📊</div>
            <h1 className="header__title">Kanban Board</h1>
          </a>
        </div>
        <div className="header__actions">
          {currentUser && (
            <div className="header__user">
              <div className="header__user-avatar">
                {getInitials(currentUser.name)}
              </div>
              <div className="header__user-info">
                <span className="header__user-name">{currentUser.name}</span>
                <span className="header__user-role">
                  {currentUser.role === 'MANAGER' ? 'Менеджер' : 'Разработчик'}
                </span>
              </div>
            </div>
          )}
          {isManager && (
            <button className="btn btn-primary" onClick={onAddTask}>
              <span className="btn-icon">+</span>
              <span>Создать задачу</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
