import { expect, test } from "@playwright/test";

test("renders the property portfolio dashboard", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Good morning, Alex." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Your properties" })).toBeVisible();
  await expect(page.getByText("Lakeview Apartment").first()).toBeVisible();
  await expect(page.getByText("Monthly net income")).toBeVisible();
});

test("health endpoint reports readiness", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBeTruthy();
  await expect(response.json()).resolves.toMatchObject({ status: "ok" });
});
