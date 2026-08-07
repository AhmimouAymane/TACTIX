import { clsx } from '../utils/cls';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface Props {
  value: string | number | undefined;
  placeholder?: string;
  options: Option[];
  onChange: (value: string) => void;
  size?: 'sm' | 'md';
  className?: string;
  disabled?: boolean;
}

export function Select({ value, placeholder = 'Select...', options, onChange, size = 'md', className, disabled }: Props) {
  return (
    <select
      className={clsx('txi-input', size === 'sm' && 'txi-btn-sm', className)}
      value={value ?? ''}
      disabled={disabled}
      style={size === 'sm' ? { padding: '4px 8px', fontSize: '13px' } : undefined}
      onChange={(e) => onChange(e.target.value)}
    >
      {placeholder && <option value="" disabled hidden>{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>
      ))}
    </select>
  );
}
