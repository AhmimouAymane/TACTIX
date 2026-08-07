import { useCallback, useState } from 'react';

/**
 * Stores a JSON-serializable value in localStorage and keeps React state in sync.
 * Reflects external changes (e.g. other tabs / direct writes) via storage events.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const read = useCallback((): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const [stored, setStored] = useState<T>(read);

  const set = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStored((prev) => {
        const next = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          /* ignore quota / SSR errors */
        }
        return next;
      });
    },
    [key],
  );

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* noop */
    }
    setStored(initialValue);
  }, [key, initialValue]);

  return [stored, set, remove] as const;
}
