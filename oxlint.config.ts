import nkzw from '@nkzw/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [nkzw],
  ignorePatterns: [
    '.wrangler/',
    'coverage/',
    'dist/',
    'node_modules/',
    'playwright-report/',
    'src/routeTree.gen.ts',
    'worker-configuration.d.ts',
  ],
  options: {
    typeAware: true,
  },
  overrides: [
    {
      files: ['src/**/*.spec.{ts,tsx}'],
      globals: {
        afterEach: 'readonly',
        beforeAll: 'readonly',
        beforeEach: 'readonly',
        describe: 'readonly',
        expect: 'readonly',
        it: 'readonly',
        vi: 'readonly',
      },
      rules: {
        // Tests spy on module namespaces and define small inline wrappers.
        'import/no-namespace': 'off',
        'unicorn/consistent-function-scoping': 'off',
      },
    },
    {
      // The data providers deliberately sync URL state via a debounced effect;
      // the isInitial guard + setState-on-first-run pattern is intentional and
      // covered by the Playwright e2e suite.
      files: ['src/context/**/index.tsx'],
      rules: {
        'react-hooks-js/set-state-in-effect': 'off',
        'react-hooks/exhaustive-deps': 'off',
      },
    },
    {
      // The logger is the app's logging layer.
      files: ['src/utils/logger.ts'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      // HTML <meta charSet> must keep the canonical "utf-8" spelling.
      files: ['src/routes/__root.tsx'],
      rules: {
        'unicorn/text-encoding-identifier-case': 'off',
      },
    },
    {
      files: ['scripts/**/*.ts'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
});
