import { defineConfig } from "vitest/config";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    viteReact({
      jsxImportSource: "@emotion/react",
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    exclude: ["node_modules/**", "e2e/**", "dist/**", ".wrangler/**"],
    globals: true,
    include: ["**/*.spec.{ts,tsx}", "**/*.test.{ts,tsx}"],
    setupFiles: ["./test/setup.ts"],
  },
});
