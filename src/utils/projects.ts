import { getCollection, type CollectionEntry } from "astro:content";

export type ProjectEntry = CollectionEntry<"projects">;

export async function getProjects(): Promise<ProjectEntry[]> {
  const projects = await getCollection("projects");

  return projects.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
