// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import { TextEncoder, TextDecoder } from 'util'

// Polyfill TextEncoder and TextDecoder for react-dom/server
// These are needed when using renderToString in visual tests
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Polyfill setImmediate and clearImmediate for Playwright
// These are Node.js globals needed by Playwright but not available in jsdom
if (typeof global.setImmediate === 'undefined') {
  global.setImmediate = function(callback, ...args) {
    return setTimeout(() => callback(...args), 0)
  }
  global.clearImmediate = function(id) {
    return clearTimeout(id)
  }
}

// Suppress useLayoutEffect warnings in visual tests
// Ant Design components use useLayoutEffect which doesn't work in SSR
// This is expected behavior for server-side rendering and doesn't affect visual test results
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    // Suppress useLayoutEffect warning from Ant Design in SSR context
    if (
      typeof args[0] === 'string' &&
      args[0].includes('useLayoutEffect does nothing on the server')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

// Extend Jest with visual regression matcher
expect.extend({ toMatchImageSnapshot })

// Setup MSW server for API mocking (only if MSW is installed and available)
// Note: Visual tests don't require MSW as they test component appearance with static data
let server
try {
  // Try to require MSW - Jest will transpile TypeScript files automatically
  // If MSW is not available, tests will continue without API mocking (this is fine for visual tests)
  const mswModule = require('./mocks/server')
  
  if (mswModule && mswModule.server) {
    server = mswModule.server
    
    // Establish API mocking before all tests
    beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
    
    // Reset any request handlers that we may add during the tests,
    // so they don't affect other tests
    afterEach(() => server.resetHandlers())
    
    // Clean up after the tests are finished
    afterAll(() => server.close())
  }
} catch (error) {
  // MSW not available - this is expected and fine for visual tests
  // Visual tests use static mock data and don't need API mocking
  // Integration tests that need MSW will handle their own MSW setup
  // No warning needed - silently continue
}

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
