# Vue Router vs Next.js App Router: A Comparision Guide 

## Overview 
This document compares Vue Router (used in the original Vue.js frontend) with Next.js App Router (used in the refactored React/Next.js frontend), using examples from our Shortlink project. 

--- 

## File Structure Comparison 
### Vue Router (Centrailized Configuration)

**File: `router/index.js`**
```javascript
import {createRouter, createWebHistory } from `vue-router`

const router = createRouter({
    history: createWebHistory(),
    routes: [
        path: '/',
        redirect: '/home'
    ], 
    {
        path: '/login', 
        component: () => import('@/views/login/LoginIndex.vue')
    }, 
    {
        path: '/home',
        component: () => import('@/views/home/HomeIndex.vue'), 
        children: [
            { path: 'space', component: () => import('@/views/mySpace/MySpaceIndex.vue')}, 
            { path: 'recycleBin', component: () => import('@/views/recycleBin/RecycleBinIndex.vue')}, 
            { path: 'account', component: () => import('@/views/mine/MineIndex.vue')}
        ]
    }
})
```

**File Structure:**
```
src/
├── router/
│   └── index.js          ← All routes defined here
├── views/
│   ├── login/
│   │   └── LoginIndex.vue
│   ├── home/
│   │   └── HomeIndex.vue
│   └── mySpace/
│       └── MySpaceIndex.vue
```

### Next.js App Router (File-System Based)
**No central router file!** Routes are defined by folder structure. 

**File Structure:**
```
app/
├── page.tsx              ← Route: /
├── (auth)/
│   └── login/
│       └── page.tsx      ← Route: /login
└── home/
    ├── page.tsx          ← Route: /home
    ├── layout.tsx        ← Layout for /home/* routes
    ├── space/
    │   └── page.tsx      ← Route: /home/space
    ├── recycleBin/
    │   └── page.tsx      ← Route: /home/recycleBin
    └── account/
        └── page.tsx      ← Route: /home/account
```

## Route Mapping 

| Vue Router | Next.js App Router | File Location |
|------------|-------------------|---------------|
| `path: '/'` | `app/page.tsx` | Root page |
| `path: '/login'` | `app/(auth)/login/page.tsx` | Login page |
| `path: '/home'` | `app/home/page.tsx` | Home redirect |
| `path: '/home', component: HomeIndex` | `app/home/layout.tsx` | Layout wrapper |
| `path: 'space'` (child) | `app/home/space/page.tsx` | Space page |
| `path: 'recycleBin'` (child) | `app/home/recycleBin/page.tsx` | Recycle bin |
| `path: 'account'` (child) | `app/home/account/page.tsx` | Account page |
---

## Key Difference 
### Configuration Approach 
**Vue Router:** Centralized configuration in one file 
```javascript 
// All routers in router/index.js 
const router = createRouter({
    routes: [...]
})
```

**Next.js**: Decentralized - routes come from file system 
```typescript
// Route defind by file location 
// app/login/page.tsx = /login route 
// app/home/space/page.tsx = /home/space route 
```

### Nexted Routes (Children)
**Vue Router**: Defined explicitly with `children` array 
```javascript 
{
    path: '/home',
    component: HomeIndex,
    children: [
        {
            path: 'space', 
            component: MySpace
        }, 
        {
            path: 'recycleBin',
            component: RecycleBin
        }
    ]
}
```

**Next.js** Create with folder structure + `layout.tsx`
```typescript
// app/home/layout.tsx wraps all /home/* routes 
app/
└── home/
    ├── layout.tsx      ← Wraps children
    ├── space/
    │   └── page.tsx    ← Child route
    └── recycleBin/
        └── page.tsx    ← Child route
```

### Route Guards (Middleware)
**Vue Router**: `router.beforeEach()` hook 
```javascript 
router.beforeEach(async (to, from, next) => {
    // Migration logic 
    setToken(localStorage.getItem('token'))
    setUsername(localStorage.getItem('username'))

    // Check authenication 
    const token = getToken()
    if (to.path === '/login') {
        next()
    } else if (isNotEmpty(token)) {
        next()
    } else {
        next('/login')
    }
})
```

**Next.js**: `middleware.ts` file (runs on server)
```typescript
// middleware.ts (root level)
export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl 

    // Allow /login
    if (pathname === '/login') {
        return NextResponse.next()
    }

    // Check token 
    if (hasValidToken(request)) {
        return NextResponse.next()
    }

    // Redirect to login 
    return NextResponse.redirect(new URL('/login', request.url))
}
```

**Key Difference**
- Vue: Run on **client-side** before navigation 
- Next.js: Runs on **server-side** before page loads
- Next.js can't access `localStorage` in middleware (server-side only)

---
## Key Takeways 
### Vue Router Advantages 
- Centralized configuration (easy to see all routes)
- Client-side middleware (can access localStorage)
- Explicit route structure 

### Next.js App Router Advantages: 
- File-system routing (no config needed)
- Better performance (Server Components)
- Automatic code splitting 
- Built-in SEO support (SSR/SSG)
- Route groups for organization 

## Performance Differences
### Vue Router 
- Client-side routing (SPA)
- All routes loaded upfront (code splitting with lazy loading)
- Navigation happens without page reload 

### Next.js App Router 
- **Server Components by default** (faster initial load)
- Automatic code splitting per route 
- **Client Components** only when needed (`'use client'`)
- Can pre-render pages at build time (SSG/SSR)


### When to use Which: 

**Use Vue Router when**
- Building a traditional SPA 
- Want centralized route configuraiton 
- Need complex client-side routing logic 

**Use Next.js App Router when:**
- Need SEO optimization
- Want better performance (server components)
- Building a full-stack application 
- Prefer file-system based routing 

--- 

## Migration Checklist 
When migrating from Vue Router to Next.js: 
- [ ] Map all routes to file structure 
- [ ] Convert `router.beforeEach` to `middleware.ts`
- [ ] Move localStorage access to client-side hooks 
- [ ] Convert parent / child routes to `layout.tsx` pattern 
- [ ] Update redirects to use `redirect()` function 
- [ ] Add `'use client'` directive when needed 
- [ ] Test all route guards and middleware 
- [ ] Verify nested route layouts work correctly 