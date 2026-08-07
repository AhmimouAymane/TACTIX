import { Navigate, useLocation } from './router';
import { useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { AppLayout } from './components/AppLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import MatchEvents from './pages/MatchEvents';
import Content from './pages/Content';
import FeatureFlags from './pages/FeatureFlags';
import AuditLog from './pages/AuditLog';
import type { ReactElement } from 'react';

const routes: Record<string, ReactElement> = {
  '/dashboard': <Dashboard />,
  '/users': <Users />,
  '/matches': <MatchEvents />,
  '/content': <Content />,
  '/feature-flags': <FeatureFlags />,
  '/audit-log': <AuditLog />,
};

function RequireAuth({ children }: { children: ReactElement }) {
  const { user } = useAuth();
  const { pathname } = useLocation();
  if (!user) return <Navigate to={`/login?from=${pathname}`} />;
  return children;
}

function AdminRoutes() {
  const { pathname } = useLocation();
  const Element = routes[pathname] ?? routes['/dashboard'];
  return <RequireAuth>{Element}</RequireAuth>;
}

export default function App() {
  const { pathname } = useLocation();
  const isLogin = pathname === '/login';

  return (
    <ThemeProvider>
      <AuthProvider>
        {isLogin ? (
          <Login />
        ) : (
          <AppLayout>
            <AdminRoutes />
          </AppLayout>
        )}
      </AuthProvider>
    </ThemeProvider>
  );
}
