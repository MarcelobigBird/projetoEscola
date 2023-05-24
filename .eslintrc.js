module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-multiple-empty-lines': 'off',
    'class-methods-use-this': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/first': 'off',
    'no-param-reassign': 'off',
    'max-len': 'off',
    'consistent-return': 'off',
    'no-empty-function': 'off',
    camelcase: 'off',
  },
};
