import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isEmoji = (str: string) => !!str.match(/\p{Extended_Pictographic}/gu);

export const getReadingTime = (content: string) => {
  // Remove all MDX/HTML tags
  const cleanContent = content
    .replace(/<\/?[^>]+(>|$)/g, '')
    // Remove special characters and extra whitespace
    .replace(/[^\w\s]/g, '')
    .trim();

  // Split by whitespace and filter out empty strings
  const words = cleanContent.split(/\s+/).filter(Boolean);

  // Calculate reading time
  const wordsPerMinute = 225;
  const minutes = Math.ceil(words.length / wordsPerMinute);

  return minutes;
};

export const formatReadingTime = (minutes: number) => {
  if (minutes < 1) {
    return 'Less than a minute';
  }

  return `${minutes} min${minutes === 1 ? '' : 's'} read`;
};

export const absoluteUrl = (path: string) => {
  return `https://tusharshukla.dev${path}`;
};
