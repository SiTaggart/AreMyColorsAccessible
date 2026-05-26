import { defineConfig } from "vitest/config";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    viteReact({
      jsxImportSource: "@emotion/react",
    }),
  ],
  test: {
    environment: "jsdom",
    exclude: ["node_modules/**", "src/e2e/**", "dist/**", ".wrangler/**"],
    globals: true,
    include: ["**/*.spec.{ts,tsx}", "**/*.test.{ts,tsx}"],
    setupFiles: ["./src/test/setup.ts"],
  },
});
