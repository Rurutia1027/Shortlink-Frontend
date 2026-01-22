import { test, expect } from '@playwright/test'

/**
 * Visual Regression Tests for CreateLink Component 
 * 
 * These tests run against Storybook stories to ensure visual consistency.
 * Run Storybook first: npm run storybook 
*/

test.describe('CreateLink Component Visual Regression', () => { 
    test.beforeEach(async ({ page }) => {
        // Ensure Storybook is running on localhost:6006
    })

    test('should match default state', async ({ page }) => { 
        // Navigate to the CreateLink default story 
        await page.goto('http://localhost:6006/iframe.html?id=components-createlink--default&args=visible:true')
        
        // Wait for the modal to appear
        await page.waitForSelector('.ant-modal', {timeout: 10000})

        // Wait a bit for any animations to complete
        await page.waitForTimeout(300)
        // Take snapshot and compare 
        await expect(page).toHaveScreenshot('create-link-default.png')
    })
})