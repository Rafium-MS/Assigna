export default [
  {
    files: ["**/*.{js,cjs,mjs}", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {}
  }
];
