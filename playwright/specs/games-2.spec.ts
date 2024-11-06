import { expect, test } from '../auth-fixtures';

test('should navigate to the games page', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/games');
  // The authenticated page should contain a p with "Latest Games"
  await expect(page.locator('p').first()).toContainText('Latest Games');
});
