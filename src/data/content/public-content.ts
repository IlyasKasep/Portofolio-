import "server-only";

import { unstable_cache } from "next/cache";

import { jsonContentRepository } from "@/data/content/json-content-repository";
import { prismaContentRepository } from "@/data/content/prisma-content-repository";

async function fetchHomeContent() {
  if (!process.env.DATABASE_URL) {
    return jsonContentRepository.getHomeContent();
  }

  try {
    return await prismaContentRepository.getHomeContent();
  } catch (error) {
    console.warn(
      "Failed to fetch home content from database, falling back to static seed content:",
      error,
    );
    return jsonContentRepository.getHomeContent();
  }
}

async function fetchProjects() {
  if (!process.env.DATABASE_URL) {
    return jsonContentRepository.getProjects();
  }

  try {
    return await prismaContentRepository.getProjects();
  } catch (error) {
    console.warn(
      "Failed to fetch projects from database, falling back to static seed content:",
      error,
    );
    return jsonContentRepository.getProjects();
  }
}

export const getPublicHomeContent = unstable_cache(
  fetchHomeContent,
  ["public-home-content"],
  { revalidate: 3_600, tags: ["public-content", "home-content"] },
);

export const getPublicProjects = unstable_cache(
  fetchProjects,
  ["public-projects"],
  { revalidate: 3_600, tags: ["public-content", "project-content"] },
);
