import { useEffect, useRef } from "react";

type UseInfiniteScrollArgs = {
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  rootMargin?: string; // preload earlier, e.g. "400px"
};

export const useInfiniteScroll = ({ loading, hasMore, onLoadMore, rootMargin = "300px" }: UseInfiniteScrollArgs) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef({ loading, hasMore, onLoadMore });

  // Keep ref in sync without re-creating the observer
  useEffect(() => {
    stateRef.current = { loading, hasMore, onLoadMore };
  });

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && stateRef.current.hasMore && !stateRef.current.loading) {
          stateRef.current.onLoadMore();
        }
      },
      { root: null, rootMargin, threshold: 0.0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]); // only recreate if rootMargin changes

  return { sentinelRef };
};
