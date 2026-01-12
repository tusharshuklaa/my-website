'use client';

import { AdvImage } from '@components/adv-image';
import type { ImageProps } from 'next/image';
import type { FC } from 'react';

export type ThemeImageProps = ImageProps & {
  lightSrc: string;
};

export const ThemeImage: FC<ThemeImageProps> = props => {
  const { alt, lightSrc, src, ...restImgProps } = props;

  return (
    <picture>
      <source media="(prefers-color-scheme: light)" srcSet={lightSrc} />
      <AdvImage src={src as string} alt={alt} {...restImgProps} />
    </picture>
  );
};
