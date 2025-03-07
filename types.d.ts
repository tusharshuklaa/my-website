import { PropsWithChildren, PropsWithRef, PropsWithoutRef } from "react";

declare module "tailwindcss/lib/util/flattenColorPalette" {
  export default function flattenColorPalette(pallette: Record<string, string>): Record<string, string>;
}

type BasicComponent<T = unknown> = PropsWithoutRef<PropsWithChildren> & T;

type BasicRefComponent<T = unknown> = PropsWithRef<PropsWithChildren> & T;

type UiComponent<T = unknown> = { className?: string } & T;

type BasicUiComponent<T = unknown> = BasicComponent<UiComponent<T>>;

type BasicUiRefComponent<T = unknown> = BasicRefComponent<UiComponent<T>>;
