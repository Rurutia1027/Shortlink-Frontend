# Shortlink Console (React + Next.js)

React + Next.js (App Router) refactor of the Shortlink Console UI.

## Tech stack

- Next.js (App Router)
- React
- TypeScript
- Axios
- Ant Design
- ECharts

## Project structure

```
console-react/
  src/
    app/                 # Routes (login/home/space/account/recycle-bin)
    components/          # Reusable UI
    features/            # Feature modules
    lib/                 # Shared helpers (api/auth/utils)
    store/               # Global state
    styles/              # Global styles
    types/               # Shared types
```

## Scripts

```bash
cd console-react
npm run dev
npm run build
npm run lint
```

## Environment

Create `console-react/.env.local` and set the API base URL:

```
NEXT_PUBLIC_API_BASE_URL=/api/shortlink/admin/v1
```

## Development

```bash
cd console-react
npm install
npm run dev
```

Open `http://localhost:3000`.
