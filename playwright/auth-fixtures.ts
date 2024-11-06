import { test as baseTest, expect } from '@playwright/test';
import fs from 'fs';
import { acquireAccount } from './utils/acquire-account';
import path from 'path';

/* 
  Runs when you import { expect, test } from '../auth-fixtures' only;
  Creates/reads from .auth/${id}.json using test worker accounts (only 2 exist)
*/
export * from '@playwright/test';
export const test = baseTest.extend<object, { workerStorageState: string }>({
  // Use the same storage state for all tests in this worker.
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  // Authenticate once per worker with a worker-scoped fixture.
  workerStorageState: [
    async ({ browser }, use) => {
      // Use parallelIndex as a unique identifier for each worker.
      const id = test.info().parallelIndex;
      const fileName = path.resolve(
        test.info().project.testDir.replace('specs', '.auth'),
        `${id}.json`
      );

      if (fs.existsSync(fileName)) {
        // Reuse existing authentication state if any.
        await use(fileName);
        return;
      }

      // Important: make sure we authenticate in a clean environment by unsetting storage state.
      const page = await browser.newPage({ storageState: undefined });

      // Acquire a unique account, for example create a new one.
      // Alternatively, you can have a list of precreated accounts for testing.
      // Make sure that accounts are unique, so that multiple team members
      // can run tests at the same time without interference.
      const account = await acquireAccount(id);
      // Perform authentication steps. Replace these actions with your own.
      await page.goto('http://localhost:3000/login');
      await page.getByLabel('Email').fill(account.email || '');
      await page.getByLabel('Password').fill(account.password || '');
      await page.getByRole('button', { name: 'Log in' }).click();

      // Wait until the page receives the cookies.
      //
      // Sometimes login flow sets cookies in the process of several redirects.
      // Wait for the final URL to ensure that the cookies are actually set.
      await page.waitForURL('http://localhost:3000/games');
      // Alternatively, you can wait until the page reaches a state where all cookies are set.
      await expect(page.locator('p').first()).toContainText('Latest Games');

      // End of authentication steps.
      await page.context().storageState({ path: fileName });
      await page.close();
      await use(fileName);
    },
    { scope: 'worker' },
  ],
});
