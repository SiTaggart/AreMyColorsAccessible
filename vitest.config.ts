import { fileURLToPath } from 'node:url';

import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// Standalone config for unit tests: only the Emotion-aware React transform plus
// the `~` alias. The app's vite.config.ts (Cloudflare + TanStack Start plugins)
// is intentionally not reused here, since those target the Worker runtime.
export default defineConfig({
  plugins: [
    viteReact({
      jsxImportSource: '@emotion/react',
    }),
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.spec.{ts,tsx}'],
    setupFiles: ['./src/test/setup.ts'],
  },
});
