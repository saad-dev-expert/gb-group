import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.gbgroup.in',
  trailingSlash: 'never',
  build: {
    format: 'directory'
  },
  prefetch: true,
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      filter: (page) => !page.includes('/404')
    })
  ]
});
