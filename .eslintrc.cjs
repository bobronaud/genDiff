module.exports = {
  env: {
    jest: true,
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'no-console': 0,
    'no-underscore-dangle': [2, { allow: ['__filename', '__dirname'] }],
    'no-param-reassign': 0,
  },
};
