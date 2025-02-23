import { useState, useRef, useEffect } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

export const useHideOnScroll = () => {
  const [hidden, setHidden] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    containerRef.current = document.getElementById("main");
  }, []);

  const { scrollY } = useScroll({
    container: containerRef,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = Number(scrollY.getPrevious());

    // Hide nav when scrolling down, show when scrolling up
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return {
    isHiddenOnScroll: hidden,
  };
};