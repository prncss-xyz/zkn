import { test, expect } from "@playwright/test";
import { PORT } from "./utils";

test("should navigate to the note content", async ({ page }) => {
  await page.goto(`http://localhost:${PORT}/notes`);
  await page.click("text=Toto");
  await expect(page.locator("h1")).toContainText("Toto");
  // clicking link whithin markdown
  await page.click("text=Tutu");
  await expect(page.locator("h1")).toContainText("Tutu");
  // clicking backlink
  await page.getByRole("link").and(page.getByText("Toto")).click();
  await expect(page.locator("h1")).toContainText("Toto");
});
