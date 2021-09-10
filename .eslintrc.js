// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  extends: ['@sitaggart/eslint-config-ts', 'plugin:@next/next/recommended'],
  plugins: ['@emotion/eslint-plugin'],
  settings: {
    react: {
      version: '16.11.0',
    },
  },
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    '@emotion/pkg-renaming': 'error',
    'unicorn/prefer-module': 'off',
  },
};
