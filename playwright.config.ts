import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright Configuration for Visual Regression and E2E Tests
 * See https://playwright.dev/docs/test-configuration
 */

export default defineConfig({
    testDir: './__tests__',

    // Run tests in files in parallel 
    fullyParallel: false, // Visual tests should run sequentially for consistency 

    // Fail the build on CI if we accidentally left test.only in the source code 
    forbidOnly: !!process.env.CI,

    // Retry on CI only 
    retries: process.env.CI ? 2 : 0, 

    // Opt out of parallel tests on CI 
    workers: process.env.CI ? 1 : 1, // One at a time for visual consistency 

    // Reporter to use 
    reporter: [
        [ 'html' ],
        [ 'json', {outputFile: 'playwright-report/results.json'} ],
    ], 

    // Shared settings for all projects 
    use: {
        // Base URL to use in actions like `await page.goto('/)`
        baseURL: 'http://localhost:3000', 

        // Collect trace when retrying the failed test 
        trace: 'on-first-retry', 

        // Screenshort on failure , 
        screenshot: 'only-on-failure', 

        // Video on failure 
        video: 'retain-on-failure', 

        // Viewport size 
        viewport: { width: 1280, height: 720}, 
    }, 

    // Configure projects for major browsers 
    projects: [
        {
            name: 'visual-regression',
            testMatch: '**/*.visual.test.{ts,tsx}',
            use: {
                ...devices['Desktop Chrome'],
                screenshot: 'on', // Always screenshot for visual tests
                trace: 'off', // No tracing needed for visual tests
                video:  'off', // No video needed for visual tests
            },
        }, 
        {
            name: 'e2e',
            testMatch: '**/*.e2e.test.ts',
            use: {
                ...devices['Desktop Chrome'],
                screenshot: 'only-on-failure',
                trace: 'on-first-retry',
                video: 'retain-on-failure',
            },
        }, 
    ], 

    // Run your local dev server before starting the tests 
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 120000, // 2 minutes 
    }
})