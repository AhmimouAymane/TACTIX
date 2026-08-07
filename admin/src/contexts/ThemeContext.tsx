import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>('tactix-theme', 'dark');

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    document.body.style.backgroundColor = theme === 'dark' ? 'var(--txi-bg-app)' : 'var(--txi-bg-app)';
  }, [theme]);

  const toggle = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
