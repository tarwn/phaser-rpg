module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: ['./tsconfig.json'],
      ecmaVersion: 2018,
      sourceType: 'module'
    },
    plugins: [
      '@typescript-eslint',
    ],
    extends: [
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended'
    ],
    env: {
      node: true,
      browser: true
    },
    settings: { },
    rules: {
      "semi": "error"
    }
  };
