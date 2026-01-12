import { debounce } from 'lodash';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRootRef } from '@/contexts/use-root-ref';

type UseHideOnScrollOptions = {
  threshold?: number;
  debounceMs?: number;
};

export const useHideOnScroll = (options: UseHideOnScrollOptions = {}) => {
  const { threshold = 150, debounceMs = 10 } = options;

  const [hidden, setHidden] = useState(false);
  const { mainRef, isMainReady } = useRootRef();
  const lastScrollY = useRef(0);

  const { scrollY } = useScroll(
    isMainReady && mainRef.current
      ? {
          container: mainRef,
        }
      : {},
  );

  const debouncedScrollHandler = useMemo(() => {
    const handleScroll = (latest: number) => {
      if (!mainRef.current || !isMainReady) return;

      const previous = lastScrollY.current;
      lastScrollY.current = latest;

      if (Math.abs(latest - previous) < 10) return;

      if (latest > previous && latest > threshold) {
        setHidden(true);
      } else if (latest < previous || latest <= threshold) {
        setHidden(false);
      }
    };

    return debounce(handleScroll, debounceMs, {
      leading: false,
      trailing: true,
    });
  }, [threshold, debounceMs, mainRef, isMainReady]);

  useEffect(() => {
    return () => {
      debouncedScrollHandler.cancel();
    };
  }, [debouncedScrollHandler]);

  useMotionValueEvent(scrollY, 'change', debouncedScrollHandler);

  return {
    isHiddenOnScroll: hidden,
    isReady: isMainReady,
  };
};
