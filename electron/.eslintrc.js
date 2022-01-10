module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jsx-a11y', 'import', 'tsc'],
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
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
    '@typescript-eslint/no-non-null-assertion': 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'tsc/config': [
      2,
      {
        configFile: 'tsconfig.electron.json',
      },
    ],
    'import/no-extraneous-dependencies': ['error', {devDependencies: true}],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      'Hyperlink',
      {name: 'Link', linkAttribute: 'to'},
    ],
  },
}
