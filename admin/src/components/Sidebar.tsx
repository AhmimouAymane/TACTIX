import { Link, useLocation } from '../router';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import type { NavItem } from '../types/nav';

export const navItems: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', to: '/dashboard', icon: '🏠' },
  { key: 'users', label: 'Users', to: '/users', icon: '👥' },
  { key: 'matches', label: 'Match Events', to: '/matches', icon: '⚽' },
  { key: 'content', label: 'Content', to: '/content', icon: '📝' },
  { key: 'flags', label: 'Feature Flags', to: '/feature-flags', icon: '🎛️' },
  { key: 'audit', label: 'Audit Log', to: '/audit-log', icon: '📜' },
];

export function Sidebar() {
  const { pathname } = useLocation();
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();

  return (
    <aside className="txi-sidebar">
      <div className="brand">TACTIX Admin</div>
      <nav>
        {navItems.map((item) => (
          <Link
            key={item.key}
            to={item.to}
            className={pathname === item.to ? 'active' : undefined}
            style={{ display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div style={{ marginTop: 'auto', padding: 'var(--txi-space-2) 0' }}>
        <button className="txi-btn txi-btn-secondary txi-btn-sm txi-btn-full" onClick={toggle}>
          Theme: {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
      <div style={{ padding: 'var(--txi-space-2) 0', borderTop: '1px solid var(--txi-bg-border)' }}>
        <div className="txi-navbar user" style={{ justifyContent: 'space-between' }}>
          <span>{user?.display_name ?? 'Admin'}</span>
          <span style={{ fontSize: 'var(--txi-font-caption)', color: 'var(--txi-text-muted)' }}>{user?.email}</span>
        </div>
        <button className="txi-btn txi-btn-danger txi-btn-sm txi-btn-full" onClick={logout}>Logout</button>
      </div>
    </aside>
  );
}
