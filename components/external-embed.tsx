'use client';

import Script from 'next/script';
import { type FC, useRef, useState } from 'react';

type EmbedProps = {
  url: string;
  type?: 'youtube' | 'x' | 'codepen' | 'codesandbox';
  aspectRatio?: '16:9' | '4:3' | '1:1';
};

export const ExternalEmbed: FC<EmbedProps> = ({ url, type, aspectRatio = '16:9' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = 'dark';

  // Validate URL
  const isValidUrl = (url: string): boolean => {
    try {
      const parsedUrl = new URL(url);
      return ['x.com', 'twitter.com', 'youtube.com', 'youtu.be', 'codepen.io', 'codesandbox.io'].some(domain =>
        parsedUrl.hostname.includes(domain),
      );
    } catch {
      return false;
    }
  };

  const extractTweetId = (url: string): string | null => {
    const regex = /(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const getEmbedContent = (url: string, type?: string) => {
    switch (type) {
      case 'x': {
        const tweetId = extractTweetId(url);
        if (!tweetId) {
          setError('Invalid X/Twitter URL');
          return null;
        }
        return (
          <>
            <blockquote className="twitter-tweet" data-theme={theme} data-dnt="true">
              <a href={url}>-</a>
            </blockquote>
            <Script
              src="https://platform.twitter.com/widgets.js"
              strategy="lazyOnload"
              onLoad={() => setIsLoading(false)}
              onError={() => setError('Failed to load X/Twitter embed')}
            />
          </>
        );
      }
      case 'youtube': {
        const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1];
        if (!videoId) {
          setError('Invalid YouTube URL');
          return null;
        }
        return (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            className="absolute left-0 top-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            onLoad={() => setIsLoading(false)}
            title="YouTube video player"
          />
        );
      }
      case 'codepen': {
        const penMatch = url.match(/codepen\.io\/([^/]+)\/pen\/([^/?]+)/);
        if (!penMatch) {
          setError('Invalid CodePen URL');
          return null;
        }
        const [_, username, penId] = penMatch;
        return (
          <iframe
            src={`https://codepen.io/${username}/embed/${penId}?default-tab=result&theme=${theme}`}
            className="absolute left-0 top-0 h-full w-full"
            loading="lazy"
            onLoad={() => setIsLoading(false)}
            title="CodePen Embed"
          />
        );
      }
      case 'codesandbox': {
        const sandboxId = url.split('/').pop();
        if (!sandboxId) {
          setError('Invalid CodeSandbox URL');
          return null;
        }
        return (
          <iframe
            src={`https://codesandbox.io/embed/${sandboxId}?fontsize=14&hidenavigation=1&theme=${theme}`}
            className="absolute left-0 top-0 h-full w-full"
            loading="lazy"
            allowFullScreen
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            onLoad={() => setIsLoading(false)}
            title="CodeSandbox Embed"
          />
        );
      }
      default:
        setError('Unsupported embed type');
        return null;
    }
  };

  if (!isValidUrl(url)) {
    console.error('Invalid URL provided to ExternalEmbed');
    return null;
  }

  // Calculate aspect ratio
  const getPaddingTop = (ratio: string): string => {
    const [width, height] = ratio.split(':').map(Number);
    return `${(height / width) * 100}%`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ minHeight: '300px', paddingTop: type === 'x' ? '0' : getPaddingTop(aspectRatio) }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
        </div>
      )}
      {error && <div className="absolute inset-0 flex items-center justify-center bg-red-50 text-red-500">{error}</div>}
      {getEmbedContent(url, type)}
    </div>
  );
};
