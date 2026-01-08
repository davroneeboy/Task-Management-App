import { Toast, ToastType } from './toast';
import './toast-container.css';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

/**
 * Toast container component.
 */
export function ToastContainer({
  toasts,
  onRemove,
}: ToastContainerProps): JSX.Element {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
}
