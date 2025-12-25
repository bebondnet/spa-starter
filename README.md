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

## BB Live Configuration

The `bb-live.json` file configures how BB Live WordPress plugin serves your SPA.

### Basic Configuration

```json
{
  "base": "/",
  "spa": true
}
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `base` | string | `"/"` | URL base path where SPA is served |
| `spa` | boolean | `true` | Enable SPA mode (serves index.html for all routes) |
| `excludePaths` | string[] | `[]` | Paths to exclude from SPA serving |
| `cacheControl` | string | `"public, max-age=31536000"` | Cache headers for assets |

### Example: Serve at Sub-Path

To serve your SPA at `/app` instead of root:

1. Update `bb-live.json`:
```json
{
  "base": "/app/",
  "spa": true
}
```

2. Update `vite.config.ts`:
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/app/',
})
```

3. Rebuild: `npm run build`

### Example: Multiple SPAs

You can run multiple SPAs on the same WordPress site by deploying each to a different base path:

- Main site SPA: `base: "/"`
- Search feature: `base: "/search/"`
- Dashboard: `base: "/dashboard/"`

Each SPA needs its own repository and BB Live deployment configuration.

### Example: Exclude Paths

Keep certain paths for WordPress to handle:

```json
{
  "base": "/",
  "spa": true,
  "excludePaths": ["/blog", "/contact"]
}
```

## Project Structure

```
├── bb-live.json    # BB Live serving configuration
├── vite.config.ts  # Vite build config (base path must match bb-live.json)
├── dist/           # Build output - deployed by BB Live
├── src/
│   ├── types/          # TypeScript interfaces
│   ├── services/       # API client with env switching
│   │   ├── api.ts      # Main API client
│   │   └── mock-api.ts # Mock data for development
│   ├── components/     # React components
│   └── mocks/          # Mock data files (optional)
```

## Building for Production

```bash
npm run build
```

Output is in `dist/` - ready for BB Live WordPress plugin deployment.

## Deployment

1. Push your SPA to a GitHub repository
2. In WordPress admin, go to BB Live settings
3. Enter your repository URL
4. Click "Deploy Now"

BB Live will clone your repo, read `bb-live.json`, and serve the SPA accordingly.

## Customization

1. Update `src/types/index.ts` with your data types
2. Add mock data to `src/services/mock-api.ts`
3. Build components in `src/components/`
4. Configure `bb-live.json` for your URL structure
