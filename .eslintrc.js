module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
  ],
  'rules': {
    'max-len': 'off',
    'require-jsdoc': 'off',
    'no-unused-vars': 'warn',
    'plugin:react/jsx-runtime': 'off',
    'react/react-in-jsx-scope': 'off',
    'new-cap': 'off',
    'prefer-promise-reject-errors': 'off',
    'react/prop-types': 'off',
  },
};
