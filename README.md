# SPA Starter

Base template for Bebond SPAs with environment switching and mock API support.

## Quick Start

```bash
npm install
npm run dev
```

## Environment Configuration

Copy `.env.example` to `.env` and configure:

- `VITE_API_MODE`: `mock` | `local` | `staging` | `production`
- `VITE_ORG_KEY`: Your organization key

## Project Structure

```
src/
├── types/          # TypeScript interfaces
├── services/       # API client with env switching
│   ├── api.ts      # Main API client
│   └── mock-api.ts # Mock data for development
├── components/     # React components
└── mocks/          # Mock data files (optional)
```

## Building for Production

```bash
npm run build
```

Output is in `dist/` - ready for BB Live WordPress plugin.

## Customization

1. Update `src/types/index.ts` with your data types
2. Add mock data to `src/services/mock-api.ts`
3. Build components in `src/components/`
