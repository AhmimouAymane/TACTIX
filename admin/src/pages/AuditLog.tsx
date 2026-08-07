import { useMemo, useState } from 'react';
import type { AuditLog } from '../types/api';
import { AdminApi, AuditActions } from '../services/api';
import { Pagination, PerPageSelect } from '../components/Pagination';
import { SearchBox } from '../components/SearchBox';
import { LoadingState, EmptyState, ErrorState } from '../components/LoadingState';
import { Select } from '../components/Select';
import { useAsync } from '../hooks/useAsync';

const ACTION_LABELS: Record<string, string> = {
  user_suspend: 'Suspend user',
  user_restore: 'Restore user',
  user_role_update: 'Update user role',
  player_price_change: 'Player price change',
  player_update: 'Update player',
  fixture_update: 'Update fixture',
  fixture_result: 'Set result',
  match_event_add: 'Add match event',
  match_event_edit: 'Edit match event',
  match_event_delete: 'Delete match event',
  stats_correct: 'Correct statistics',
  article_create: 'Create article',
  article_update: 'Update article',
  article_publish: 'Publish article',
  announcement_create: 'Create announcement',
  feature_flag_update: 'Update feature flag',
  maintenance_mode_update: 'Toggle maintenance mode',
};

export default function AuditLog() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('');

  const filters = useMemo(() => ({ page, per_page: perPage, q: search }), [page, perPage, search]);
  const { data, status, error, refetch } = useAsync(() => AdminApi.getAuditLog(filters), [filters]);

  const entries: AuditLog[] = data?.data ?? [];
  const meta = data?.meta;

  const filtered = useMemo(() => {
    if (!actionFilter) return entries;
    return entries.filter((e) => e.action === actionFilter);
  }, [entries, actionFilter]);

  return (
    <section>
      <h2 className="txi-page-title">Audit Log</h2>

      <div className="txi-toolbar">
        <SearchBox value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search actor, action, entity..." />
        <div style={{ display: 'flex', gap: 'var(--txi-space-2)', alignItems: 'center' }}>
          <Select
            value={actionFilter}
            placeholder="Filter by action"
            options={AuditActions.map((a) => ({ value: a, label: ACTION_LABELS[a] ?? a }))}
            onChange={setActionFilter}
          />
          <PerPageSelect value={perPage} onChange={(v) => { setPerPage(v); setPage(1); }} />
        </div>
      </div>

      {status === 'loading' && <LoadingState label="Loading audit log..." />}
      {status === 'error' && <ErrorState message={error?.message ?? 'Failed to load audit log'} onRetry={refetch} />}
      {status === 'success' && (
        <>
          {filtered.length === 0 ? (
            <EmptyState title="No entries" description="No audit log entries match your filters." />
          ) : (
            <div className="txi-timeline">
              {filtered.map((e) => (
                <TimelineItem key={e.id} entry={e} />
              ))}
            </div>
          )}
          {meta && (
            <Pagination page={meta.page} totalPages={meta.total_pages} total={meta.total} perPage={meta.per_page} onPageChange={setPage} />
          )}
        </>
      )}
    </section>
  );
}

function TimelineItem({ entry }: { entry: AuditLog }) {
  const time = new Date(entry.created_at);
  const changed = diffKeys(entry.before, entry.after);
  return (
    <div className="txi-timeline-item">
      <span className="txi-timeline-dot" />
      <div className="txi-timeline-content">
        <div className="txi-timeline-head">
          <span style={{ fontWeight: 700, color: 'var(--txi-color-primary)' }}>{ACTION_LABELS[entry.action] ?? entry.action}</span>
          <span className="txi-badge" style={{ background: 'rgba(59,130,246,0.15)', color: 'var(--txi-color-info)' }}>{entry.entity_type}</span>
          <span className="mono" style={{ color: 'var(--txi-text-muted)' }}>{entry.entity_id}</span>
        </div>
        <div className="txi-timeline-meta" style={{ fontSize: 'var(--txi-font-caption)', color: 'var(--txi-text-muted)' }}>
          by <code>{entry.actor_id}</code> · {time.toLocaleString()}
        </div>
        {changed.length > 0 && (
          <ul style={{ marginTop: 6, fontSize: 'var(--txi-font-caption)', color: 'var(--txi-text-secondary)' }}>
            {changed.map((c) => (
              <li key={c.key}>
                <span style={{ color: 'var(--txi-text-muted)' }}>{c.key}:</span>{' '}
                <span style={{ color: 'var(--txi-color-warning)' }}>{JSON.stringify(c.before)}</span>
                {' → '}
                <span style={{ color: 'var(--txi-color-success)' }}>{JSON.stringify(c.after)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function diffKeys(before?: Record<string, unknown>, after?: Record<string, unknown>) {
  const keys = new Set<string>([...Object.keys(before ?? {}), ...Object.keys(after ?? {})]);
  const out: Array<{ key: string; before: unknown; after: unknown }> = [];
  for (const k of keys) {
    const b = JSON.stringify(before?.[k]);
    const a = JSON.stringify(after?.[k]);
    if (b !== a) out.push({ key: k, before: before?.[k], after: after?.[k] });
  }
  return out;
}
