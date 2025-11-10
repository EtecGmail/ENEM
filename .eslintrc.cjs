module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  plugins: ['import'],
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'script'
  },
  rules: {
    'no-console': 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'prefer-const': 'error',
    'import/no-unresolved': 'off'
  }
};
