import { useMemo, useState } from 'react';
import type { Article, ArticleStatus } from '../types/api';
import { AdminApi } from '../services/api';
import { Button } from '../components/Button';
import { Input, Textarea } from '../components/Input';
import { Select } from '../components/Select';
import { Switch } from '../components/Switch';
import { Modal } from '../components/Modal';
import { Pagination, PerPageSelect } from '../components/Pagination';
import { SearchBox } from '../components/SearchBox';
import { LoadingState, EmptyState, ErrorState } from '../components/LoadingState';

const STATUS_COLORS: Record<ArticleStatus, { bg: string; color: string; label: string }> = {
  draft: { bg: 'rgba(100,116,139,0.15)', color: 'var(--txi-text-muted)', label: 'Draft' },
  review: { bg: 'rgba(59,130,246,0.15)', color: 'var(--txi-color-info)', label: 'Review' },
  scheduled: { bg: 'rgba(245,158,11,0.15)', color: 'var(--txi-color-warning)', label: 'Scheduled' },
  published: { bg: 'rgba(16,185,129,0.15)', color: 'var(--txi-color-success)', label: 'Published' },
  archived: { bg: 'rgba(100,116,139,0.15)', color: 'var(--txi-text-muted)', label: 'Archived' },
};

const statusColor = (s: ArticleStatus) => ({
  backgroundColor: STATUS_COLORS[s].bg,
  color: STATUS_COLORS[s].color,
});
import { useAsync } from '../hooks/useAsync';

const STATUS_OPTIONS: { value: ArticleStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'review', label: 'Review' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
];

const CATEGORIES = ['news', 'transfers', 'features', 'matchday', 'opinion'];

interface EditorValues {
  title: string;
  slug: string;
  category: string;
  cover_image: string;
  status: ArticleStatus;
  published_at: string;
  body: string;
  language: string;
}

export default function Content() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');

  const filters = useMemo(() => ({ page, per_page: perPage, q: search }), [page, perPage, search]);
  const { data, status: listStatus, error, refetch } = useAsync(() => AdminApi.listArticles(filters), [filters]);

  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<Article | null>(null);
  const [form, setForm] = useState<EditorValues>({
    title: '', slug: '', category: 'news', cover_image: '', status: 'draft', published_at: '', body: '', language: 'en',
  });
  const [saving, setSaving] = useState(false);

  const articles = data?.data ?? [];
  const meta = data?.meta;

  const openNew = () => {
    setEditing(null);
    setForm({ title: '', slug: '', category: 'news', cover_image: '', status: 'draft', published_at: '', body: '', language: 'en' });
    setEditorOpen(true);
  };
  const openEdit = (a: Article) => {
    setEditing(a);
    setForm({
      title: a.title, slug: a.slug, category: a.category, cover_image: a.cover_image ?? '',
      status: a.status, published_at: a.published_at ? new Date(a.published_at).toISOString().slice(0, 16) : '', body: '', language: 'en',
    });
    setEditorOpen(true);
  };

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const titleChanged = (t: string) => {
    setForm({ ...form, title: t });
    if (!form.slug) setForm((f) => ({ ...f, title: t, slug: slugify(t) }));
  };

  const save = async () => {
    if (!form.title) { alert('Title is required'); return; }
    setSaving(true);
    try {
      const base: Partial<Article> = {
        title: form.title,
        slug: form.slug || slugify(form.title),
        category: form.category,
        cover_image: form.cover_image || undefined,
        status: form.status,
        published_at: form.published_at ? new Date(form.published_at).toISOString() : null,
        author_id: 'usr-1',
      };
      if (editing) {
        await AdminApi.updateArticle(editing.id, base);
      } else {
        await AdminApi.createArticle(base);
      }
      setEditorOpen(false);
      refetch();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (editing) {
      await AdminApi.publishArticle(editing.id);
      setEditorOpen(false);
      refetch();
    }
  };

  return (
    <section>
      <div className="txi-toolbar">
        <SearchBox value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search articles by title..." />
        <div style={{ display: 'flex', gap: 'var(--txi-space-2)', alignItems: 'center' }}>
          <PerPageSelect value={perPage} onChange={(v) => { setPerPage(v); setPage(1); }} />
          <Button onClick={openNew}>+ New article</Button>
        </div>
      </div>

      {listStatus === 'loading' && <LoadingState label="Loading articles..." />}
      {listStatus === 'error' && <ErrorState message={error?.message ?? 'Failed to load articles'} onRetry={refetch} />}
      {listStatus === 'success' && (
        <>
          {articles.length === 0 ? (
            <EmptyState title="No articles" description="No articles match your search." />
          ) : (
            <>
              <div className="txi-table-wrap">
                <table className="txi-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th className="mono">Published</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map((a) => (
                      <tr key={a.id}>
                        <td>{a.title}</td>
                        <td><span className="txi-badge" style={{ background: 'rgba(59,130,246,0.15)', color: 'var(--txi-color-info)' }}>{a.category}</span></td>
                        <td>
                          <span className="txi-badge" style={statusColor(a.status)}>
                            {a.status}
                          </span>
                        </td>
                        <td className="mono">{a.published_at ? new Date(a.published_at).toLocaleDateString() : '—'}</td>
                        <td>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <Button variant="ghost" size="sm" onClick={() => openEdit(a)}>Edit</Button>
                            {a.status !== 'published' && <Button variant="secondary" size="sm" onClick={() => AdminApi.publishArticle(a.id).then(() => refetch())}>Publish</Button>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {meta && <Pagination page={meta.page} totalPages={meta.total_pages} total={meta.total} perPage={meta.per_page} onPageChange={setPage} />}
            </>
          )}
        </>
      )}

      {/* Editor */}
      <Modal
        open={editorOpen}
        title={editing ? `Edit: ${editing.title}` : 'New article'}
        onClose={() => setEditorOpen(false)}
        footer={
          <div style={{ display: 'flex', gap: 'var(--txi-space-2)', justifyContent: 'flex-end' }}>
            <Button variant="ghost" size="sm" onClick={() => setEditorOpen(false)} disabled={saving}>Cancel</Button>
            {editing && (
              <Button variant="secondary" size="sm" onClick={handlePublish} disabled={saving}>Publish now</Button>
            )}
            <Button size="sm" onClick={save} loading={saving}>Save (mock)</Button>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--txi-space-3)' }}>
          <Input label="Title" value={form.title} onChange={(e) => titleChanged(e.target.value)} placeholder="Article title" />
          <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated slug" />
          <Select
            value={form.category}
            placeholder="Category"
            options={CATEGORIES.map((c) => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }))}
            onChange={(v) => setForm({ ...form, category: v })}
          />
          <Select value={form.status} placeholder="Status" options={STATUS_OPTIONS} onChange={(v) => setForm({ ...form, status: v as ArticleStatus })} />
          <Input label="Cover image URL" value={form.cover_image} onChange={(e) => setForm({ ...form, cover_image: e.target.value })} placeholder="https://..."/>
          <Input
            label="Published at"
            type="datetime-local"
            value={form.published_at}
            onChange={(e) => setForm({ ...form, published_at: e.target.value })}
          />
          <Textarea label="Body" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="Write your article body..." />
          <Switch label="Set as published on save" checked={form.status === 'published'} onChange={(v) => setForm({ ...form, status: v ? 'published' : 'draft' })} />
        </div>
      </Modal>
    </section>
  );
}
