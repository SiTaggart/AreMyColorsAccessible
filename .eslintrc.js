module.exports = {
  extends: ['@sitaggart/eslint-config-ts'],
  settings: {
    react: {
      version: '16.11.0',
    },
  },
  rules: {
    'react/jsx-props-no-spreading': 'off',
  },
};
