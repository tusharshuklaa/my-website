"use client";

import { FC } from "react";
import { ImageProps } from "next/image";
import { AdvImage } from "@components/adv-image";

export type ThemeImageProps = ImageProps & {
  darkSrc: string;
};

export const ThemeImage: FC<ThemeImageProps> = props => {
  const { alt, darkSrc, src, ...restImgProps } = props;

  return (
    <picture>
      <source media="(prefers-color-scheme: dark)" srcSet={darkSrc} />
      <AdvImage src={src as string} alt={alt} {...restImgProps} />
    </picture>
  );
};
