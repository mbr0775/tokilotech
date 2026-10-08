import assert from "node:assert/strict";
import { test } from "node:test";
import { isShowcaseId, showcaseToProject, SHOWCASE_SELECT } from "../lib/project-showcase.ts";

const showcase = {
  id: "a0641d87-7c0a-4d37-a805-9be910f24c40",
  portfolio_id: null,
  title: "Project showcase",
  subtitle: "Mobile App",
  image_url: null,
  sort_order: 3,
  is_active: true,
  created_at: "2026-10-08T00:00:00Z",
  portfolio: null,
  project_images: [],
};

test("standalone showcases work without a portfolio or images", () => {
  const project = showcaseToProject(showcase);
  assert.equal(project.category, "Mobile App");
  assert.equal(project.description, "Mobile App");
  assert.equal(project.is_published, true);
  assert.deepEqual(project.project_media, []);
  assert.equal(showcaseToProject({ ...showcase, subtitle: null }).category, "Project");
});

test("active portfolio details enrich the showcase; inactive details stay private", () => {
  const portfolio = {
    id: "portfolio-id", title: "Portfolio title", category: "Website",
    client_name: "Example Client", description: "Case study", is_active: true,
  };
  const project = showcaseToProject({ ...showcase, portfolio });
  assert.equal(project.title, showcase.title);
  assert.equal(project.category, "Website");
  assert.equal(project.client_name, "Example Client");
  assert.equal(project.description, "Case study");
  const inactive = showcaseToProject({ ...showcase, portfolio: { ...portfolio, is_active: false } });
  assert.equal(inactive.client_name, null);
  assert.equal(inactive.description, showcase.subtitle);
  assert.ok(!SHOWCASE_SELECT.includes("agreed_price"));
  assert.ok(!SHOWCASE_SELECT.includes("original_price"));
});

test("gallery order follows mobile sort_order without changing the source rows", () => {
  const images = [
    { id: "last", image_url: "https://example.com/last.jpg", sort_order: 5 },
    { id: "first", image_url: "https://example.com/first.jpg", sort_order: null },
  ];
  const project = showcaseToProject({ ...showcase, project_images: images });
  assert.deepEqual(project.project_media.map((image) => image.id), ["first", "last"]);
  assert.equal(project.project_media[0].media_type, "image");
  assert.deepEqual(images.map((image) => image.id), ["last", "first"]);
});

test("project links survive title changes and reject malformed IDs", () => {
  assert.equal(showcaseToProject(showcase).slug, showcaseToProject({ ...showcase, title: "New title" }).slug);
  assert.equal(isShowcaseId(showcase.id), true);
  assert.equal(isShowcaseId("not-a-project"), false);
  assert.equal(isShowcaseId(`${showcase.id}/other`), false);
});

test("shared publishing and order fields map correctly", () => {
  assert.equal(showcaseToProject({ ...showcase, is_active: false }).is_published, false);
  assert.equal(showcaseToProject({ ...showcase, sort_order: -1 }).is_featured, true);
  assert.equal(showcaseToProject({ ...showcase, sort_order: 0 }).is_featured, false);
});
