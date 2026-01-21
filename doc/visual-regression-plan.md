# Visual Regression Testing Plan for Next.js + React + TypeScript 

## Overview 
This document outlines a comprehensive plan for implementing visual regression testing in our Next.js 14+ (App Router) + React 18+ + TypeScript project using `jest-image-snapshot` and Playwright. 

--- 

## Goals 
- **Detect Visual Regression** Automatically catch unintended UI changes
- **Component Isolation** Test individual components in isolation 
- **Page-Level Testing** Test complete pages and user flows 
- **CI/CD Integration** Run visual tests in GitHub Actions 
- **Developer Experience** Fast feedback and easy snapshot updates 

## Architecture Overview 
### Technology Stack 

```
┌─────────────────────────────────────────┐
│   Visual Regression Testing Stack       │
├─────────────────────────────────────────┤
│  • jest-image-snapshot                  │
│    └─ Screenshot comparison engine      │
│  • Playwright                           │
│    └─ Browser automation & screenshots  │
│  • Jest                                 │
│    └─ Test runner & orchestration       │
│  • React Testing Library                │
│    └─ Component rendering (optional)    │
└─────────────────────────────────────────┘
```

### Two Approaches for Next.js 
#### Approach 1: Component-Level Visual Tests 
**Use Case**: Testing individual React components in isolation 

**How it Works**
- Render component using React Testing Library 
- Convert rendered HTML to image using Playwright 
- Compare image with baseline snapshot 

**Props**
- Fast (no full page load)
- Isolated (no dependencies)
- Easy to mock props/data
- Works with existing unit test setup 

**Cons**
- Requires HTML-to-image conversion 
- May miss CSS context (global styles)

**Best for**
- Individual components (`CreateLink`, `EditLink`, `QRCode`)
- Resuable UI components
- Component variants/states 

#### Approach 2 Page-Level Visual Tests (Recommended for Pages)
**Use Case**: Testing complete Next.js pages/routes 
**How it Works**
- Start Next.js dev server (or use production build)
- Navigate to page using Playwright 
- Capture full page screenshot 
- Compare with baseline snapshot 

**Props**
- Real browser environment 
- Full CSS context (global styles, Tailwind)
- Tests actual Next.js routing 
- Tests server/client component interaction 

**Cons**
- Slower (requires server)
- More setup complexity 
- Requires mock API/data 

**Best For**
- Complete pages (`/home/space`, `/login`)
- Layout components
- Full user flows 