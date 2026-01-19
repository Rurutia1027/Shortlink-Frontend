# Frontend Testing Strategy 
## Testing Pyramid 

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

## Three Levels of Testing 
### 1. **Unit Tests** (Jest + React Testing Library) 
**What**: Test individual components and functions in isolation 

**Examples**: 
- Component rendering 
- Props handling 
- User interactions (clicks, inputs)
- State changes 
- Utility functions 

**Current Status**:
- Jest configured 
- React Testing Library installed 
- Need to add tests for other components 

**What to Test:**
- Components (QRCode, CreateLink, EditLink, ChartsInfo, etc.)
- Utility functions (utils.ts, auth.ts)
- Custom hooks (ustAuth, useStore)
- API functions 

### Integration Tests (Jest + React Testing Library)
**What** Test multiple components working together 
**Examples**:
- Form submission flow 
- Modal interactions 
- Table with pagination 
- Parent-child component communication 

**Current Status**
- Can use Jest for integration tests
- No integration tests created yet 

**What to Test**
- Form workflows (CreateLink -> Table updates)
- Modal workflows (Edit -> Save -> Refresh)
- Navigation flows 
- State management (Zustand store updates)

### E2E Tests (Playwright) Not SET UP YET 
**What**: Test complete user flows in a real browser 

**Examples:**
- Login -> Create link -> View charts -> Delete 
- Full user journey 
- Cross-browser testing 

**Current Status**
- Selector strategy defined (`data-testid` attributes)
- Playwright not installed 
- No E2E tests created 

**What to Test**
- Critical user flows 
- Login/Registration 
- Create/Edit/Delete links 
- Group management 
- Analytics viewing 

