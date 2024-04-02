module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'es6': true,
  },
  'extends': [
    'standard-with-typescript',
    'plugin:react/recommended',
    'eslint:recommended', 'prettier',
  ],
  'plugins': [
    'react',
    'react-hooks',
  ],
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
  'rules': {
    'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
    'react-hooks/exhaustive-deps': 'warn', // 检查 effect 的依赖
    'react/display-name': 'off', // 检查 React 组件显示名
    '@typescript-eslint/no-unused-vars': 'warn',
  },
}
