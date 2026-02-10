import type { MetadataRoute } from 'next';
import { allBlogs } from '@/.contentlayer/generated';

const BASE_URL = 'https://tusharshukla.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about-me`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/showcase`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/uses`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/uses/coding`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/uses/gadgets`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/uses/software`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/support-me`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];

  const blogSitemaps: MetadataRoute.Sitemap = allBlogs
    .filter(blog => blog.published)
    .map(blog => ({
      url: `${BASE_URL}/blog/${blog.slug}`,
      lastModified: new Date(blog.lastModified || blog.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  return [...staticPages, ...blogSitemaps];
}
