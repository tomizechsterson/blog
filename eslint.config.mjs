import typescriptEslint from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
// eslint-config-next v16 ships a flat config array, so it is spread directly
// rather than pulled in through FlatCompat. `core-web-vitals` re-exports the
// base `next` config, so importing it alone covers both.
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import jsxA11y from 'eslint-plugin-jsx-a11y'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default [
  {
    ignores: [],
  },
  js.configs.recommended,
  ...compat.extends(
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ),
  // `next/typescript` registers its own @typescript-eslint plugin instance and
  // parser for ts/tsx, which collides with the globally-registered one below
  // ("Cannot redefine plugin"). This config already covers both, so drop it.
  ...nextCoreWebVitals.filter((config) => config.name !== 'next/typescript'),
  {
    // eslint-config-next already registers the jsx-a11y plugin, and re-registering
    // it (as `compat.extends('plugin:jsx-a11y/recommended')` would) trips ESLint's
    // "Cannot redefine plugin" check. Apply the recommended rules only.
    name: 'jsx-a11y/recommended-rules',
    // Must match the `files` of eslint-config-next's `next` block, which is what
    // registers the plugin. Without this, the rules also apply to files that
    // block skips (notably `.cjs`) and ESLint fails with "Could not find plugin".
    files: ['**/*.{js,jsx,mjs,ts,tsx,mts,cts}'],
    rules: jsxA11y.flatConfigs.recommended.rules,
  },
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.amd,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'commonjs',

      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },

    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',

      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
]
