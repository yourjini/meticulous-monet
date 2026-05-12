import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docRoot = '../docs';
const promptRoot = '../prompts';
const libraryRoot = '../library';

const looseFrontmatter = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    order: z.number().optional(),
    argumentHint: z.string().optional(),
  })
  .passthrough();

const libraryEntry = z.object({
  title: z.string(),
  tags: z.array(z.string()).default([]),
  source: z.string().optional(),
  added: z.coerce.date().optional(),
  model: z.string().optional(),
  note: z.string().optional(),
  summary: z.string().optional(),
});

export const collections = {
  checklists: defineCollection({
    loader: glob({
      pattern: ['SECURITY_CHECKLIST.md', 'NEW_PROJECT_CHECKLIST.md', 'REPO_HARDENING.md', 'AI_CODE_REVIEW.md', 'MULTI_ENV_GUIDE.md', 'ONBOARDING.md'],
      base: docRoot,
    }),
    schema: looseFrontmatter,
  }),
  'prompts-required': defineCollection({
    loader: glob({ pattern: '*.md', base: `${promptRoot}/required` }),
    schema: looseFrontmatter,
  }),
  'prompts-optional': defineCollection({
    loader: glob({ pattern: '*.md', base: `${promptRoot}/optional` }),
    schema: looseFrontmatter,
  }),
  'prompts-startup': defineCollection({
    loader: glob({ pattern: '*.md', base: `${promptRoot}/startup` }),
    schema: looseFrontmatter,
  }),
  library: defineCollection({
    loader: glob({ pattern: ['**/*.md', '!README.md', '!_*.md'], base: libraryRoot }),
    schema: libraryEntry,
  }),
};
