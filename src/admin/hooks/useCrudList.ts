import { useState, useEffect, useCallback } from "react";
import type { ApiError, PaginatedResponse } from "@/api/types";

interface UseCrudListOpts<T> {
  fetchFn: (params: Record<string, string>) => Promise<{ data: PaginatedResponse<T> | null; error: ApiError | null }>;
  deleteFn: (id: number) => Promise<{ data: any; error: ApiError | null }>;
  initialParams?: Record<string, string>;
}

export function useCrudList<T extends { id: number }>({ fetchFn, deleteFn, initialParams = {} }: UseCrudListOpts<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, per_page: 15, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<Record<string, string>>({ page: "1", ...initialParams });

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await fetchFn(params);
    if (err) { setError(err.message); setLoading(false); return; }
    if (data) {
      setItems(data.data);
      setMeta(data.meta);
    }
    setLoading(false);
  }, [fetchFn, params]);

  useEffect(() => { fetch(); }, [fetch]);

  const setPage = (p: number) => setParams(prev => ({ ...prev, page: String(p) }));
  const setSearch = (q: string) => setParams(prev => ({ ...prev, search: q, page: "1" }));

  const deleteItem = async (id: number) => {
    const { error: err } = await deleteFn(id);
    if (err) { setError(err.message); return false; }
    await fetch();
    return true;
  };

  return { items, meta, loading, error, params, setParams, setPage, setSearch, deleteItem, refetch: fetch };
}
