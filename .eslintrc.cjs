module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  globals: {
    describe: true,
    expect: true,
    it: true,
  },
  rules: {
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],
    // 'comma-dangle': ['error', 'always-multiline'],
    // 'semi': ['error', 'always'],
    'no-undef': 'error',
  },
}
