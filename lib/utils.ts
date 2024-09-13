import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// @ts-ignore
export const isEmoji = (str: string) => !!str.match(/\p{Extended_Pictographic}/gu);
