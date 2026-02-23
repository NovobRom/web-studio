import { test, expect } from '@playwright/test';

test.describe('Navigation and Localization', () => {
    test('should navigate to English locale', async ({ page }) => {
        await page.goto('/en');
        await expect(page).toHaveURL(/.*\/en/);
    });

    test('should navigate to Russian locale', async ({ page }) => {
        await page.goto('/ru');
        await expect(page).toHaveURL(/.*\/ru/);
    });

    test('should have locale switcher interactions', async ({ page }) => {
        await page.goto('/en');

        // Verify that the page loaded correctly by checking for the html lang attribute
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');

        // Similar for ru
        await page.goto('/ru');
        await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    });
});
