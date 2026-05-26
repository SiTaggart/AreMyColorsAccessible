import { cloudflare } from '@cloudflare/vite-plugin';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tanstackStart(),
    viteReact({
      jsxImportSource: '@emotion/react',
    }),
  ],
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
  server: {
    cors: {
      allowedHeaders: ['Content-Type'],
      methods: ['GET', 'POST', 'OPTIONS'],
      origin: '*',
    },
    port: 3000,
  },
});
