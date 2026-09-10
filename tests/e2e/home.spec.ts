import { expect, test } from "@playwright/test";

test("renders the starter landing page", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "SaaS Biz" })).toBeVisible();
  await expect(page.getByText("A safe foundation for your next product.")).toBeVisible();
});

test("health endpoint reports readiness", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBeTruthy();
  await expect(response.json()).resolves.toMatchObject({ status: "ok" });
});
