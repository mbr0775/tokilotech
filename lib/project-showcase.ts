export type ShowcaseImage = {
  id: string;
  image_url: string;
  sort_order: number | null;
};

export type ShowcasePortfolio = {
  id: string;
  title: string;
  category: string | null;
  client_name: string | null;
  description: string | null;
  is_active: boolean;
};

export type ShowcaseRow = {
  id: string;
  portfolio_id: string | null;
  title: string;
  subtitle: string | null;
  image_url: string | null;
  sort_order: number | null;
  is_active: boolean;
  created_at: string;
  portfolio: ShowcasePortfolio | null;
  project_images: ShowcaseImage[];
};

export type ProjectMedia = {
  id: string;
  media_url: string;
  media_type: "image" | "video" | "mockup";
  alt_text: string | null;
  sort_order: number | null;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  client_name: string | null;
  description: string | null;
  live_url: string | null;
  github_url: string | null;
  cover_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  project_media: ProjectMedia[];
};

// Select only public portfolio fields; prices stay in the mobile admin panel.
export const SHOWCASE_SELECT =
  "id,portfolio_id,title,subtitle,image_url,sort_order,is_active,created_at,portfolio(id,title,category,client_name,description,is_active),project_images(id,image_url,sort_order)";
export const PROJECT_MEDIA_BUCKET = "tokilo-media";

export function showcaseToProject(row: ShowcaseRow): Project {
  const portfolio = row.portfolio?.is_active ? row.portfolio : null;
  const images = [...(row.project_images || [])].sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
  );

  return {
    id: row.id,
    title: row.title,
    // An ID keeps links stable when a title is edited in either application.
    slug: row.id,
    category: portfolio?.category || row.subtitle?.trim() || "Project",
    client_name: portfolio?.client_name || null,
    description: portfolio?.description || row.subtitle || null,
    live_url: null,
    github_url: null,
    cover_url: row.image_url,
    is_featured: (row.sort_order ?? 0) < 0,
    is_published: row.is_active,
    created_at: row.created_at,
    project_media: images.map((image) => ({
      id: image.id,
      media_url: image.image_url,
      media_type: "image",
      alt_text: row.title,
      sort_order: image.sort_order,
    })),
  };
}

export function isShowcaseId(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}
