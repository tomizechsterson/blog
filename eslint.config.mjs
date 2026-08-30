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

const config = [
  {
    // Generated or vendored -- not ours to lint. `.yarn/releases` holds the multi-MB
    // Yarn bundle, `public/` the Godot HTML5 exports, `.contentlayer/` the output of
    // `contentlayer2 build`. Flat config does not read .gitignore, so these have to be
    // named even though git already ignores the last one. Between them they account
    // for every finding you get pointing ESLint at the repo root.
    ignores: ['.yarn/**', 'public/**', '.contentlayer/**'],
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
    // Must be scoped to match eslint-config-next's `next` block, which registers the
    // react and jsx-a11y plugins that the rules below name. Unscoped, this block also
    // applied to files that block skips -- `.cjs` in particular -- where ESLint treats
    // an unknown rule name in config as a fatal error rather than a lint finding.
    //
    // Adding `cjs` here brings that crash straight back, so the trade-off is that a
    // .cjs file gets neither the node globals nor the parser below, and would report
    // `'module' is not defined`. There are none in the project; if one is ever added,
    // give it its own block rather than widening this glob. Note that block cannot
    // simply reuse these languageOptions either -- `project: true` requires tsconfig
    // membership, and tsconfig's include covers js/mjs/ts/tsx but not cjs.
    files: ['**/*.{js,jsx,mjs,ts,tsx,mts,cts}'],

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
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        // Type-aware linting: every linted file must belong to a tsconfig project.
        // This is load-bearing -- it is why the `lint` script can cover data/ and the
        // root config files, since tsconfig includes **/*.{js,mjs,ts,tsx}. Point the
        // script at anything outside that `include` and you get a parser error rather
        // than a lint result. It is also most of ESLint's runtime here.
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

export default config
