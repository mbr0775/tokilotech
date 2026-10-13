import assert from "node:assert/strict";
import { test } from "node:test";
import { buildContentPayload } from "../lib/content-management.ts";
const options = {
  id: "test-id",
  imageUrl: "https://example.com/image.jpg",
  active: false,
  inStock: false,
  status: "completed",
};
test("product updates match the mobile contract and preserve display price formatting", () => {
  const payload = buildContentPayload(
    "products",
    {
      name: "  Router  ",
      brand: "  Brand  ",
      price: " LKR 12,500 ",
      description: " ",
    },
    options,
  );
  assert.equal(payload.name, "Router");
  assert.equal(payload.price, "LKR 12,500");
  assert.equal(payload.description, null);
  assert.equal(payload.in_stock, false);
  assert.equal(payload.is_active, false);
  assert.equal(payload.image_url, options.imageUrl);
  assert.equal("status" in payload, false);
});
test("public portfolio edits do not overwrite confidential mobile pricing", () => {
  const payload = buildContentPayload(
    "portfolio",
    {
      title: " Project ",
      client_name: " Client ",
      original_price: "private",
      agreed_price: "private",
    },
    options,
  );
  assert.equal(payload.title, "Project");
  assert.equal(payload.status, "completed");
  assert.equal("original_price" in payload, false);
  assert.equal("agreed_price" in payload, false);
  assert.equal("in_stock" in payload, false);
});
test("invalid required fields and project states fail before any write", () => {
  assert.throws(
    () => buildContentPayload("products", { name: " " }, options),
    /required/,
  );
  assert.throws(
    () =>
      buildContentPayload(
        "portfolio",
        { title: "Project" },
        { ...options, status: "invented" },
      ),
    /valid project status/,
  );
});
