import { defineConfig } from 'vite';
import { cloudflare } from '@cloudflare/vite-plugin';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    cors: {
      allowedHeaders: ['Content-Type'],
      methods: ['GET', 'POST', 'OPTIONS'],
      origin: '*',
    },
    port: 3000,
  },
  preview: {
    cors: {
      allowedHeaders: ['Content-Type'],
      methods: ['GET', 'POST', 'OPTIONS'],
      origin: '*',
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tanstackStart(),
    viteReact({
      jsxImportSource: '@emotion/react',
    }),
  ],
});
