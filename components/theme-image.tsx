"use client";

import { FC } from "react";
import { ImageProps } from "next/image";
import { AdvImage } from "@components/adv-image";

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
