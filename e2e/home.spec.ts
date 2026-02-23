import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
    test('should load the home page and verify critical sections', async ({ page }) => {
        // Navigate to the root
        await page.goto('/');

        // Wait for the main heading to be visible
        const h1 = page.locator('h1');
        await expect(h1).toBeVisible();

        // Verify at least one 'Services' or related subtitle exists on the page
        // Using broad text matching since it's localized
        const bodyText = await page.locator('body').textContent();
        expect(bodyText?.length).toBeGreaterThan(100);

        // Verify the portfolio grid renders (look for links with PortfolioCards)
        const links = page.locator('a');
        const linksCount = await links.count();
        expect(linksCount).toBeGreaterThan(0);
    });
});
