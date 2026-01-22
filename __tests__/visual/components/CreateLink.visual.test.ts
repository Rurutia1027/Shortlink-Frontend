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
    await page.goto('http://localhost:6006/iframe.html?id=components-createlink--default')
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle')
    
    // Wait for the modal to appear - Ant Design Modal renders in a portal
    // Try multiple selectors for better reliability
    await page.waitForSelector('[role="dialog"]', { timeout: 30000 }).catch(() => {
      // Fallback to class selector if role is not available
      return page.waitForSelector('.ant-modal', { timeout: 30000 })
    })
    
    // Wait for modal animations to complete
    await page.waitForTimeout(500)
    
    // Take screenshot and compare
    await expect(page).toHaveScreenshot('create-link-default.png')
  })

  test('should match with default group selected', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-createlink--with-default-group')
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle')
    
    // Wait for the modal to appear
    await page.waitForSelector('[role="dialog"]', { timeout: 30000 }).catch(() => {
      return page.waitForSelector('.ant-modal', { timeout: 30000 })
    })
    
    // Wait for modal animations to complete
    await page.waitForTimeout(500)
    
    await expect(page).toHaveScreenshot('create-link-with-default-group.png')
  })

  test('should match with empty groups', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-createlink--empty-groups')
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle')
    
    // Wait for the modal to appear
    await page.waitForSelector('[role="dialog"]', { timeout: 30000 }).catch(() => {
      return page.waitForSelector('.ant-modal', { timeout: 30000 })
    })
    
    // Wait for modal animations to complete
    await page.waitForTimeout(500)
    
    await expect(page).toHaveScreenshot('create-link-empty-groups.png')
  })
})
