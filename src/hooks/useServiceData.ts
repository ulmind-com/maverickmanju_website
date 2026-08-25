import { useCallback, useEffect, useState } from "react";
import { subscribe } from "@/services/storage";

/**
 * Subscribes a component to one storage collection.
 * Any service write to the same key re-runs the loader, so admin edits appear
 * on public pages immediately, without a reload.
 */
export function useServiceData<T>(key: string, loader: () => Promise<T>, initial: T) {
  const [data, setData] = useState<T>(initial);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    let active = true;
    loader().then((value) => {
      if (!active) return;
      setData(value);
      setLoading(false);
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

  return { data, loading, refresh };
}
