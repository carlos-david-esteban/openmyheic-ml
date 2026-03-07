# Shadcn-UI Template Usage Instructions

## technology stack

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

All shadcn/ui components have been downloaded under `@/components/ui`.

## File Structure

- `index.html` - HTML entry point
- `vite.config.ts` - Vite configuration file
- `tailwind.config.js` - Tailwind CSS configuration file
- `package.json` - NPM dependencies and scripts
- `src/app.tsx` - Root component of the project
- `src/main.tsx` - Project entry point
- `src/index.css` - Existing CSS configuration

## Components

- All shadcn/ui components are pre-downloaded and available at `@/components/ui`

## Styling

- Add global styles to `src/index.css` or create new CSS files as needed
- Use Tailwind classes for styling components

## Development

- Import components from `@/components/ui` in your React components
- Customize the UI by modifying the Tailwind configuration

## Note

The `@/` path alias points to the `src/` directory

## Environment Variables

This project uses Vite environment variables to manage third-party service IDs. This ensures sensitive IDs are never hardcoded in source files and can be configured per environment.

### Setup

1. Copy the example file to create your local `.env`:
   ```shell
   cp .env.example .env
   ```
2. Fill in the values in `.env` with your real service IDs.

> **Note:** The `.env` file is listed in `.gitignore` and will never be committed to the repository.

### Variables

| Variable | Format | Description | Where to obtain |
|---|---|---|---|
| `VITE_ADSENSE_ID` | `ca-pub-XXXXXXXXXXXXXXXX` | Google AdSense publisher ID. Used in `index.html` to load the AdSense script. If empty, the AdSense script tag will have an empty `client` parameter (no ads will load). | [Google AdSense](https://www.google.com/adsense/) → Account → Publisher ID |
| `VITE_GA4_ID` | `G-XXXXXXXXXX` | Google Analytics 4 Measurement ID. Used in `SharedHead.tsx` to inject the GA4 tracking script. If empty or undefined, the GA4 scripts are **not injected at all**. | [Google Analytics](https://analytics.google.com/) → Admin → Data Streams → Measurement ID |
| `VITE_BING_VERIFICATION` | alphanumeric string | Bing Webmaster Tools verification code. Used in `index.html` as a `<meta>` tag for site ownership verification. | [Bing Webmaster Tools](https://www.bing.com/webmasters/) → Add site → HTML Meta Tag verification |

### Cloudflare Pages Configuration

When deploying to Cloudflare Pages, add these environment variables in:

**Cloudflare Dashboard → Pages → Your Project → Settings → Environment Variables**

Add the following variables for your **Production** environment:

- `VITE_ADSENSE_ID` = your AdSense publisher ID
- `VITE_GA4_ID` = your GA4 measurement ID
- `VITE_BING_VERIFICATION` = your Bing verification code

### How it works

- **`index.html`**: Uses Vite's built-in `%VITE_*%` syntax for HTML env variable interpolation. During build, Vite replaces `%VITE_ADSENSE_ID%` and `%VITE_BING_VERIFICATION%` with their actual values.
- **`SharedHead.tsx`**: Uses `import.meta.env.VITE_GA4_ID` at runtime. A conditional check ensures GA4 scripts are only injected when the variable has a value.

# Commands

**Install Dependencies**

```shell
pnpm i
```

**Start Preview**

```shell
pnpm run dev
```

**To build**

```shell
pnpm run build
```