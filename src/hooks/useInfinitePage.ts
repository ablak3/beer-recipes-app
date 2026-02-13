import { useCallback, useEffect, useRef, useState } from "react";
import { Page } from "../types";
import { useFetchWithRetries } from "./useFetchWithRetries";

type FetchPageFn<T> = (page: number, size: number, sort: string) => Promise<Page<T>>;

type UseInfinitePageOptions = {
  initialSize?: number;
  initialSort?: string;
};

export const useInfinitePage = <T>(
  fetchPageFn: FetchPageFn<T>,
  options: UseInfinitePageOptions = {}
) => {
  const { initialSize = 10, initialSort = "createdDate,desc" } = options;

  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(initialSize);
  const [sort, setSort] = useState(initialSort);

  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const hasMoreRef = useRef(hasMore);

  // Prevent duplicate loads
  const inFlightRef = useRef(false);
  const loadedPagesRef = useRef<Set<number>>(new Set());

  // fetch + retry handler
  const { call: fetchWithRetries, isTerminal, error: fetchError, clearTerminal } =
    useFetchWithRetries<Page<T>>(fetchPageFn, { max404Retries: 2, retryDelayMs: 1000 });

  const reset = useCallback(() => {
    // If a terminal client error occurred (e.g. 4xx other than 404),
    // don't clear state or trigger further loads — prevents infinite loops.
    if (isTerminal) return;

    setItems([]);
    setPage(0);
    setTotalPages(0);
    setTotalElements(0);
    setHasMore(true);
    hasMoreRef.current = true;
    setError(null);
    loadedPagesRef.current = new Set();
  }, [isTerminal]);

  const fetchPage = useCallback(
    async (pageToLoad: number) => {
      if (inFlightRef.current) return;
      if (loadedPagesRef.current.has(pageToLoad)) return;
      if (!hasMoreRef.current && pageToLoad !== 0) return;

      inFlightRef.current = true;
      setLoading(true);
      setError(null);

      try {
        const data = await fetchWithRetries(pageToLoad, size, sort);

        loadedPagesRef.current.add(pageToLoad);

        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
        setHasMore(!data.last);
        hasMoreRef.current = !data.last;

        setItems((prev) => (pageToLoad === 0 ? data.content : [...prev, ...data.content]));
        setPage(data.number);
      } catch (_) {
        // If fetch hook determined a terminal error, stop further loads.
        if (isTerminal) {
          loadedPagesRef.current.add(pageToLoad);
          setHasMore(false);
          hasMoreRef.current = false;
          setError(fetchError ?? `Client error. Stopped loading more items.`);
        } else {
          setError(fetchError ?? "Failed to load items.");
        }
      } finally {
        inFlightRef.current = false;
        setLoading(false);
      }
    },
    [fetchWithRetries, fetchError, isTerminal, size, sort]
  );

  // initial load + reload on size/sort changes
  useEffect(() => {
    if (isTerminal) return;

    reset();
    fetchPage(0);
  }, [size, sort, reset, fetchPage, isTerminal]);

  const loadMore = useCallback(() => {
    if (isTerminal) return;
    if (loading) return;
    const next = loadedPagesRef.current.size === 0 ? 0 : page + 1;
    fetchPage(next);
  }, [fetchPage, loading, page, isTerminal]);

  const refresh = useCallback(() => {
    if (isTerminal) return;

    reset();
    fetchPage(0);
  }, [reset, fetchPage, isTerminal]);

  const setPageSize = useCallback((newSize: number) => {
    setSize(newSize);
  }, []);

  const setSortOrder = useCallback((newSort: string) => {
    setSort(newSort);
  }, []);

  return {
    items,
    loading,
    error,

    page,
    size,
    sort,
    totalPages,
    totalElements,
    hasMore,

    loadMore,
    refresh,
    reset,
    clearTerminal,
    setPageSize,
    setSortOrder,
  };
};
