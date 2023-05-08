const COMMON_PLUGINS = ['@typescript-eslint', 'prettier', 'import']
const COMMON_EXTENDS = [
  'eslint:recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:@typescript-eslint/eslint-recommended',
  'plugin:prettier/recommended',
  'plugin:import/errors',
  'plugin:import/warnings',
]
const COMMON_RULES = {
  '@typescript-eslint/ban-ts-comment': ['error', {'ts-ignore': 'allow-with-description'}],
  '@typescript-eslint/camelcase': 'off',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-empty-function': ['error', {allow: ['arrowFunctions']}],
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-non-null-assertion': 'off',
  '@typescript-eslint/no-unused-vars': 'error',
  '@typescript-eslint/no-use-before-define': 'off',
  '@typescript-eslint/no-var-requires': 'off',
  '@typescript-eslint/no-this-alias': 'off',
  '@typescript-eslint/triple-slash-reference': 'off',
  '@typescript-eslint/no-empty-interface': 'off',
  'import/no-extraneous-dependencies': ['error', {devDependencies: true}],
  'import/prefer-default-export': 'off',
  'import/no-unresolved': [2, {ignore: ['.png*']}],
  'import/extensions': [
    'error',
    'ignorePackages',
    {
      js: 'never',
      ts: 'never',
    },
  ],
  'no-console': 'warn',
  'prefer-const': 'off',
  'no-shadow': 'off',
  '@typescript-eslint/no-shadow': ['error'],
  'no-use-before-define': 'off',
  'object-curly-spacing': 'off',
  quotes: ['error', 'single', {avoidEscape: true}],
  semi: ['error', 'never'],
  'no-unused-vars': 'off',
  'no-empty-function': 'off',
}
const COMMON_SETTINGS = {
  'import/resolver': {
    node: {
      extensions: ['.js', '.ts'],
    },
  },
}

module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    ecmaVersion: 2021,
  },
  plugins: COMMON_PLUGINS,
  extends: [...COMMON_EXTENDS, 'airbnb-base'],
  rules: COMMON_RULES,
  settings: COMMON_SETTINGS,
  overrides: [
    {
      files: ['src/renderer/src/**/*.ts', 'src/renderer/src/**/*.tsx'],
      plugins: [
        ...COMMON_PLUGINS,
        // custom
        'react',
        'jsx-a11y',
        'react-hooks',
        'styled-components-a11y',
      ],
      extends: [
        ...COMMON_EXTENDS,
        // custom
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:styled-components-a11y/recommended',
        'airbnb',
        'airbnb/hooks',
        'plugin:jsx-a11y/recommended',
      ],
      rules: {
        ...COMMON_RULES,
        // custom
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
          },
        ],
        'react/jsx-filename-extension': [1, {extensions: ['.ts', '.tsx']}],
        'react/prop-types': 'off', // In favor of strong typing - no need to dedupe
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/prefer-stateless-function': [
          2,
          {
            ignorePureComponents: true,
          },
        ],
        'react/forbid-prop-types': [
          0,
          {
            forbid: [],
          },
        ],
        'react/function-component-definition': [
          2,
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
          },
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/jsx-closing-bracket-location': 'off',
      },
      settings: {
        ...COMMON_SETTINGS,
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
        },
      },
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
}
