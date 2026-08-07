import { useMemo, useState } from 'react';
import type { RoleName, UserStatus, User } from '../types/api';
import { AdminApi } from '../services/api';
import { Button } from '../components/Button';
import { Select } from '../components/Select';
import { StatusBadge } from '../components/Badge';
import { Pagination, PerPageSelect } from '../components/Pagination';
import { SearchBox } from '../components/SearchBox';
import { LoadingState, ErrorState, EmptyState } from '../components/LoadingState';
import { useAsync } from '../hooks/useAsync';

const ROLE_OPTIONS: { value: RoleName; label: string }[] = [
  { value: 'admin', label: 'Admin' },
  { value: 'moderator', label: 'Moderator' },
  { value: 'user', label: 'User' },
];

export default function Users() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<UserStatus | ''>('');
  const [roleFilter, setRoleFilter] = useState<RoleName | ''>('');

  const filters = useMemo(
    () => ({ page, per_page: perPage, q: search, status: statusFilter || undefined, role: roleFilter || undefined }),
    [page, perPage, search, statusFilter, roleFilter],
  );

  const { data, status, error, refetch } = useAsync(() => AdminApi.getUsers(filters), [filters]);

  const users = data?.data ?? [];
  const meta = data?.meta;

  const handleSuspend = async (u: User) => {
    await AdminApi.suspendUser(u.id);
    refetch();
  };
  const handleRestore = async (u: User) => {
    await AdminApi.restoreUser(u.id);
    refetch();
  };
  const handleRoleChange = async (u: User, role: RoleName) => {
    await AdminApi.updateUser(u.id, { role });
    refetch();
  };

  const isFiltered = statusFilter || roleFilter;
  const resetFilters = () => {
    setStatusFilter('');
    setRoleFilter('');
    setSearch('');
    setPage(1);
  };

  return (
    <section>
      <div className="txi-toolbar">
        <SearchBox value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search users by email, name..." />
        <div style={{ display: 'flex', gap: 'var(--txi-space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
          <Select
            value={statusFilter}
            placeholder="Status"
            options={[
              { value: 'active', label: 'Active' },
              { value: 'suspended', label: 'Suspended' },
              { value: 'banned', label: 'Banned' },
              { value: 'inactive', label: 'Inactive' },
            ]}
            onChange={(v) => { setStatusFilter(v as UserStatus); setPage(1); }}
          />
          <Select value={roleFilter} placeholder="Role" options={ROLE_OPTIONS} onChange={(v) => { setRoleFilter(v as RoleName); setPage(1); }} />
          {isFiltered && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>Clear</Button>
          )}
          <PerPageSelect value={perPage} onChange={(v) => { setPerPage(v); setPage(1); }} />
        </div>
      </div>

      {status === 'loading' && <LoadingState label="Loading users..." />}
      {status === 'error' && <ErrorState message={error?.message ?? 'Failed to load users'} onRetry={refetch} />}
      {status === 'success' && (
        <>
          {users.length === 0 ? (
            <EmptyState title="No users found" description="Try adjusting your search or filters." />
          ) : (
            <>
              <div className="txi-table-wrap">
                <table className="txi-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Role</th>
                      <th className="mono">Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id}>
                        <td className="mono">{u.id}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <img src={u.avatar_url ?? ''} alt="" width={32} height={32} style={{ borderRadius: 'var(--txi-radius-pill)' }} />
                            <span>{u.email}</span>
                          </div>
                        </td>
                        <td><StatusBadge status={u.status} /></td>
                        <td>
                          <Select
                            value={u.role}
                            options={ROLE_OPTIONS}
                            onChange={(v) => handleRoleChange(u, v as RoleName)}
                            size="sm"
                          />
                        </td>
                        <td className="mono">{new Date(u.created_at).toLocaleDateString()}</td>
                        <td>
                          {u.status === 'active' ? (
                            <Button variant="danger" size="sm" onClick={() => handleSuspend(u)}>Suspend</Button>
                          ) : (
                            <Button variant="secondary" size="sm" onClick={() => handleRestore(u)}>Restore</Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {meta && (
                <Pagination
                  page={meta.page}
                  totalPages={meta.total_pages}
                  total={meta.total}
                  perPage={meta.per_page}
                  onPageChange={setPage}
                />
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}
