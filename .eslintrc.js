module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: [
      'react',
      'react-native',
      '@typescript-eslint',
      'prettier',
      'nativewind',
    ],
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-native/all',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    env: {
      browser: true,
      node: true,
      'react-native/react-native': true,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // قوانین سفارشی خود را اینجا اضافه کنید
      'prettier/prettier': ['error'],
      'react-native/no-inline-styles': 'off',
      'nativewind/no-unused-class': 'error',
      // سایر قوانین مورد نیاز
    },
  };
  