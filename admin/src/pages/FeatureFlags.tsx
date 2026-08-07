import { useEffect } from 'react';
import type { FeatureFlag } from '../types/api';
import { AdminApi } from '../services/api';
import { Button } from '../components/Button';
import { Switch } from '../components/Switch';
import { LoadingState, ErrorState } from '../components/LoadingState';
import { useAsync } from '../hooks/useAsync';
import { useLocalStorage } from '../hooks/useLocalStorage';

const LKEY = 'tactix_feature_flags';

export default function FeatureFlags() {
  const { data, status, error, refetch } = useAsync(() => AdminApi.getFeatureFlags(), []);
  const [local, setLocal] = useLocalStorage<FeatureFlag[]>(LKEY, []);

  useEffect(() => {
    if (status === 'success' && data && local.length === 0) {
      setLocal(data);
    }
  }, [status, data, local.length, setLocal]);

  const saveToggle = async (flag: FeatureFlag, enabled: boolean) => {
    const updated: FeatureFlag = { ...flag, enabled, updated_at: new Date().toISOString(), updated_by: 'usr-1' };
    setLocal((prev) => prev.map((f) => (f.id === flag.id ? updated : f)));
    try {
      await AdminApi.updateFeatureFlag(updated);
    } catch {
      /* API is mock; localStorage is source of truth here */
    }
  };

  if (status === 'loading' && local.length === 0) return <LoadingState label="Loading feature flags..." />;
  if (status === 'error' && local.length === 0) return <ErrorState message={error?.message ?? 'Failed to load feature flags'} onRetry={refetch} />;

  return (
    <section>
      <h2 className="txi-page-title">Feature Flags</h2>

      <div className="txi-toolbar">
        <p style={{ color: 'var(--txi-text-muted)', fontSize: 'var(--txi-font-caption)' }}>
          Toggles are persisted in localStorage under <code>{LKEY}</code>.
        </p>
        <Button variant="secondary" size="sm" onClick={refetch}>Refresh (mock API)</Button>
      </div>

      <div className="txi-table-wrap">
        <table className="txi-table">
          <thead>
            <tr>
              <th>Name</th>
              <th className="mono">ID</th>
              <th>Enabled</th>
              <th className="mono">Updated by</th>
              <th className="mono">Updated at</th>
            </tr>
          </thead>
          <tbody>
            {local.map((f) => (
              <tr key={f.id}>
                <td>
                  <span style={{ fontWeight: 600 }}>{f.name}</span>
                </td>
                <td className="mono">{f.id}</td>
                <td>
                  <Switch checked={f.enabled} onChange={(enabled) => saveToggle(f, enabled)} label={f.enabled ? 'On' : 'Off'} />
                </td>
                <td className="mono">{f.updated_by ?? '\u2014'}</td>
                <td className="mono">{new Date(f.updated_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {local.length === 0 && <p style={{ color: 'var(--txi-text-muted)' }}>No feature flags configured.</p>}
    </section>
  );
}
