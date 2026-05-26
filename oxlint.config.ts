import nkzw from "@nkzw/oxlint-config";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [nkzw],
  ignorePatterns: [
    "dist/**",
    ".wrangler/**",
    "worker-configuration.d.ts",
    "bun.lock",
    "src/routeTree.gen.ts",
  ],
  overrides: [
    {
      files: ["scripts/**"],
      rules: {
        "no-console": "off",
      },
    },
  ],
  rules: {
    "jsx-a11y/control-has-associated-label": "off",
    "import-x/no-namespace": "off",
    "perfectionist/sort-interfaces": "off",
    "perfectionist/sort-jsx-props": "off",
    "perfectionist/sort-object-types": "off",
    "perfectionist/sort-objects": "off",
    "react/iframe-missing-sandbox": "off",
    "react/jsx-no-useless-fragment": "off",
    "unicorn/consistent-function-scoping": "off",
  },
});
