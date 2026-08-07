import { clsx } from '../utils/cls';
import type { UserStatus, RoleName } from '../types/api';

export function StatusBadge({ status }: { status: UserStatus }) {
  const labels: Record<UserStatus, string> = {
    active: 'Active',
    inactive: 'Inactive',
    suspended: 'Suspended',
    banned: 'Banned',
  };
  return <span className={clsx('txi-badge', `txi-badge-status-${status}`)}>{labels[status]}</span>;
}

export function RoleBadge({ role }: { role: RoleName }) {
  return <span className={clsx('txi-badge', `txi-badge-role-${role}`)}>{role}</span>;
}
