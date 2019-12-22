module.exports = {
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  extends: [
    'react-app',
    'plugin:jest/recommended',
    'plugin:testing-library/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['testing-library', 'jest', 'prettier', 'react-hooks'],
}
