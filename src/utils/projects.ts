import { getCollection, type CollectionEntry } from "astro:content";

export type ProjectEntry = CollectionEntry<"projects">;

export async function getProjects(): Promise<ProjectEntry[]> {
  const projects = await getCollection("projects");

  return projects.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getFeaturedProjects(): Promise<ProjectEntry[]> {
  const projects = await getProjects();

  return projects.filter((project) => project.data.featured);
}
