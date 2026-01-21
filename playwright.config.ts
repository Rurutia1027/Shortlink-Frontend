import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright Configuration for Visual Regression Tests with Storybook
 * 
 * This configuration runs visual regression tests against Storybook stories.
 * Stories are accessed via Storybook's iframe API for isolated component testing.
 */

export default defineConfig({
  testDir: './__tests__/visual',
  
  // Run visual tests sequentially to avoid race conditions
  fullyParallel: false,
  workers: 1,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  
  // Reporter to use
  reporter: [
    ['html'],
    ['json', { outputFile: 'playwright-report/visual-results.json' }],
    ['list'],
  ],
  
  // Shared settings for all projects
  use: {
    // Base URL for Storybook
    baseURL: 'http://localhost:6006',
    
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
    
    // Video on failure
    video: 'retain-on-failure',
    
    // Viewport size for visual regression tests
    viewport: { width: 1280, height: 720 },
  },
  
  // Configure projects for different browsers
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Visual regression test configuration
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
      },
    },
    // Uncomment to test in multiple browsers
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },
  ],
  
  // Run Storybook before starting the visual tests
  webServer: {
    command: 'npm run build-storybook && npx serve storybook-static -p 6006',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env.CI,
    timeout: 120000, // 2 minutes
    // For development, you can also use:
    // command: 'npm run storybook',
    // url: 'http://localhost:6006',
  },
  
  // Expect options for visual comparisons
  expect: {
    // Threshold for pixel comparison (0-1, where 0 is exact match)
    toHaveScreenshot: {
      threshold: 0.2,
      maxDiffPixels: 100,
    },
    // Threshold for snapshot comparison
    toMatchSnapshot: {
      threshold: 0.2,
    },
  },
})
