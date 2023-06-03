import { test, expect } from "@playwright/test";

const PORT = process.env.PORT || 3000;

test("should navigate to the note content", async ({ page }) => {
  await page.goto(`http://localhost:${PORT}/`);
  await page.click("text=Toto");
  await expect(page.locator("h1")).toContainText("Toto");
  // clicking link whithin markdown
  await page.click("text=Tutu");
  await expect(page.locator("h1")).toContainText("Tutu");
  // clicking backlink
  await page.click("text=Toto");
  await expect(page.locator("h1")).toContainText("Toto");
});
