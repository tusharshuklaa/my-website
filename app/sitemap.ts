import type { MetadataRoute } from 'next';
import { allBlogs } from '@/.contentlayer/generated';

const BASE_URL = 'https://tusharshukla.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date('2025-12-15'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about-me`,
      lastModified: new Date('2025-11-20'),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/showcase`,
      lastModified: new Date('2025-10-30'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/uses`,
      lastModified: new Date('2025-09-15'),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/uses/coding`,
      lastModified: new Date('2025-09-15'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/uses/gadgets`,
      lastModified: new Date('2025-09-15'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/uses/software`,
      lastModified: new Date('2025-09-15'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  const blogSitemaps: MetadataRoute.Sitemap = allBlogs.map(blog => ({
    url: `${BASE_URL}/blog/${blog.slug}`,
    lastModified: new Date(blog.lastModified || blog.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...blogSitemaps];
}
