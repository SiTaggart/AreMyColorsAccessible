// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  extends: ['@sitaggart/eslint-config-ts', 'plugin:@next/next/recommended'],
  plugins: ['@emotion/eslint-plugin'],
  settings: {
    react: {
      version: '18.2.0',
    },
  },
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@emotion/pkg-renaming': 'error',
    'unicorn/prefer-module': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
  },
};
