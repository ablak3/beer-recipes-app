import { useEffect, useRef } from "react";

export function useLocalStorage<T>(
  key: string,
  value: T,
  onLoad: (data: T) => void
) {
  const firstLoad = useRef(true);

  // ✅ Load once on mount
  useEffect(() => {
    if (!firstLoad.current) return;
    firstLoad.current = false;

    console.log("useLocalStorage load Rendered");
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        onLoad(parsed);
      } catch {
        console.warn("Invalid localStorage data for", key);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]); // intentionally ignore onLoad

  // ✅ Save data whenever it changes (only if different)
  useEffect(() => {
    try {
      const existing = localStorage.getItem(key);
      const serialized = JSON.stringify(value);
      if (existing !== serialized) {
        console.log("useLocalStorage save Rendered");
        localStorage.setItem(key, serialized);
      }
    } catch (err) {
      console.error("Failed to save to localStorage:", err);
    }
  }, [key, value]);
}
