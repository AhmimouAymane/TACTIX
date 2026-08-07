import { useCallback, useEffect, useState, type DependencyList } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface State<T> {
  data: T | null;
  status: Status;
  error: Error | null;
}

/**
 * Runs an async factory whenever `deps` change and tracks status.
 */
export function useAsync<T>(factory: () => Promise<T>, deps: DependencyList) {
  const [state, setState] = useState<State<T>>({ data: null, status: 'idle', error: null });

  const execute = useCallback(() => {
    setState({ data: null, status: 'loading', error: null });
    factory()
      .then((data) => setState({ data, status: 'success', error: null }))
      .catch((error: Error) => setState({ data: null, status: 'error', error }));
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [execute]);

  return { ...state, refetch: execute } as State<T> & { refetch: () => void };
}
