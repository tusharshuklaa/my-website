"use client";

import React, { FC, useState, useEffect } from "react";
import { ImageProps } from "next/image";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@ui";
import { AdvImage } from "@components/adv-image";
import { UiComponent } from "@/types";
import { useZoomablePan } from "@/hooks/use-zoomable-pan";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type ZoomableImagePreviewProps = UiComponent &
  Omit<ImageProps, "width" | "height"> & {
    width?: number;
    height?: number;
  };

/* ── Memoized Components ──────────────────── */
const ZoomInstructions = React.memo(() => (
  <div className="text-center text-xs text-gray-400">
    <p className="hidden sm:block">Use scroll wheel to zoom • Click + drag / touch to pan • Zoom range 50 – 200 %</p>
    <p className="block sm:hidden">Pinch to zoom • Drag to pan • Zoom range 50 – 200 %</p>
  </div>
));

ZoomInstructions.displayName = "ZoomInstructions";

const SkeletonLoader = React.memo(() => (
  <div className="flex h-full w-full items-center justify-center bg-gray-800">
    <div className="h-64 w-64 animate-pulse rounded-lg bg-gray-700" />
  </div>
));

SkeletonLoader.displayName = "SkeletonLoader";

const ErrorState = React.memo(() => (
  <div className="flex h-full w-full items-center justify-center bg-gray-800 text-gray-400">
    <div className="text-center">
      <p className="mb-2">Failed to load image</p>
      <p className="text-sm opacity-75">Please try again</p>
    </div>
  </div>
));

ErrorState.displayName = "ErrorState";

const ZoomLevelBadge: FC<{ scale: number }> = ({ scale }) => (
  <div className="absolute left-4 top-4 z-50 rounded-lg bg-gray-800/90 px-3 py-1 text-sm text-gray-200 backdrop-blur-sm">
    {Math.round(scale * 100)}%
  </div>
);

type ZoomControlsProps = {
  zoomState: { scale: number };
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
};

const ZoomControls = React.memo(({ zoomState, zoomIn, zoomOut, reset }: ZoomControlsProps) => (
  <div className="mb-3 flex items-center justify-center gap-4">
    <button
      onClick={zoomOut}
      disabled={zoomState.scale <= 0.5}
      aria-label="Zoom out"
      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-gray-200 transition-colors hover:bg-gray-600 disabled:opacity-50"
    >
      <ZoomOut size={18} />
    </button>

    <button
      onClick={reset}
      disabled={zoomState.scale === 1}
      aria-label="Reset zoom"
      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-gray-200 transition-colors hover:bg-gray-600 disabled:opacity-50"
    >
      <RotateCcw size={18} />
    </button>

    <button
      onClick={zoomIn}
      disabled={zoomState.scale >= 2.0}
      aria-label="Zoom in"
      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-gray-200 transition-colors hover:bg-gray-600 disabled:opacity-50"
    >
      <ZoomIn size={18} />
    </button>
  </div>
));

ZoomControls.displayName = "ZoomControls";

/* ── Main Component ───────────────────────── */
export const ZoomableImgPreview: FC<ZoomableImagePreviewProps> = ({
  className,
  src,
  alt,
  width = 500,
  height = 500,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const {
    zoomState,
    isDragging,
    motionValues,
    containerRef,
    imgWrapRef,
    zoomIn,
    zoomOut,
    reset,
    startDrag,
    endDrag,
    onPan,
    setupWheelZoom,
    setupResizeObserver,
    handleImageLoad: handleImageLoadFromHook,
  } = useZoomablePan({
    minZoom: 0.5,
    maxZoom: 2.0,
    zoomStep: 0.25,
    isOpen,
    isImageLoaded,
  });

  // Handle image load
  const handleImageLoad = () => {
    setIsImageLoaded(true);
    handleImageLoadFromHook();
  };

  // Setup wheel zoom
  useEffect(() => {
    return setupWheelZoom();
  }, [setupWheelZoom]);

  // Setup resize observer
  useEffect(() => {
    return setupResizeObserver();
  }, [setupResizeObserver]);

  // Reset image loading states when dialog opens
  useEffect(() => {
    if (isOpen) {
      setIsImageLoaded(false);
      setImageError(false);
    }
  }, [isOpen]);

  const containerClasses = cn(
    "relative h-[70vh] w-full select-none overflow-hidden rounded-t-lg bg-gray-800",
    className,
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} data-testid="cmp-zoomable-img-preview">
      <DialogTrigger asChild>
        <figure className="mx-auto mb-12 mt-8 cursor-zoom-in overflow-hidden rounded-lg">
          <AdvImage
            src={src}
            width={width}
            height={height}
            alt={alt}
            className="h-full w-full object-cover"
            {...props}
          />
          {alt && <figcaption className="py-2 text-center text-sm text-gray-600 dark:text-gray-400">{alt}</figcaption>}
        </figure>
      </DialogTrigger>

      <DialogContent
        className="max-h-[90vh] max-w-sm border-gray-700 bg-gray-900 p-0 sm:max-w-lg lg:max-w-5xl"
        aria-describedby={undefined}
      >
        <VisuallyHidden asChild>
          <DialogTitle className="text-lg font-semibold text-gray-200">
            Image preview - {alt || "Zoomable Image"}
          </DialogTitle>
        </VisuallyHidden>

        <ZoomLevelBadge scale={zoomState.scale} />

        {/* Image Container */}
        <div ref={containerRef} className={containerClasses}>
          {!isImageLoaded && !imageError && <SkeletonLoader />}
          {imageError && <ErrorState />}

          <motion.div
            ref={imgWrapRef}
            drag={zoomState.scale > 1}
            dragConstraints={false}
            dragElastic={0}
            dragMomentum={false}
            onDragStart={startDrag}
            onDragEnd={endDrag}
            onPan={onPan}
            style={{
              scale: motionValues.scale,
              x: motionValues.x,
              y: motionValues.y,
              cursor: zoomState.scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
              touchAction: zoomState.scale > 1 ? "none" : "auto",
            }}
            transition={{ type: "spring", stiffness: 500, damping: 50 }}
            className="h-full w-full"
          >
            <AdvImage
              src={src}
              width={800}
              height={800}
              alt={alt}
              className="pointer-events-none h-full w-full select-none object-contain"
              onLoad={handleImageLoad}
              onError={() => setImageError(true)}
              draggable={false}
              {...props}
            />
          </motion.div>
        </div>

        {/* Controls & Instructions */}
        <div className="rounded-b-lg bg-gray-900 p-4">
          <ZoomControls zoomState={zoomState} zoomIn={zoomIn} zoomOut={zoomOut} reset={reset} />
          <ZoomInstructions />
        </div>
      </DialogContent>
    </Dialog>
  );
};

ZoomableImgPreview.displayName = "ZoomableImgPreview";
