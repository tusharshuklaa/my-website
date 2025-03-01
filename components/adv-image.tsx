"use client";

import { FC } from "react";
import Image, { ImageProps } from "next/image";
import { CldImage } from "next-cloudinary";

export const AdvImage: FC<ImageProps> = ({ className, ...props }) => {
  const altText = props.alt || props.title || "";
  const src = (props.src as string) || "";
  const isExternalImage = src?.startsWith("http");
  const ImgComp = isExternalImage ? Image : CldImage;
  const defaultSize = "500";
  const additionalProps: Record<string, unknown> = {};

  if (props.fill) {
    additionalProps.fill = props.fill;
  } else {
    additionalProps.width = props.width || defaultSize;
    additionalProps.height = props.height || defaultSize;
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

AdvImage.displayName = "AdvImage";
