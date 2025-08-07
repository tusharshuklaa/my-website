import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { PanInfo, useMotionValue, MotionValue } from "motion/react";
import { debounce } from "lodash";

type ZoomState = { scale: number; x: number; y: number };

interface UseZoomablePanConfig {
  minZoom?: number;
  maxZoom?: number;
  zoomStep?: number;
  isOpen: boolean;
  isImageLoaded: boolean;
}

interface UseZoomablePanReturn {
  // State
  zoomState: ZoomState;
  isDragging: boolean;
  baseDimensions: { width: number; height: number };

  // Motion values
  motionValues: {
    x: MotionValue<number>;
    y: MotionValue<number>;
    scale: MotionValue<number>;
  };

  // Refs
  containerRef: React.RefObject<HTMLDivElement>;
  imgWrapRef: React.RefObject<HTMLDivElement>;

  // Actions
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;

  // Event handlers
  startDrag: () => void;
  endDrag: (event: Event, info: PanInfo) => void;
  onPan: (event: Event, info: PanInfo) => void;

  // Utilities
  setupWheelZoom: () => (() => void) | void;
  setupResizeObserver: () => (() => void) | void;
  handleImageLoad: () => void;
}

export const useZoomablePan = ({
  minZoom = 0.5,
  maxZoom = 2.0,
  zoomStep = 0.25,
  isOpen,
  isImageLoaded,
}: UseZoomablePanConfig): UseZoomablePanReturn => {
  /* ── State ─────────────────────────────── */
  const [zoomState, setZoomState] = useState<ZoomState>({ scale: 1, x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [baseDimensions, setBaseDimensions] = useState({ width: 0, height: 0 });

  /* ── Refs & Motion Values ──────────────── */
  const containerRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  const motionValues = useMemo(() => ({ x, y, scale }), [x, y, scale]);

  /* ── Utilities ──────────────────────────── */
  const updateZoomState = useCallback((patch: Partial<ZoomState>) => setZoomState(prev => ({ ...prev, ...patch })), []);

  /* ── Constrain Pan Logic ─────────────────── */
  const constrainPan = useCallback(
    (newX: number, newY: number, currentScale: number) => {
      if (!containerRef.current || !baseDimensions.width || currentScale <= 1) {
        return { x: 0, y: 0 };
      }

      const { width: containerWidth, height: containerHeight } = containerRef.current.getBoundingClientRect();

      const maxX = Math.max(0, (baseDimensions.width * currentScale - containerWidth) / 2);
      const maxY = Math.max(0, (baseDimensions.height * currentScale - containerHeight) / 2);

      return {
        x: Math.min(Math.max(newX, -maxX), maxX),
        y: Math.min(Math.max(newY, -maxY), maxY),
      };
    },
    [baseDimensions],
  );

  /* ── Dimension Capture ───────────────────── */
  const captureDimensions = useCallback(() => {
    if (imgWrapRef.current && zoomState.scale === 1) {
      const { width, height } = imgWrapRef.current.getBoundingClientRect();
      setBaseDimensions({ width, height });
    }
  }, [zoomState.scale]);

  const debouncedCaptureDimensions = useMemo(() => debounce(captureDimensions, 100), [captureDimensions]);

  /* ── Zoom Logic ──────────────────────────── */
  const applyScale = useCallback(
    (newScale: number) => {
      if (newScale <= 1) {
        updateZoomState({ scale: newScale, x: 0, y: 0 });
        scale.set(newScale);
        x.set(0);
        y.set(0);
      } else {
        const constrainedPosition = constrainPan(zoomState.x, zoomState.y, newScale);
        updateZoomState({
          scale: newScale,
          x: constrainedPosition.x,
          y: constrainedPosition.y,
        });
        scale.set(newScale);
        x.set(constrainedPosition.x);
        y.set(constrainedPosition.y);
      }
    },
    [constrainPan, scale, x, y, zoomState.x, zoomState.y, updateZoomState],
  );

  const zoomIn = useCallback(() => {
    applyScale(Math.min(zoomState.scale + zoomStep, maxZoom));
  }, [applyScale, zoomState.scale, zoomStep, maxZoom]);

  const zoomOut = useCallback(() => {
    applyScale(Math.max(zoomState.scale - zoomStep, minZoom));
  }, [applyScale, zoomState.scale, zoomStep, minZoom]);

  const reset = useCallback(() => {
    applyScale(1);
  }, [applyScale]);

  /* ── Pan/Drag Logic ──────────────────────── */
  const startDrag = useCallback(() => {
    if (zoomState.scale > 1) {
      setIsDragging(true);
    }
  }, [zoomState.scale]);

  const endDrag = useCallback(
    (_event: Event, info: PanInfo) => {
      setIsDragging(false);

      if (zoomState.scale <= 1) return;

      const newX = zoomState.x + info.offset.x;
      const newY = zoomState.y + info.offset.y;
      const constrainedPosition = constrainPan(newX, newY, zoomState.scale);

      updateZoomState({ x: constrainedPosition.x, y: constrainedPosition.y });
      x.set(constrainedPosition.x);
      y.set(constrainedPosition.y);
    },
    [zoomState.x, zoomState.y, zoomState.scale, constrainPan, x, y, updateZoomState],
  );

  const onPan = useCallback(
    (_event: Event, info: PanInfo) => {
      if (zoomState.scale <= 1 || !isDragging) return;

      const newX = zoomState.x + info.delta.x;
      const newY = zoomState.y + info.delta.y;
      const constrainedPosition = constrainPan(newX, newY, zoomState.scale);

      updateZoomState({ x: constrainedPosition.x, y: constrainedPosition.y });
      x.set(constrainedPosition.x);
      y.set(constrainedPosition.y);
    },
    [zoomState.x, zoomState.y, zoomState.scale, isDragging, constrainPan, x, y, updateZoomState],
  );

  /* ── Event Setup Functions ───────────────── */
  const setupWheelZoom = useCallback(() => {
    const container = containerRef.current;
    if (!container || !isOpen || !isImageLoaded) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta = event.deltaY > 0 ? -zoomStep : zoomStep;
      const newScale = Math.min(Math.max(zoomState.scale + delta, minZoom), maxZoom);
      applyScale(newScale);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => container.removeEventListener("wheel", handleWheel);
  }, [isOpen, isImageLoaded, zoomState.scale, applyScale, zoomStep, minZoom, maxZoom]);

  const setupResizeObserver = useCallback(() => {
    if (!imgWrapRef.current) return;

    const observer = new ResizeObserver(debouncedCaptureDimensions);
    observer.observe(imgWrapRef.current);

    return () => {
      observer.disconnect();
      debouncedCaptureDimensions.cancel();
    };
  }, [debouncedCaptureDimensions]);

  const handleImageLoad = useCallback(() => {
    debouncedCaptureDimensions();
  }, [debouncedCaptureDimensions]);

  /* ── Reset on Dialog Open ────────────────── */
  useEffect(() => {
    if (!isOpen) return;

    updateZoomState({ scale: 1, x: 0, y: 0 });
    scale.set(1);
    x.set(0);
    y.set(0);
    setIsDragging(false);
    setBaseDimensions({ width: 0, height: 0 });
  }, [isOpen, scale, x, y, updateZoomState]);

  return {
    // State
    zoomState,
    isDragging,
    baseDimensions,

    // Motion values
    motionValues,

    // Refs
    containerRef,
    imgWrapRef,

    // Actions
    zoomIn,
    zoomOut,
    reset,

    // Event handlers
    startDrag,
    endDrag,
    onPan,

    // Utilities
    setupWheelZoom,
    setupResizeObserver,
    handleImageLoad,
  };
};
