// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  extends: ['@sitaggart/eslint-config-ts', 'plugin:@next/next/recommended'],
  plugins: ['@emotion/eslint-plugin'],
  settings: {
    react: {
      version: '17.0.2',
    },
  },
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
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
