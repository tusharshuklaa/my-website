import { PropsWithChildren, PropsWithoutRef } from "react";

declare module "tailwindcss/lib/util/flattenColorPalette" {
  export default function flattenColorPalette(
    pallette: Record<string, string>,
  ): Record<string, string>;
}

type BasicComponent<T = unknown> = PropsWithoutRef<PropsWithChildren> & T;
