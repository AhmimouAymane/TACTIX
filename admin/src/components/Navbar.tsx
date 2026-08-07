import { useLocation } from '../router';
import { navItems } from './Sidebar';
import { useTheme } from '../contexts/ThemeContext';

export function Navbar() {
  const { pathname } = useLocation();
  const { theme, toggle } = useTheme();
  const current = navItems.find((n) => n.to === pathname)?.label ?? 'Dashboard';
  return (
    <div className="txi-navbar">
      <span className="txi-navbar-title">{current}</span>
      <div className="right" style={{ display: 'flex', alignItems: 'center', gap: 'var(--txi-space-2)' }}>
        <span style={{ fontSize: 'var(--txi-font-caption)', color: 'var(--txi-text-muted)' }}>
          {theme === 'dark' ? '🌙' : '☀️'}
        </span>
        <button className="txi-btn txi-btn-ghost txi-btn-sm" onClick={toggle}>Toggle theme</button>
      </div>
    </div>
  );
}
