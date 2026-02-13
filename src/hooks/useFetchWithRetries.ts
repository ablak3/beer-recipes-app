import { useCallback, useRef, useState } from "react";

type FetchFn<T> = (page: number, size: number, sort: string) => Promise<T>;

export const useFetchWithRetries = <T>(
  fetchFn: FetchFn<T>,
  options?: { max404Retries?: number; retryDelayMs?: number }
) => {
  const MAX_404_RETRIES = options?.max404Retries ?? 2;
  const RETRY_DELAY_MS = options?.retryDelayMs ?? 1000;

  const retryCountsRef = useRef<Map<number, number>>(new Map());
  const terminalRef = useRef(false);
  const [isTerminal, setIsTerminal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearTerminal = useCallback(() => {
    terminalRef.current = false;
    retryCountsRef.current.clear();
    setIsTerminal(false);
    setError(null);
  }, []);

  const call = useCallback(
    async (page: number, size: number, sort: string): Promise<T> => {
      if (terminalRef.current) {
        throw new Error("Terminal error");
      }

      try {
        const res = await fetchFn(page, size, sort);
        return res;
      } catch (e: any) {
        const status = e?.response?.status;

        if (typeof status === "number" && status >= 400 && status < 500 && status !== 404) {
          // terminal client error
          terminalRef.current = true;
          setIsTerminal(true);
          setError(`Client error (${status})`);
          throw e;
        }

        if (status === 404) {
          const prev = retryCountsRef.current.get(page) ?? 0;
          if (prev < MAX_404_RETRIES) {
            const nextAttempt = prev + 1;
            retryCountsRef.current.set(page, nextAttempt);
            setError(`Service not found. Retrying (${nextAttempt}/${MAX_404_RETRIES + 1})...`);

            // wait then retry
            await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
            return call(page, size, sort);
          }

          // exhausted retries
          terminalRef.current = true;
          setIsTerminal(true);
          setError("Service unavailable (404). Stopped retrying.");
          throw e;
        }

        setError("Failed to load items.");
        throw e;
      }
    },
    [fetchFn, MAX_404_RETRIES, RETRY_DELAY_MS]
  );

  return { call, isTerminal, error, clearTerminal };
};
