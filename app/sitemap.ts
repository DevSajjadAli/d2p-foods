import { MetadataRoute } from 'next';
import { menuItems } from '@/lib/data/menu';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://d2pfoods.pk';

  const staticRoutes = [
    { route: '/', priority: 1.0, changeFrequency: 'daily' as const },
    { route: '/menu', priority: 0.9, changeFrequency: 'daily' as const },
    { route: '/deals', priority: 0.8, changeFrequency: 'daily' as const },
    { route: '/locations', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: '/cart', priority: 0.5, changeFrequency: 'never' as const },
    { route: '/checkout', priority: 0.4, changeFrequency: 'never' as const },
    { route: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
    { route: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
    { route: '/account', priority: 0.4, changeFrequency: 'monthly' as const },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const menuItemRoutes = menuItems.map((item) => ({
    url: `${baseUrl}/menu/${item.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...menuItemRoutes];
}
