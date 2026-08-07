import { useEffect, useMemo, useState } from 'react';
import type { Club, Fixture, MatchEvent, MatchEventType, Player } from '../types/api';
import { AdminApi, EventTypes, CardTypes } from '../services/api';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Switch } from '../components/Switch';
import { Modal } from '../components/Modal';
import { LoadingState, EmptyState, ErrorState } from '../components/LoadingState';
import { clsx } from '../utils/cls';

interface FormValues {
  minute: string;
  added_minute?: string;
  type: MatchEventType;
  player_id?: string;
  card?: 'yellow' | 'red' | 'yellow-red';
  detail: string;
  verified: boolean;
}

export default function MatchEvents() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [events, setEvents] = useState<MatchEvent[]>([]);
  const [selectedFixtureId, setSelectedFixtureId] = useState<string>('');
  const [loadingFixtures, setLoadingFixtures] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<MatchEvent | null>(null);
  const [form, setForm] = useState<FormValues>({
    minute: '',
    type: 'goal',
    detail: '',
    verified: false,
  });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewRows, setPreviewRows] = useState<Array<Record<string, unknown>>>([]);

  const selectedFixture = useMemo(() => fixtures.find((f) => f.id === selectedFixtureId), [fixtures, selectedFixtureId]);

  const fixturePlayers = useMemo(() => {
    if (!selectedFixture) return [];
    const clubIds = [selectedFixture.home_club_id, selectedFixture.away_club_id];
    return players.filter((p) => clubIds.includes(p.club_id));
  }, [selectedFixture, players]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingFixtures(true);
        setError(null);
        const [fx, cl, pl] = await Promise.all([AdminApi.getFixtures(), AdminApi.getClubs(), AdminApi.getPlayers()]);
        setFixtures(fx);
        setClubs(cl);
        setPlayers(pl);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load fixtures');
      } finally {
        setLoadingFixtures(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!selectedFixtureId) {
      setEvents([]);
      return;
    }
    let cancelled = false;
    setLoadingEvents(true);
    AdminApi.getMatchEvents(selectedFixtureId)
      .then((e) => {
        if (!cancelled) setEvents(e);
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load events');
      })
      .finally(() => {
        if (!cancelled) setLoadingEvents(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedFixtureId]);

  const clubName = (id?: string) => clubs.find((c) => c.id === id)?.short_name ?? id;
  const playerLabel = (id?: string) => {
    if (!id) return undefined;
    const p = fixturePlayers.find((pl) => pl.id === id);
    return p ? `${p.first_name} ${p.last_name}` : undefined;
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ minute: '', type: 'goal', detail: '', verified: false });
    setFormOpen(true);
  };
  const openEdit = (e: MatchEvent) => {
    setEditing(e);
    setForm({
      minute: String(e.minute),
      added_minute: e.added_minute !== undefined ? String(e.added_minute) : '',
      type: e.type,
      player_id: e.player_id,
      card: e.card,
      detail: e.detail,
      verified: e.verified,
    });
    setFormOpen(true);
  };
  const closeForm = () => setFormOpen(false);

  const submit = async () => {
    if (!selectedFixtureId) return;
    const payload: Partial<MatchEvent> = {
      fixture_id: selectedFixtureId,
      minute: Number(form.minute) || 0,
      added_minute: form.added_minute ? Number(form.added_minute) : undefined,
      type: form.type,
      player_id: form.player_id,
      player_name: playerLabel(form.player_id),
      card: form.type === 'card' ? form.card : undefined,
      detail: form.detail,
      verified: form.verified,
    };
    try {
      if (editing) {
        await AdminApi.updateMatchEvent(editing.id, payload);
      } else {
        await AdminApi.addMatchEvent(payload);
      }
      closeForm();
      refreshEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    }
  };

  const refreshEvents = async () => {
    if (!selectedFixtureId) return;
    const e = await AdminApi.getMatchEvents(selectedFixtureId);
    setEvents(e);
  };

  const handleDelete = async (e: MatchEvent) => {
    if (!confirm(`Remove event ${e.id}?`)) return;
    await AdminApi.deleteMatchEvent(e.id);
    setEvents((prev) => prev.filter((x) => x.id !== e.id));
  };

  const runPreview = async () => {
    setPreviewOpen(true);
    setPreviewLoading(true);
    try {
      const rows: Array<Record<string, unknown>> = [];
      for (const p of fixturePlayers) {
        const res = await AdminApi.previewPrice(p.id);
        rows.push(res);
      }
      setPreviewRows(rows);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Preview failed');
    } finally {
      setPreviewLoading(false);
    }
  };

  return (
    <section>
      <h2 className="txi-page-title">Match Event Override</h2>
      {error && <ErrorState message={error} onRetry={() => { setError(null); refreshEvents(); }} />}

      <div className="txi-toolbar" style={{ marginBottom: 'var(--txi-space-4)' }}>
        <div style={{ display: 'flex', gap: 'var(--txi-space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
          <label style={{ fontSize: 'var(--txi-font-label)', color: 'var(--txi-text-secondary)' }}>Pick a match</label>
          <Select
            value={selectedFixtureId}
            placeholder="Select a fixture"
            options={fixtures.map((f) => ({
              value: f.id,
              label: `${clubName(f.home_club_id)} vs ${clubName(f.away_club_id)} (${new Date(f.kickoff_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
              disabled: f.status === 'cancelled',
            }))}
            onChange={setSelectedFixtureId}
          />
          {selectedFixture && (
            <span className="txi-badge" style={{ background: 'rgba(59,130,246,0.15)', color: 'var(--txi-color-info)' }}>
              {selectedFixture.status.toUpperCase()}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: 'var(--txi-space-2)', alignItems: 'center' }}>
          <Button variant="secondary" size="sm" onClick={runPreview} disabled={!selectedFixtureId}>Re-price preview</Button>
          {selectedFixtureId && <Button size="sm" onClick={openAdd}>+ Add event</Button>}
        </div>
      </div>

      {loadingFixtures && <LoadingState label="Loading fixtures..." />}

      {!selectedFixtureId && !loadingFixtures && (
        <EmptyState title="Pick a match" description="Select a fixture to view and override its events." />
      )}

      {selectedFixtureId && (
        <>
          {loadingEvents && <LoadingState label="Loading events..." />}
          {!loadingEvents && (
            <>
              {events.length === 0 ? (
                <EmptyState title="No events" description="No match events recorded for this fixture." />
              ) : (
                <div className="txi-table-wrap">
                  <table className="txi-table">
                    <thead>
                      <tr>
                        <th className="mono">ID</th>
                        <th className="mono">Min</th>
                        <th>Type</th>
                        <th>Player</th>
                        <th>Detail</th>
                        <th>Verified</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events
                        .slice()
                        .sort((a, b) => a.minute - b.minute || a.sequence - b.sequence)
                        .map((e) => (
                          <tr key={e.id}>
                            <td className="mono">{e.id}</td>
                            <td className="mono">{e.minute}{e.added_minute ? `+${e.added_minute}` : ''}</td>
                            <td>
                              <span className="txi-badge" style={{ background: 'rgba(148,163,184,0.15)', color: 'var(--txi-text-secondary)' }}>
                                {e.type}
                                {e.card && ` (${e.card})`}
                              </span>
                            </td>
                            <td>{e.player_name ?? e.player_id ?? '—'}</td>
                            <td>{e.detail || '—'}</td>
                            <td>{e.verified ? '✅' : '❌'}</td>
                            <td>
                              <div style={{ display: 'flex', gap: 6 }}>
                                <Button variant="ghost" size="sm" onClick={() => openEdit(e)}>Edit</Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(e)}>Delete</Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div style={{ marginTop: 'var(--txi-space-3)' }}>
                <button className="txi-btn txi-btn-secondary txi-btn-sm" onClick={() => AdminApi.repairMatchEvents().then((r) => alert(`Repair: ${r.verified}/${r.total} verified`))}>
                  Run event repair
                </button>
              </div>
            </>
          )}
        </>
      )}

      {/* Add / Edit event form */}
      <Modal
        open={formOpen}
        title={editing ? 'Edit event' : 'Add event'}
        onClose={closeForm}
        footer={
          <div style={{ display: 'flex', gap: 'var(--txi-space-2)', justifyContent: 'flex-end' }}>
            <Button variant="ghost" size="sm" onClick={closeForm}>Cancel</Button>
            <Button size="sm" onClick={submit}>Save</Button>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--txi-space-3)' }}>
          <Input
            label="Minute"
            type="number"
            value={form.minute}
            onChange={(e) => setForm({ ...form, minute: e.target.value })}
            placeholder="e.g. 22"
          />
          <Input
            label="Added minute (stoppage)"
            type="number"
            value={form.added_minute ?? ''}
            onChange={(e) => setForm({ ...form, added_minute: e.target.value || undefined })}
          />
          <Select
            value={form.type}
            placeholder="Event type"
            options={EventTypes.map((t) => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1) }))}
            onChange={(v) => setForm({ ...form, type: v as MatchEventType })}
          />
          {form.type === 'card' && (
            <Select
              value={form.card ?? ''}
              placeholder="Card type"
              options={CardTypes.map((c) => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }))}
              onChange={(v) => setForm({ ...form, card: v as 'yellow' | 'red' | 'yellow-red' })}
            />
          )}
          {fixturePlayers.length > 0 && (
            <Select
              value={form.player_id ?? ''}
              placeholder="Player"
              options={fixturePlayers.map((p) => ({ value: p.id, label: `${p.first_name} ${p.last_name} (${p.position})` }))}
              onChange={(v) => setForm({ ...form, player_id: v || undefined })}
            />
          )}
          <Input
            label="Detail"
            placeholder="e.g. Right-footed shot from the centre"
            value={form.detail}
            onChange={(e) => setForm({ ...form, detail: e.target.value })}
          />
          <Switch label="Verified" checked={form.verified} onChange={(v) => setForm({ ...form, verified: v })} />
        </div>
      </Modal>

      {/* Re-price preview modal */}
      <Modal
        open={previewOpen}
        title="Re-price preview"
        onClose={() => setPreviewOpen(false)}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="ghost" size="sm" onClick={() => setPreviewOpen(false)}>Close</Button>
          </div>
        }
      >
        {previewLoading && <LoadingState label="Simulating price changes..." />}
        {!previewLoading && previewRows.length === 0 && <EmptyState title="No players in match" />}
        {!previewLoading && previewRows.length > 0 && (
          <table className="txi-table">
            <thead>
              <tr>
                <th>Player</th>
                <th className="mono">Old</th>
                <th className="mono">New</th>
                <th>Delta</th>
                <th>Reason</th>
                <th className="mono">Teams impacted</th>
              </tr>
            </thead>
            <tbody>
              {previewRows.map((r, i) => {
                const delta = Number(r.delta);
                return (
                  <tr key={i}>
                    <td>{String(r.player_name)}</td>
                    <td className="mono">{String(r.old_price)} MAD</td>
                    <td className="mono">{String(r.new_price)} MAD</td>
                    <td className={clsx(delta > 0 && 'txi-badge-status-active', delta < 0 && 'txi-badge-status-suspended', !delta && 'txi-badge-status-inactive')}>
                      {delta > 0 ? '+' : ''}{delta}
                    </td>
                    <td>{String(r.reason)}</td>
                    <td className="mono">{String(r.affected_teams)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Modal>
    </section>
  );
}
