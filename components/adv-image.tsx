'use client';

import Image, { type ImageProps } from 'next/image';
import { CldImage } from 'next-cloudinary';
import type { FC } from 'react';

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);

export const AdvImage: FC<ImageProps> = ({ className, ...props }) => {
  const altText = props.alt || props.title || '';
  const src = (props.src as string) || '';
  const isExternalImage = src?.startsWith('http');
  const ImgComp = isExternalImage ? Image : CldImage;
  const defaultSize = '500';
  const additionalProps: Record<string, unknown> = {};

  if (props.fill) {
    additionalProps.fill = props.fill;
  } else {
    additionalProps.width = props.width || defaultSize;
    additionalProps.height = props.height || defaultSize;
  }

  if (!isExternalImage) {
    additionalProps.quality = props.quality || 75;
    additionalProps.placeholder = props.placeholder || `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`;
  }

  return (
    <ImgComp
      data-testid="cmp-adv-image"
      className={className}
      {...additionalProps}
      {...props}
      src={src}
      alt={altText}
    />
  );
};

AdvImage.displayName = 'AdvImage';
