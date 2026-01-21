import React from 'react'
import { renderToString } from 'react-dom/server'
import { chromium, Browser, Page } from 'playwright'
import fs from 'fs'
import path from 'path'

/**
 * Render React Component to Image Buffer
 * 
 * This utility renders a React component to HTML and then uses Playwright
 * to convert it to an image for visual regression testing.
 */

let browser: Browser | null = null

/**
 * Initialize browser instance (call once before tests)
 */
export async function initBrowser(): Promise<void> {
  if (!browser) {
    browser = await chromium.launch()
  }
}

/**
 * Close browser instance (call once after tests)
 */
export async function closeBrowser(): Promise<void> {
  if (browser) {
    await browser.close()
    browser = null
  }
}

/**
 * Render React component to image buffer
 * 
 * @param component - React component to render
 * @param options - Rendering options
 * @returns Image buffer (PNG)
 */
export async function renderComponentToImage(
  component: React.ReactElement,
  options?: {
    width?: number
    height?: number
    backgroundColor?: string
  }
): Promise<Buffer> {
  if (!browser) {
    await initBrowser()
  }

  const page = await browser!.newPage()
  
  try {
    // Render component to HTML string
    const htmlString = renderToString(component)
    
    // Create full HTML document with styles
    const fullHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              background-color: ${options?.backgroundColor || '#ffffff'};
            }
            /* Ant Design styles - basic reset */
            .ant-form-item {
              margin-bottom: 24px;
            }
            .ant-input, .ant-select-selector {
              border-radius: 4px;
            }
          </style>
          <!-- Add Ant Design CSS if needed -->
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/antd@5.21.0/dist/reset.css">
        </head>
        <body>
          <div id="root" style="padding: 20px;">
            ${htmlString}
          </div>
        </body>
      </html>
    `
    
    // Set viewport size
    await page.setViewportSize({
      width: options?.width || 1280,
      height: options?.height || 720,
    })
    
    // Set content
    await page.setContent(fullHTML, { waitUntil: 'networkidle' })
    
    // Wait for any animations/transitions
    await page.waitForTimeout(500)
    
    // Take screenshot
    const screenshot = await page.screenshot({
      fullPage: false, // Only capture viewport
      type: 'png',
    })
    
    return screenshot as Buffer
  } finally {
    await page.close()
  }
}

/**
 * Render React component to image buffer (simpler version using html-to-image)
 * Alternative approach - faster but may have CSS limitations
 */
export async function renderComponentToImageSimple(
  component: React.ReactElement
): Promise<Buffer> {
  // This would require html-to-image library
  // For now, use Playwright approach above
  return renderComponentToImage(component)
}
