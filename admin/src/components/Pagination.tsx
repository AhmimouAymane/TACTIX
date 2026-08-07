import { Button } from './Button';
import { clsx } from '../utils/cls';

interface Props {
  page: number;
  totalPages: number;
  total: number;
  perPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, total, perPage, onPageChange }: Props) {
  const canPrev = page > 1;
  const canNext = page < totalPages;
  const start = total === 0 ? 0 : (page - 1) * perPage + 1;
  const end = total === 0 ? 0 : Math.min(page * perPage, total);

  return (
    <div className="txi-pagination">
      <span style={{ color: 'var(--txi-text-muted)' }}>
        {start}-{end} of {total}
      </span>
      <Button variant="ghost" size="sm" onClick={() => onPageChange(1)} disabled={!canPrev}>
        First
      </Button>
      <Button variant="ghost" size="sm" onClick={() => onPageChange(page - 1)} disabled={!canPrev}>
        Prev
      </Button>
      <span className="txi-pagination-page">{page} / {totalPages}</span>
      <Button variant="ghost" size="sm" onClick={() => onPageChange(page + 1)} disabled={!canNext}>
        Next
      </Button>
      <Button variant="ghost" size="sm" onClick={() => onPageChange(totalPages)} disabled={!canNext}>
        Last
      </Button>
    </div>
  );
}

export function PerPageSelect({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <select
      className={clsx('txi-input', 'txi-perpage')}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{ width: 80, padding: '6px 8px', fontSize: '13px' }}
    >
      {[10, 25, 50].map((n) => (
        <option key={n} value={n}>{n}</option>
      ))}
    </select>
  );
}
