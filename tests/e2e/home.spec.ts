import { expect, test } from "@playwright/test";

test("renders the property portfolio dashboard", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Your homes are having a good month/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Your places" })).toBeVisible();
  await expect(page.getByText("Lakeview Apartment").first()).toBeVisible();
  await expect(page.getByText("Monthly net income")).toBeVisible();
  await page.getByRole("link", { name: "Open home →" }).first().click();
  await expect(page.getByRole("heading", { name: "Lakeview Apartment" })).toBeVisible();
  await expect(page.getByText("What you paid")).toBeVisible();
});

test("health endpoint reports readiness", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBeTruthy();
  await expect(response.json()).resolves.toMatchObject({ status: "ok" });
});
