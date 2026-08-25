import { useCallback, useEffect, useState } from "react";
import { subscribe } from "@/services/storage";

/**
 * Loads one backend collection and re-loads it whenever a service mutation
 * emits the same key, so admin edits appear everywhere without a reload.
 */
export function useServiceData<T>(key: string, loader: () => Promise<T>, initial: T) {
  const [data, setData] = useState<T>(initial);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    let active = true;
    loader()
      .then((value) => {
        if (!active) return;
        setData(value);
        setError(null);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Could not load data.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    const cancel = refresh();
    const unsubscribe = subscribe(key, () => refresh());
    return () => {
      cancel();
      unsubscribe();
    };
  }, [key, refresh]);

  return { data, loading, error, refresh };
}
