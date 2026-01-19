# Shortlink Frontend
[![Shortlink Frontend CI](https://github.com/Rurutia1027/Shortlink-Frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/Rurutia1027/Shortlink-Frontend/actions/workflows/ci.yml)

A modern, production-ready short link management application built with React, Next.js, and TypeScript. This project provides a comprehensive solution for creating, managing, and analyzing short links with advanced analytics capabilities.

## 🚀 Tech Stack

### Core Framework
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development

### UI & Styling
- **[Ant Design 5.x](https://ant.design/)** - Enterprise-class UI component library
- **[CSS Modules](https://github.com/css-modules/css-modules)** - Scoped CSS styling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### State Management
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management

### Form Management
- **[React Hook Form](https://react-hook-form.com/)** - Performant form library
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Data Visualization
- **[Recharts](https://recharts.org/)** - Composable charting library for React

### HTTP Client
- **[Axios](https://axios-http.com/)** - Promise-based HTTP client

### Additional Libraries
- **[@dnd-kit](https://dndkit.com/)** - Drag and drop toolkit
- **[dayjs](https://day.js.org/)** - Date manipulation library
- **[qrcode.react](https://www.npmjs.com/package/qrcode.react)** - QR code generation

### Testing Stack
- **[Jest](https://jestjs.io/)** - JavaScript testing framework
- **[React Testing Library](https://testing-library.com/react)** - React component testing utilities
- **[@testing-library/jest-dom](https://testing-library.com/jest-dom)** - Custom Jest matchers
- **[@testing-library/user-event](https://testing-library.com/docs/user-event/intro)** - User interaction simulation
- **[Playwright](https://playwright.dev/)** - End-to-end testing framework (planned)

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking

---

## 📋 Project Overview

Shortlink Frontend is a full-featured web application for managing short links with the following capabilities:

### Key Features
- **Link Management**: Create, edit, delete, and organize short links
- **Batch Operations**: Bulk create multiple short links at once
- **Group Organization**: Organize links into groups with drag-and-drop sorting
- **Analytics Dashboard**: Comprehensive analytics with charts and access logs
- **QR Code Generation**: Generate and download QR codes for short links
- **Recycle Bin**: Restore or permanently delete removed links
- **User Management**: Profile management and authentication
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Project Status
- **Overall Completion**: ~95%
- **Pages**: 4/4 (100%)
- **Components**: 5/5 (100%)
- **API Layer**: Complete
- **Infrastructure**: Complete

---

## 🧪 Testing Strategy

This project follows a comprehensive testing strategy with multiple levels of testing to ensure code quality and reliability.

### Testing Pyramid

```
        /\
       /  \      E2E Tests (Playwright)
      /____\     - Full user flows
     /      \    - Critical paths
    /________\   - Few, slow, expensive
   /          \
  / Unit Tests \  Jest + React Testing Library
 /____________\  - Components
/              \ - Utilities
/ Integration   \ - Multiple components together
/________________\
```

### 1. Unit Tests (Jest + React Testing Library)

**Purpose:** Test individual components and functions in isolation

**Libraries:**
- Jest - Test runner
- React Testing Library - Component testing
- @testing-library/jest-dom - DOM matchers
- @testing-library/user-event - User interaction simulation

**Coverage:**
- Component rendering
- Props handling
- User interactions (clicks, inputs)
- State changes
- Utility functions
- Custom hooks

**Example:**
```tsx
// app/home/space/components/QRCode/QRCode.test.tsx
describe('QRCode Component', () => {
  it('renders QR code modal when visible is true', () => {
    render(<QRCode url="https://example.com" visible={true} onClose={mockOnClose} />)
    expect(screen.getByTestId('modal-qrcode')).toBeInTheDocument()
  })
})
```

**Target:** 50-100 unit tests

---

### 2. Integration Tests (Jest + React Testing Library)

**Purpose:** Test multiple components working together

**Coverage:**
- Form submission flows
- Modal interactions
- Table with pagination
- Parent-child component communication
- Feature workflows

**Example:**
```tsx
// Integration test example
describe('CreateLink Integration', () => {
  it('creates link and updates table', async () => {
    render(<MySpacePage />)
    // Click create button
    // Fill form
    // Submit
    // Verify table updated
  })
})
```

**Target:** 20-30 integration tests

---

### 3. End-to-End Tests (Playwright)

**Purpose:** Test complete user flows in a real browser

**Libraries:**
- Playwright - Modern E2E testing framework

**Coverage:**
- Critical user flows
- Login/Registration
- Create/Edit/Delete links
- Group management
- Analytics viewing
- Cross-browser testing

**Example:**
```typescript
// E2E test example (Playwright)
test('should create a new short link', async ({ page }) => {
  await page.goto('/home/space')
  await page.click('[data-testid="button-create-link"]')
  await page.fill('[data-testid="input-origin-url"]', 'https://example.com')
  await page.fill('[data-testid="textarea-describe"]', 'Test link')
  await page.click('[data-testid="button-submit"]')
  await expect(page.locator('[data-testid="table-shortlinks-list"]')).toContainText('Test link')
})
```

**Target:** 10-15 E2E tests

---

### 4. BDD Testing Support (Behavior-Driven Development)

**Purpose:** Write tests in natural language to describe behavior

**Approach:**
We support BDD-style test descriptions using descriptive test names and organized test suites that follow the Given-When-Then pattern.

**Example:**
```tsx
describe('CreateLink Component', () => {
  describe('Given the user wants to create a short link', () => {
    describe('When the form is filled with valid data', () => {
      it('Then it should submit successfully and show success message', async () => {
        // Test implementation
      })
    })

    describe('When the URL is invalid', () => {
      it('Then it should show validation error', async () => {
        // Test implementation
      })
    })
  })
})
```

**BDD Tools (Future):**
- **[Cucumber.js](https://cucumber.io/docs/installation/javascript/)** - BDD framework for JavaScript
- **[Gherkin](https://cucumber.io/docs/gherkin/)** - Natural language test specifications

---

## 🎯 Test Data IDs (E2E Automation Support)

### Strategy: Embedded Test Data IDs

All interactive components include `data-testid` attributes for reliable E2E testing. This ensures stable selectors that won't break with UI changes.

### Naming Convention

```
data-testid="[component-type]-[component-name]-[action/element]"
```

### Examples

| Component | Test ID | Example |
|-----------|---------|---------|
| Button | `button-[name]-[action]` | `data-testid="button-create-link"` |
| Input | `input-[name]-field` | `data-testid="input-origin-url"` |
| Modal | `modal-[name]` | `data-testid="modal-create-link"` |
| Table | `table-[name]-list` | `data-testid="table-shortlinks-list"` |
| Form | `form-[name]` | `data-testid="form-create-link"` |

### Implementation Status

✅ **All components include `data-testid` attributes:**
- QRCode component
- ChartsInfo component
- CreateLink component
- CreateLinks component
- EditLink component
- All modals
- All forms
- All buttons

### Usage in Tests

```typescript
// Playwright E2E test
test('should create a new link', async ({ page }) => {
  await page.goto('/home/space')
  
  // Use data-testid selectors
  await page.click('[data-testid="button-create-link"]')
  await page.waitForSelector('[data-testid="modal-create-link"]')
  await page.fill('[data-testid="input-origin-url"]', 'https://example.com')
  await page.fill('[data-testid="textarea-describe"]', 'Test Link')
  await page.selectOption('[data-testid="select-group"]', 'group-id')
  await page.click('[data-testid="button-submit"]')
  
  // Verify success
  await expect(page.locator('[data-testid="modal-create-link"]')).not.toBeVisible()
  await expect(page.locator('[data-testid="table-shortlinks-list"]')).toContainText('Test Link')
})
```

### Benefits

1. **Stable Selectors**: Don't break when CSS classes or structure changes
2. **Clear Intent**: Test IDs describe what the element is, not how it looks
3. **E2E Ready**: Playwright/Cypress can reliably find elements
4. **Maintainable**: Easy to update tests when features change

---

## 📁 Project Structure

```
Shortlink-Frontend/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth routes
│   │   └── login/                # Login page
│   └── home/                     # Protected routes
│       ├── space/                # Main short link management
│       │   ├── components/       # Page-specific components
│       │   │   ├── QRCode/
│       │   │   ├── ChartsInfo/
│       │   │   ├── CreateLink/
│       │   │   ├── CreateLinks/
│       │   │   └── EditLink/
│       │   ├── page.tsx
│       │   └── space.module.css
│       ├── account/              # User account settings
│       └── recycleBin/           # Recycle bin page
│
├── src/
│   ├── api/                      # API layer
│   │   ├── client.ts             # Axios instance
│   │   ├── types.ts              # TypeScript interfaces
│   │   └── modules/              # API functions
│   │       ├── user.ts
│   │       ├── group.ts
│   │       └── smallLinkPage.ts
│   ├── hooks/                    # Custom React hooks
│   │   └── useAuth.ts
│   ├── lib/                      # Utilities
│   │   ├── auth.ts
│   │   ├── utils.ts
│   │   └── middleware-utils.ts
│   └── store/                    # Zustand state
│       └── useStore.ts
│
├── docs/                         # Documentation
│   ├── COMPONENT_DEVELOPMENT.md
│   ├── COMPONENT_ORGANIZATION.md
│   ├── TESTING_STRATEGY.md
│   └── TESTING_SETUP.md
│
├── jest.config.js                # Jest configuration
├── jest.setup.js                 # Test setup
├── tsconfig.json                 # TypeScript config
└── package.json                  # Dependencies
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run E2E tests (when Playwright is set up)
npm run test:e2e
```

---

## 📊 Testing Metrics

### Current Coverage

- **Unit Tests**: 1 test file, 5 test cases (QRCode component)
- **Integration Tests**: 0 (planned)
- **E2E Tests**: 0 (planned)

### Target Coverage

- **Components**: 80%+ coverage
- **Utilities**: 90%+ coverage
- **API modules**: 70%+ coverage
- **Critical paths**: 100% coverage

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

### API Configuration

The API client is configured in `src/api/client.ts`:
- Base URL can be set via `NEXT_PUBLIC_API_BASE_URL`
- Default: `/api/short-link/admin/v1`
- Create link endpoint: `/api/shortlink/v1/links/create`

---

## 📝 Development Guidelines

### Component Development

1. **Page-specific components**: Place in `app/[page]/components/`
2. **Shared components**: Place in `src/components/common/`
3. **Always add `data-testid`**: For E2E automation
4. **Follow naming conventions**: Use PascalCase for components
5. **Include CSS Modules**: For scoped styling

See `docs/COMPONENT_DEVELOPMENT.md` for detailed guidelines.

### Testing Guidelines

1. **Unit tests**: Co-locate with components (`.test.tsx`)
2. **Integration tests**: Place in `__tests__/integration/`
3. **E2E tests**: Place in `__tests__/e2e/` or `e2e/`
4. **Use `data-testid`**: Never use CSS classes for selectors
5. **BDD-style descriptions**: Use Given-When-Then pattern

See `docs/TESTING_STRATEGY.md` for detailed testing guidelines.

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Environment Setup

Set the following environment variables in your deployment environment:

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
```

---

## 📚 Documentation

- **[Component Development Guide](docs/COMPONENT_DEVELOPMENT.md)** - How to create components
- **[Component Organization](docs/COMPONENT_ORGANIZATION.md)** - Project structure guidelines
- **[Testing Strategy](docs/TESTING_STRATEGY.md)** - Comprehensive testing approach
- **[Testing Setup](docs/TESTING_SETUP.md)** - Testing configuration details

---

## 🎯 Roadmap

### Completed ✅
- [x] All pages converted (Login, Space, Account, RecycleBin)
- [x] All components implemented (QRCode, ChartsInfo, CreateLink, CreateLinks, EditLink)
- [x] API layer complete
- [x] Authentication system
- [x] State management (Zustand)
- [x] Form validation (React Hook Form + Zod)
- [x] Test data IDs embedded in all components

### In Progress 🔄
- [ ] Backend integration testing
- [ ] Additional unit tests
- [ ] Integration tests
- [ ] E2E tests setup (Playwright)

### Planned 📋
- [ ] Playwright E2E test suite
- [ ] BDD framework integration (Cucumber.js)
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Error boundaries
- [ ] Loading states improvements

---

## 🤝 Contributing

This project follows best practices for:
- Component organization (co-location pattern)
- Testing (unit, integration, E2E)
- Type safety (TypeScript)
- Code quality (ESLint)

---

## 📄 License

Private project

---

## 🔗 Related Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Ant Design Documentation](https://ant.design/)
- [Jest Documentation](https://jestjs.io/)
- [Playwright Documentation](https://playwright.dev/)

---

**Status**: ✅ Production-ready (pending backend integration)
