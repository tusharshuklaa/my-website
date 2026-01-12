'use client';

import { GradientText } from '@components/text';
import { EyeIcon } from 'lucide-react';
import { type FC, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { UiComponent } from '@/types';

type BlogViewCounterProps = UiComponent & {
  slug: string;
};

// Helper function to generate a fingerprint
const generateFingerprint = () => {
  const userAgent = navigator.userAgent;
  const screenResolution = `${window.screen.width}x${window.screen.height}`;

  return `${userAgent}:${screenResolution}`;
};

export const BlogViewCounter: FC<BlogViewCounterProps> = ({ className, slug }) => {
  const [views, setViews] = useState<number>(0);
  const blogViewCounterClasses = cn('flex items-center justify-between gap-2', className);

  useEffect(() => {
    if (!slug) return;

    const fingerprint = generateFingerprint();

    // Track the view
    fetch('/api/view-count', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug, userIdentifier: fingerprint }),
    });

    const revalidateSeconds = 60 * 2; // 2 minutes
    // Fetch the view count with caching
    fetch(`/api/get-views?slug=${slug}`, { next: { revalidate: revalidateSeconds } })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch view count');
        }

        return res.json();
      })
      .then((data: { views: number }) => setViews(data.views))
      .catch(error => {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error fetching view count:', error);
        }

        setViews(10);
      });
  }, [slug]);

  return (
    <div className={blogViewCounterClasses}>
      <EyeIcon size={14} className="text-red-500" />
      <GradientText data-testid="cmp-blog-view-counter" color="darkBlue" text={`${views} views`} className="text-sm" />
    </div>
  );
};

BlogViewCounter.displayName = 'BlogViewCounter';
