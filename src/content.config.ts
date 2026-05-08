import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    technologies: z.array(z.string()).min(1),
    featured: z.boolean().default(false),
    githubUrl: z.string(),
    demoUrl: z.string(),
    mediaLabel: z.string(),
    date: z.coerce.date(),
  }),
});

export const collections = {
  projects,
};
