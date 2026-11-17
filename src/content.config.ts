import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const pocs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pocs' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['solutions-architecture', 'data-engineering', 'ml-engineering', 'ai-genai']),
    summary: z.string(),
    awsServices: z.array(z.string()),
    repoUrl: z.url(),
    demoUrl: z.url(),
    image: z.string(),
    date: z.coerce.date(),
  }),
});

export const collections = { pocs };
