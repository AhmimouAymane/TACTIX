export function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="txi-state">
      <div className="txi-spinner" style={{ width: 32, height: 32, margin: '0 auto var(--txi-space-3)' }} />
      <p>{label}</p>
    </div>
  );
}

export function EmptyState({ title = 'Nothing here', description }: { title?: string; description?: string }) {
  return (
    <div className="txi-state">
      <span style={{ fontSize: 40, opacity: 0.6, marginBottom: 'var(--txi-space-3)', display: 'block' }}>📭</span>
      <h3 style={{ color: 'var(--txi-text-primary)', marginBottom: 4 }}>{title}</h3>
      {description && <p style={{ color: 'var(--txi-text-muted)', fontSize: 'var(--txi-font-caption)' }}>{description}</p>}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="txi-state">
      <span style={{ fontSize: 36, marginBottom: 'var(--txi-space-3)', display: 'block' }}>⚠️</span>
      <h3 style={{ color: 'var(--txi-color-error)', marginBottom: 8 }}>Something went wrong</h3>
      <p style={{ color: 'var(--txi-text-secondary)', marginBottom: 'var(--txi-space-3)' }}>{message}</p>
      {onRetry && <button className="txi-btn txi-btn-secondary txi-btn-sm" onClick={onRetry}>Retry</button>}
    </div>
  );
}
