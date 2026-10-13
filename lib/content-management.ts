export type ManagedContent = "products" | "portfolio";
export type ContentRow = {
  id: string;
  name?: string;
  title?: string;
  brand?: string | null;
  client_name?: string | null;
  category: string | null;
  description: string | null;
  price?: string | null;
  technologies?: string | null;
  status?: string;
  image_url: string | null;
  in_stock?: boolean;
  is_active: boolean;
  created_at: string;
};

export const contentSchemas = {
  products: {
    table: "it_products",
    label: "Products",
    singular: "product",
    titleField: "name",
    fields: [
      { key: "name", label: "Product name", required: true },
      { key: "brand", label: "Brand" },
      { key: "category", label: "Category" },
      {
        key: "price",
        label: "Display price",
        placeholder: "Use the same price format as the mobile app",
      },
      { key: "description", label: "Description", multiline: true },
    ],
    select:
      "id,name,brand,category,description,price,image_url,in_stock,is_active,created_at",
    folder: "products",
  },
  portfolio: {
    table: "portfolio",
    label: "Portfolio projects",
    singular: "portfolio project",
    titleField: "title",
    fields: [
      { key: "title", label: "Project title", required: true },
      { key: "client_name", label: "Client name" },
      { key: "category", label: "Category" },
      { key: "technologies", label: "Technologies" },
      { key: "description", label: "Description", multiline: true },
    ],
    select:
      "id,title,client_name,category,description,technologies,status,image_url,is_active,created_at",
    folder: "portfolio",
  },
} as const;

export type ContentDraft = Record<string, string>;
export function buildContentPayload(
  kind: ManagedContent,
  draft: ContentDraft,
  options: {
    id: string;
    imageUrl: string;
    active: boolean;
    inStock: boolean;
    status: string;
  },
) {
  const schema = contentSchemas[kind];
  const title = draft[schema.titleField]?.trim();
  if (!title)
    throw new Error(
      `${kind === "products" ? "Product name" : "Project title"} is required.`,
    );
  if (
    kind === "portfolio" &&
    !["completed", "ongoing", "upcoming"].includes(options.status)
  )
    throw new Error("Select a valid project status.");
  const payload: Record<string, string | boolean | null> = {
    id: options.id,
    image_url: options.imageUrl || null,
    is_active: options.active,
    updated_at: new Date().toISOString(),
  };
  schema.fields.forEach((field) => {
    payload[field.key] = draft[field.key]?.trim() || null;
  });
  if (kind === "products") payload.in_stock = options.inStock;
  else payload.status = options.status;
  return payload;
}
