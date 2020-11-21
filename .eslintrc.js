module.exports = {
  extends: ['@sitaggart/eslint-config-ts'],
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
  },
};
