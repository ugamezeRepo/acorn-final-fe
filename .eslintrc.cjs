module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'import'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "quotes": ['error', 'double', { 'allowTemplateLiterals': true }],
    "semi": ['error', 'always'],
    "no-unused-vars": ["error", {
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_",
      "caughtErrorsIgnorePattern": "^_",
    }],
    "indent": ['error', 4],
    "no-restricted-imports": [
      "error",
      {
        "patterns": [".*"],
      }
    ],
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal", ["parent", "sibling"], "index", "object", "type", "unknown"],
        "pathGroups": [
          {
            "pattern": "next",
            "group": "builtin",
            "position": "before"
          },
          {
            "pattern": "@/core/**",
            "group": "unknown"
          },
          {
            "pattern": "**/*.css.ts",
            "group": "unknown",
            "position": "after"
          },
        ],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ],
  },
}
