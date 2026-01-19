# Testing Selectors Guide

## Overview

This project uses standardized `data-testid` attributes for automation testing (Playwright, Cypress, etc.). This ensures reliable, maintainable test selectors.

## Convention

### Format
```
data-testid="[component-type]-[component-name]-[action/element]"
```

### Examples
- `data-testid="button-login-submit"`
- `data-testid="input-username-field"`
- `data-testid="table-shortlinks-list"`
- `data-testid="modal-create-group"`
- `data-testid="link-dashboard-nav"`

## Component Types

| Type | Prefix | Example |
|------|--------|---------|
| Button | `button` | `data-testid="button-login-submit"` |
| Input | `input` | `data-testid="input-username-field"` |
| Form | `form` | `data-testid="form-login"` |
| Table | `table` | `data-testid="table-shortlinks-list"` |
| Modal | `modal` | `data-testid="modal-create-group"` |
| Link | `link` | `data-testid="link-dashboard-nav"` |
| Card | `card` | `data-testid="card-group-item"` |
| Dropdown | `dropdown` | `data-testid="dropdown-group-select"` |
| Menu | `menu` | `data-testid="menu-sidebar"` |
| Page | `page` | `data-testid="page-login"` |

## Naming Rules

1. **Use kebab-case** (lowercase with hyphens)
2. **Be descriptive** but concise
3. **Include context** when needed
4. **Avoid implementation details** (don't use class names, IDs)

### Good Examples ✅
```tsx
data-testid="button-login-submit"
data-testid="input-username-field"
data-testid="table-shortlinks-list"
data-testid="modal-create-group-confirm"
```

### Bad Examples ❌
```tsx
data-testid="btn1"  // Too generic
data-testid="submit-button-primary-blue"  // Implementation details
data-testid="username"  // Missing type prefix
```

## Usage in Components

### React Components
```tsx
function LoginButton() {
  return (
    <button data-testid="button-login-submit">
      Login
    </button>
  )
}
```

### Ant Design Components
```tsx
import { Button, Input, Table } from 'antd'

function LoginForm() {
  return (
    <form data-testid="form-login">
      <Input 
        data-testid="input-username-field"
        placeholder="Username"
      />
      <Button 
        data-testid="button-login-submit"
        type="primary"
      >
        Submit
      </Button>
    </form>
  )
}
```

### Next.js Link Components
```tsx
import Link from 'next/link'

function Navigation() {
  return (
    <Link 
      href="/dashboard"
      data-testid="link-dashboard-nav"
    >
      Dashboard
    </Link>
  )
}
```

## Playwright Usage

```typescript
// In your Playwright tests
test('should login successfully', async ({ page }) => {
  await page.goto('/login')
  
  // Use data-testid selectors
  await page.fill('[data-testid="input-username-field"]', 'user123')
  await page.fill('[data-testid="input-password-field"]', 'password')
  await page.click('[data-testid="button-login-submit"]')
  
  // Wait for navigation
  await page.waitForSelector('[data-testid="page-dashboard"]')
})
```

## Helper Utility

Use the `getTestId()` helper function for consistency:

```tsx
import { getTestId } from '@/src/lib/test-utils'

<button {...getTestId('button', 'login', 'submit')}>
  Login
</button>
// Results in: data-testid="button-login-submit"
```

## Best Practices

1. **Add test IDs during development** - Don't add them later
2. **Be consistent** - Follow the naming convention
3. **Test what users see** - Use semantic, user-facing names
4. **Avoid over-using** - Not every element needs a test ID
5. **Document complex selectors** - Add comments if needed

## Common Patterns

### Forms
```tsx
<form data-testid="form-login">
  <Input data-testid="input-username-field" />
  <Input data-testid="input-password-field" />
  <Button data-testid="button-login-submit">Submit</Button>
</form>
```

### Tables
```tsx
<Table 
  data-testid="table-shortlinks-list"
  columns={columns}
  dataSource={data}
/>
```

### Modals
```tsx
<Modal 
  data-testid="modal-create-group"
  open={isOpen}
>
  <Form data-testid="form-create-group">
    {/* form content */}
  </Form>
  <Button data-testid="button-create-group-submit">Create</Button>
</Modal>
```

### Navigation
```tsx
<nav data-testid="menu-sidebar">
  <Link data-testid="link-dashboard-nav" href="/dashboard">Dashboard</Link>
  <Link data-testid="link-groups-nav" href="/groups">Groups</Link>
</nav>
```

## Checklist

When creating a new component:
- [ ] Add `data-testid` to main component
- [ ] Add `data-testid` to interactive elements (buttons, inputs)
- [ ] Add `data-testid` to important containers (tables, modals)
- [ ] Use consistent naming convention
- [ ] Document if selector is complex
