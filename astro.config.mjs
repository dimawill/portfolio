import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL || 'https://dimawill.github.io',
  base: process.env.PUBLIC_BASE_PATH || '/portfolio',
});
