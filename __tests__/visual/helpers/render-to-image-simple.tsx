import React from 'react'
import { render } from '@testing-library/react'
import { chromium, Browser } from 'playwright'

/**
 * Simple Component-to-Image Renderer
 * 
 * Alternative approach: Render component using React Testing Library,
 * then convert the DOM element to image using Playwright.
 * 
 * This is simpler but requires a browser instance.
 */

let browser: Browser | null = null

/**
 * Initialize browser instance
 */
export async function initBrowser(): Promise<void> {
  if (!browser) {
    browser = await chromium.launch()
  }
}

/**
 * Close browser instance
 */
export async function closeBrowser(): Promise<void> {
  if (browser) {
    await browser.close()
    browser = null
  }
}

/**
 * Render React component to image buffer using React Testing Library + Playwright
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
  }
): Promise<Buffer> {
  if (!browser) {
    await initBrowser()
  }

  // Render component using React Testing Library
  const { container } = render(component)
  
  // Get the HTML string
  const htmlString = container.innerHTML
  
  // Create a page and set content
  const page = await browser!.newPage()
  
  try {
    // Create full HTML document
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
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              background-color: #ffffff;
              padding: 20px;
            }
          </style>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/antd@5.21.0/dist/reset.css">
        </head>
        <body>
          <div id="root">
            ${htmlString}
          </div>
        </body>
      </html>
    `
    
    await page.setViewportSize({
      width: options?.width || 1280,
      height: options?.height || 720,
    })
    
    await page.setContent(fullHTML, { waitUntil: 'networkidle' })
    await page.waitForTimeout(500) // Wait for any animations
    
    const screenshot = await page.screenshot({
      fullPage: false,
      type: 'png',
    })
    
    return screenshot as Buffer
  } finally {
    await page.close()
  }
}
