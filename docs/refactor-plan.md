# Vue to React + Next.js Refactoring Plan 
## Project Status Analysis 
### Current Tech Stack 
- Framework: Vue 3.3.4 
- Build Tool: Vite 4.4.9 
- Routing: Vue Router 4.2.4 
- State Management: Vuex 4.0.2 
- UI Component Library: Element Plus 2.3.14 
- Charting Library: ECharts 4.8 
- HTTP Client: Axios 1.5.1 
- Other Dependencies: 
    - dayjs (date handling)
    - qrcode (QR code generation)
    - sortablejs (drag-and-drop sorting)
    - vanta (dynamic backgrounds)
    - js-cookie (cookie management)

---

## Project Feature Modules 
### User Authentication Module 
- User login / registration 
- Token management 
- Route guards 

### Short Link Management Module 
- Create short links (single / batch)
- Edit short links 
- Delete short links (move to recycle bin)
- Short link list display 
- Pagination 
- Sorting 

### Group Management Module 
- Create groups 
- Edit groups
- Delete groups 
- Group sorting (drag-and-drop)
- Group statistics 

### Recycle Bin Module 
- Recycle bin list 
- Restore short links 
- Permanent deletion 

### Data Analytics Module 
- Single-link analytics (charts)
- Group analytics (charts)
- Access log tables 
- Time range filtering 

### Other features 
- QR code generation 
- Link copying 
- Icon display 


## Project Structure 
```
src/
├── api/              # API layer
│   ├── axios.js      # Axios configuration
│   ├── index.js      # API exports
│   └── modules/      # API modules
│       ├── user.js
│       ├── group.js
│       └── smallLinkPage.js
├── components/       # Shared components
├── core/             # Core features (authentication)
├── router/           # Routing configuration
├── store/            # State management
├── utils/            # Utility functions
├── views/            # Page components
│   ├── login/        # Login page
│   ├── home/         # Main layout
│   ├── mySpace/      # Short link management
│   ├── recycleBin/   # Recycle bin
│   └── mine/         # User center
└── assets/           # Static assets
```

## Target Refactoring Tech Stack 
### Target Stack 
- Framework; React 18+
- Framework: Next.js 14+ (App Router)
- State Management: Zustand and React Context + userReducer 
- UI Library: Ant Design 5.x or shadcn/ui
- Charting: Recharts or ECharts (React version)
- HTTP Client: Axios or native fetch 
- Styling: Tailwind CSS + CSS Modules 
- Type System: TypeScript 
- Forms: React Hook Form 
- Date Handling: dayjs 
- Other: 
> qrcode.react (QR codes)
> @dnd-kit/core (drag-and-drop sorting)
> js-cookie (cookie management)

## Refactor Steps 
### Phase 1: Project Initialization and Environment Setup 
#### Create a Next.js Project 
- Use `create-next-app` (TypeScript + Tailwind CSS)
- Configure base project structure 
- Set up aliases (`@/`)
- Configure environment variables 

#### Install Core Dependencies 
```bash 
# Core dependencies
npm install react react-dom next
npm install -D typescript @types/react @types/node

# UI library
npm install antd  # or shadcn/ui

# State management
npm install zustand  # or React Context

# HTTP client
npm install axios

# Utilities
npm install dayjs js-cookie qrcode.react
npm install -D @types/js-cookie

# Styling
npm install -D tailwindcss postcss autoprefixer

# Forms
npm install react-hook-form @hookform/resolvers zod

# Drag and drop
npm install @dnd-kit/core @dnd-kit/sortable

# Charts
npm install recharts  # or echarts-for-react
```

#### Project Structure Planning 
```text
app/                    # Next.js App Router
├── (auth)/             # Auth-related route group
│   └── login/
│       └── page.tsx
├── (dashboard)/        # Dashboard route group
│   ├── layout.tsx      # Main layout
│   ├── space/
│   │   └── page.tsx
│   ├── recycle-bin/
│   │   └── page.tsx
│   └── account/
│       └── page.tsx
├── layout.tsx          # Root layout
└── page.tsx            # Home (redirect)

src/
├── api/                # API layer
│   ├── client.ts       # Axios instance
│   ├── modules/        # API modules
│   └── types.ts        # API type definitions
├── components/         # Components
│   ├── common/         # Shared components
│   ├── charts/         # Chart components
│   └── forms/          # Form components
├── hooks/              # Custom hooks
├── lib/                # Utility libraries
│   ├── auth.ts         # Auth utilities
│   └── utils.ts        # Common utilities
├── store/              # State management
│   └── useStore.ts     # Zustand store
├── types/              # TypeScript types
└── styles/             # Global styles
```

### Phase 2: Core Feature Migration 
#### API Layer Refactoring 
- Create Axios instance (`src/api/client.ts`)
> Request interceptors (token injection)
> Response interceptors (error handling, 401 redirects)
> Base URL configuration 
- Migrate API modules 
> `user.ts` - user related APIs
> `group.ts` - group-related APIs
> `smallLinkPage.ts` - short link APIs

- Add TypeScript type definitions 
- Create unified API exports 

#### Authentication System Refactoring 
- Create auth utilities (`src/lib/auth.ts`)
> getToken / setToken / removeToken 
> getUsername / setUsername / removeUsername 
- Implement authentication middleware (Next.js Middleware)
> Route protection 
> Token validation 
- Create authentication Context / Hook 
> useAuth hook 
> Login state management 

#### State Management Refactoring 
- Create global state using Zustand 
> User info 
> Group list 
> UI state (sidebar, modals, etc.)
- Or use React Context + userReducer 
> Context Provider 
> Reducer definitions 

### Phase 3: Page and Component Migration 
#### Layout Components 
- Create main layout (`app/(dashboard)/layout.tsx`)
> Header (navigation bar)
> Sidebar (group list)
> Content area
- Implement responsive layout 
- Migrate styles (SCSS -> Tailwind CSS)

#### Login Page 
- Create Login page (`app/(auth)/login/page.tsx`)
> Login from (React Hook Form)
> Registration form 
> Form validation (Zod)
> Dynamic background (optional, replace vanta with CSS animation)
- Implement login logic 
- Implement registration logic 
- Handle "remember me" functionality 

#### Short Link Management Page 
- Create short link page (`app/(dashboard)/space/page.tsx`)
> Table (Ant Design Table)
> Pagination 
> Sorting 
> Filtering 

- Create short link components 
> CreateLink - single creation 
> CreateLink - batch creation 
> EditLink - edit link 
> QRCode - QR code component 

- Implement CRUD operations 
> Create 
> Edit 
> Delete 
> Copy links 

#### Group Management 
- Create group sidebar component 
> Group list 
> Group actions (add, edit, delete)
> Drag-and-drop sorting (@dnd-kit)
- Implementing group CRUD 
- Implement group sorting 
#### Recycle Bin Page 
- Create recycle bin page (`app/(dashboard)/recycle-bin/page.tsx`)
> Recycle bin list 
> Restore functionality 
> Permannent delete functionality 

#### Data Analytics Components 
- Create chart components 
> Bar Chart 
> ProgressLine (line chart)
> ProgressPie (pie chart)
> KeyValue (KPIs)

- Create analytics modal (ChartsInfo)
> Time range picker 
> Chart display 
> Access log table 
- Integrate chart library (Recharts or ECharts)

#### User Account Page 
- Create account page (`app/(dashboard)/account/page.tsx`)
> Display user information 
> Edit user information 

## Phase 4: Component and Utility Migration 
### Shared Components 
- CTable (table wraper, if needed)
- EmptyList 
- LabelSelect
- Loading components
- Error boundary 

### Utility Functions 
- Date formating 
- Text truncation 
- URL utilities 
- Validation helpers 

### Custom Hooks 
- usePagination 
- useTable
- useModal 
- useCopy 


## Phase 5: Styling and UI Optimization 
### Sytling Migration 
- Convert SCSS/Less to Tailwind CSS 
- Create theme configuration 
- Implement dark mode (optional)
- Responsive design optimization 

### UI Component Replacement 
- Element Plus -> Ant Design 
> Table -> Table 
> Form -> Form 
> Dialog -> Modal 
> Message -> message 
> Other component mappings 

- Maintain consistent UI styel 

### Animations 
- Page transition animations 
- Component animations 
- Loading animations 

## Phase 6: Routing and Navigation 
### Next.js App Router Configuration 
- Configure routes 
> `/login` - login page 
> `/space` - short link management 
> `/recycle-bin` - recycle bin 
> `/account` - user account 

- implement route guards (Middleware)
- Handle 404 pages 

### Navigation Features 
- Programmatic navigation 
- Breadcrumbs (if needed)
- Back button handling 

## Phase 7: Performance Optimization 
### Code Optimization 
- Lazy loading (React.lazy)
- Image optimization (Next.js Image)
- Code splitting 
- Tree shaking 

### Data Optimization 
- Data caching (React Query / SWR)
- Request deduplication 
- Pagination optimization 
- Virtual scrolling (large lists)

### Build Optimization 
- Bundle size optimization 
- Production build tuning 
- CDN configuration (if required)

## Phase 8: Testing and Debugging 
### Functional Testing 
- Login / regisgration flow 
- Short link CRUD 
- Group management 
- Recycle bin 
- Analytics 

### Compatibility Testing 
- Browser compatibility 
- Responsive testing 
- Performance testing 

### Error Handling 
- Error boundaries 
- Improved error message 
- Logging 

## Phase 9: Documentation and Deployment 
### Documentation 
- Update README.md
- API Documentation 
- Component documentation 
- Deployment documentation 

### Deployment Preparation 
- Production environment variables 
- Build script optimization 
- Docker configuration 
- CI/CD configuration 


### Technology Mapping 
- Vue Router -> Next.js App Router 
- Vuex -> Zustand / React Context 
- Element Plus -> Ant Design / shadcn/ui 
- Vue SFC (.vue) -> React Component (.tsx)
- v-model -> useState + onChange 
- computed -> useMemo 
- watch -> useEffect 
- props -> props (same)
- emit -> callback props 
- provide /inject -> Context API 
- Vue lifecycle -> React Hooks 
- Vite -> Next.js (built in)

## Priority 
### High (Core Features)
- Project initialization 
- API layer refactoring 
- Authentication 
- Login page 
- Main layout 
- Short link list page 

### Medium 
- Short link CRUD 
- Group management 
- Recycle bin 
- Analytics 

### Low Priority 
- Styling optimization 
- Performance tuning 
- Animationis 
- Documentation 