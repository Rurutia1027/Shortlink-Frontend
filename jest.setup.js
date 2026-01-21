// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { toMatchImageSnapshot } from 'jest-image-snapshot'

// Extend Jest with visual regression matcher
expect.extend({ toMatchImageSnapshot })

// Setup MSW server for API mocking (only if MSW is installed)
let server
try {
  const mswModule = require('./mocks/server')
  server = mswModule.server
  
  // Establish API mocking before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
  
  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests
  afterEach(() => server.resetHandlers())
  
  // Clean up after the tests are finished
  afterAll(() => server.close())
} catch (error) {
  // MSW not installed yet - tests will run without API mocking
  console.warn('MSW not available - API mocking disabled. Run "npm install" to enable.')
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
