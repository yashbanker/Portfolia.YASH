import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/utils';
import { mockProjects } from '@/lib/mock-data';

export const dynamic = 'force-dynamic';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const staticRoutes = ['', '/about', '/services', '/projects', '/contact'].map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: r === '' ? 1.0 : 0.8,
  }));
  const projectRoutes = mockProjects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  return [...staticRoutes, ...projectRoutes];
}