import { cache } from "react";
import { supabasePublic } from "./supabasePublicClient";
import {
  SHOWCASE_SELECT,
  showcaseToProject,
  type ShowcaseRow,
} from "./project-showcase";

export const getPublicProjects = cache(async () => {
  const { data, error } = await supabasePublic
    .from("project_showcase")
    .select(SHOWCASE_SELECT)
    .eq("is_active", true)
    .order("sort_order")
    .order("created_at", { ascending: false });
  return {
    projects: error
      ? []
      : ((data ?? []) as unknown as ShowcaseRow[]).map(showcaseToProject),
    error: error ? "We could not load the projects. Please try again." : "",
  };
});
