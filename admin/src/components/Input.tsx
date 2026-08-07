import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { clsx } from '../utils/cls';

interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...rest }: FieldProps) {
  return (
    <div className="txi-field">
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} className={clsx('txi-input', error && 'txi-input-error', className)} {...rest} />
      {error && <span className="txi-error-msg">{error}</span>}
    </div>
  );
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  rows?: number;
}

export function Textarea({ label, error, className, id, rows = 4, ...rest }: TextAreaProps) {
  return (
    <div className="txi-field">
      {label && <label htmlFor={id}>{label}</label>}
      <textarea id={id} rows={rows} className={clsx('txi-input', error && 'txi-input-error', className)} {...rest} />
      {error && <span className="txi-error-msg">{error}</span>}
    </div>
  );
}
