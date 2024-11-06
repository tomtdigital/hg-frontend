import { test, expect } from '@playwright/test';

test.describe('Public Route Tests', () => {
  test('should navigate to the login page', async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('http://localhost:3000/');
    // The new page should contain an h1 with "About"
    await expect(page.locator('h1')).toContainText('Hannagrams');

    // Find an element with the text 'About' and click on it
    await page.click('text=login');
    // The new URL should be "/about" (baseURL is used there)
    await expect(page).toHaveURL('http://localhost:3000/login');
    // The new page should contain an h1 with "About"
    await expect(page.locator('h1')).toContainText('Please');
    // Type in email input
    await page.getByLabel('Email').fill('heloooooo');
    await page.getByLabel('Password').fill('heloooooo');
    await page.getByRole('button', { name: 'Log in' }).click();
  });
});
