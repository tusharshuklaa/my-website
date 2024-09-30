import { FC } from "react";
import { SvgWrapper } from "./svg-wrapper";
import { CustomIcon } from "@/types/icons";

export const TwitterIcon: FC<CustomIcon> = ({ width, height }) => (
  <SvgWrapper width={width} height={height}>
    <title>X</title>
    <path
      fill="currentColor"
      d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
    />
  </SvgWrapper>
);
