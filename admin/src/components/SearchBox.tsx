import { clsx } from '../utils/cls';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export function SearchBox({ value, onChange, placeholder = 'Search…', onClear }: Props) {
  return (
    <div className="txi-search">
      <span className="txi-search-icon" style={{ left: 10, color: 'var(--txi-text-muted)' }}>🔍</span>
      <input
        type="search"
        className={clsx('txi-input')}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ paddingLeft: 36, borderRadius: 'var(--txi-radius-pill)' }}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          aria-label="clear search"
          className="txi-btn txi-btn-ghost txi-btn-sm"
          style={{ position: 'absolute', right: 6, background: 'transparent' }}
        >
          ×
        </button>
      )}
    </div>
  );
}
