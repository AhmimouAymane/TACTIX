import type { ReactNode } from 'react';
import { clsx } from '../utils/cls';

interface ModalProps {
  open: boolean;
  title: ReactNode;
  onClose: () => void;
  footer?: ReactNode;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ open, title, onClose, footer, children, size = 'md' }: ModalProps) {
  if (!open) return null;
  const width = { sm: 420, md: 720, lg: 960 }[size];
  return (
    <div className="txi-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className={clsx('txi-modal', `txi-modal-${size}`)}
        style={{ maxWidth: width }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="txi-modal-header">
          <h2 className="txi-modal-title">{title}</h2>
          <button className="txi-btn txi-btn-ghost txi-btn-sm" onClick={onClose} aria-label="close">
            ×
          </button>
        </div>
        <div className="txi-modal-body">{children}</div>
        {footer && <div className="txi-modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
