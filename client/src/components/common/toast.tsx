import { useEffect } from 'react';
import './toast.css';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

/**
 * Toast notification component.
 */
export function Toast({
  message,
  type,
  onClose,
  duration = 3000,
}: ToastProps): JSX.Element {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  const getIcon = (): string => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'info':
        return 'ℹ️';
      default:
        return 'ℹ️';
    }
  };
  return (
    <div className={`toast toast--${type}`}>
      <span className="toast__icon">{getIcon()}</span>
      <span className="toast__message">{message}</span>
      <button className="toast__close" onClick={onClose} aria-label="Закрыть">
        ×
      </button>
    </div>
  );
}
