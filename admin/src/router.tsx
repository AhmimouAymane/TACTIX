/**
 * A tiny, dependency-free client router.
 * Provides a Router provider plus useLocation / useNavigate / Link / Navigate.
 * Route matching is intentionally kept trivial (exact path) and performed
 * by the consumer (App.tsx) to avoid fragile element introspection.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from 'react';

interface Location {
  pathname: string;
  search: string;
}

const LocationContext = createContext<Location>({ pathname: '/', search: '' });
const NavigateContext = createContext<(to: string) => void>(() => {});

export function Router({ children, initialPath = '/' }: { children: ReactNode; initialPath?: string }) {
  const [location, setLocation] = useState<Location>(() => fromUrl(initialPath));

  useEffect(() => {
    const handlePop = () => setLocation(fromUrl(window.location.pathname + window.location.search));
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const navigate = useCallback((to: string) => {
    const next = fromUrl(to);
    window.history.pushState({ path: to }, '', to);
    setLocation(next);
  }, []);

  const value = useMemo(() => ({ location, navigate }), [location, navigate]);
  return (
    <NavigateContext.Provider value={value.navigate}>
      <LocationContext.Provider value={value.location}>{children}</LocationContext.Provider>
    </NavigateContext.Provider>
  );
}

function fromUrl(url: string): Location {
  const [pathname, ...rest] = url.split('?');
  return { pathname, search: rest.length ? `?${rest.join('?')}` : '' };
}

export function useLocation(): Location {
  return useContext(LocationContext);
}

export function useNavigate(): (to: string) => void {
  return useContext(NavigateContext);
}

export function Link({ to, children, ...rest }: { to: string; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const navigate = useNavigate();
  const onClick: AnchorHTMLAttributes<HTMLAnchorElement>['onClick'] = (e) => {
    e.preventDefault();
    navigate(to);
  };
  return (
    <a {...rest} href={to} onClick={onClick}>
      {children}
    </a>
  );
}

export function Navigate({ to }: { to: string }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  }, [navigate, to]);
  return null;
}
