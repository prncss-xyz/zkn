import { test, expect } from "@playwright/test";
import { delai, PORT } from "./utils";

test("should navigate to the note content", async ({ page }) => {
  await page.goto(`http://localhost:${PORT}/notes`);
  await page.click("text=Toto");
  await expect(page.locator("h1")).toContainText("Toto");
  // clicking link whithin markdown
  await page.click("text=Tutu");
  await expect(page.locator("h1")).toContainText("Tutu");
  // clicking backlink
  await delai(300);
  await page.click("role=button");
  await expect(page.locator("h1")).toContainText("Toto");
});
