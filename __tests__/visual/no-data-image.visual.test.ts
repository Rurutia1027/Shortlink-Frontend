/// <reference types="jest" />

import fs from 'fs'
import path from 'path'

/**
 * Simple visual regression smoke test using an existing static asset. 
 * 
 * This does not render a React component.
 * It just ensures that the baseline PNG in `public/images/no-data.png`
 * does not change unexpectly (pixel-level snapshot).
 * 
 * Later, we can replace this with real component screenshots 
 * capture via Playwright/Puppeteer + jest-image-snapshot. 
*/
describe('Visual Regression - static assets', () => { 
    it('no-data image matches the visual snapshot', () => { 
        const imagePath = path.join(process.cwd(), 'public', 'images', 'no-data.png')
        const imageBuffer = fs.readFileSync(imagePath)

        expect(imageBuffer).toMatchImageSnapshot({
            customSnapshotIdentifier: 'no-data-image'
        })
    })
})