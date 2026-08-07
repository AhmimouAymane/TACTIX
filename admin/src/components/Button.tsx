import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx } from '../utils/cls';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leadingIcon?: ReactNode;
  full?: boolean;
  children: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', loading, leadingIcon, disabled, full, className, children, ...rest }: ButtonProps) {
  return (
    <button
      className={clsx('txi-btn', `txi-btn-${variant}`, `txi-btn-${size}`, full && 'txi-btn-full', loading && 'txi-btn-loading', className)}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <span className="txi-spinner" aria-label="loading" />
      ) : leadingIcon ? (
        <span className="txi-icon">{leadingIcon}</span>
      ) : null}
      <span>{children}</span>
    </button>
  );
}
