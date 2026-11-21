import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.gbgroup.in',
  trailingSlash: 'never',
  build: {
    format: 'directory'
  }
});
