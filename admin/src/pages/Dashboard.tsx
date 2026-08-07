import { useEffect, useState } from 'react';
import { AdminApi } from '../services/api';
import { LoadingState, ErrorState } from '../components/LoadingState';

interface StatCard {
  label: string;
  value: string;
  sub?: string;
  href?: string;
  tint: 'primary' | 'green' | 'blue' | 'amber';
}

export default function Dashboard() {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const [users, fixtures, flags, audit] = await Promise.all([
          AdminApi.getUsers({ per_page: 1 }),
          AdminApi.getFixtures(),
          AdminApi.getFeatureFlags(),
          AdminApi.getAuditLog({ per_page: 1 }),
        ]);
        setStats([
          { label: 'Users', value: String(users.meta?.total ?? 0), sub: 'total registered', href: '#', tint: 'blue' },
          { label: 'Fixtures', value: String(fixtures.length), sub: 'in current season', href: '#', tint: 'green' },
          { label: 'Feature flags', value: String(flags.length), sub: `${flags.filter((f) => f.enabled).length} enabled`, href: '#', tint: 'amber' },
          { label: 'Audit log entries', value: String(audit.meta?.total ?? 0), sub: 'recorded', href: '#', tint: 'primary' },
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section>
      <h2 className="txi-page-title">Dashboard</h2>
      {loading && <LoadingState label="Loading dashboard..." />}
      {error && <ErrorState message={error} />}
      {!loading && !error && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--txi-space-4)' }}>
          {stats.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>
      )}
    </section>
  );
}

function StatCard({ stat }: { stat: StatCard }) {
  const tintBg = {
    primary: 'rgba(255,176,32,0.12)',
    green: 'rgba(16,185,129,0.12)',
    blue: 'rgba(59,130,246,0.12)',
    amber: 'rgba(245,158,11,0.12)',
  }[stat.tint];
  const tintFg = {
    primary: 'var(--txi-color-primary)',
    green: 'var(--txi-color-success)',
    blue: 'var(--txi-color-info)',
    amber: 'var(--txi-color-warning)',
  }[stat.tint];

  return (
    <div className="txi-card" style={{ background: tintBg, border: '1px solid var(--txi-bg-border)' }}>
      <div style={{ fontSize: 'var(--txi-font-headline)', fontWeight: 700, color: tintFg }}>{stat.value}</div>
      <div style={{ fontSize: 'var(--txi-font-title)', color: 'var(--txi-text-primary)', marginTop: 6 }}>{stat.label}</div>
      {stat.sub && <div style={{ fontSize: 'var(--txi-font-caption)', color: 'var(--txi-text-secondary)' }}>{stat.sub}</div>}
    </div>
  );
}
