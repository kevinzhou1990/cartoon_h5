// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    // allow async-await
    // 模版字串包含空格-关闭
    'template-curly-spacing': 'off',
    // 关闭强制缩进
    indent: 'off',
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 'off',
    'space-before-blocks': 'off',
    semi: 'off',
    // 'no-tabs': ['error', {  allowIndentationTabs: true }],
    'no-tabs': ['off', 0],
    'spaced-comment': 'off',
    'no-useless-escape': 'off',
    'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
    camelcase: 0
    // camelcase: { ignoreDestructuring: true }
  }
};
