/* eslint-disable jsx-a11y/alt-text */
import { FC } from "react";
import Image, { ImageProps } from "next/image";

export type ThemeImageProps = ImageProps & {
  darkSrc: string;
};

export const ThemeImage: FC<ThemeImageProps> = props => {
  const { darkSrc, ...imgProps } = props;

  return (
    <picture>
      <source media="(prefers-color-scheme: dark)" srcSet={darkSrc} />
      <Image {...imgProps} />
    </picture>
  );
};
