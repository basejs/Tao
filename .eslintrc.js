// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  'globals': {
    'axios': true,
    '@': true,
    'UM': true,
    '_': true
  },
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': [2, {
      'before': false,
      'after': true
    }],
    // 函数前空格
    'space-before-function-paren': ['error', 'never'],
    // 对象结尾项逗号
    'comma-dangle': 0,
    // 语句结尾分号
    'semi': ['error', 'never'],
    // if语句中只有一行时不必{}
    // 'curly': [2, 'multi-or-nest'],
    // if左右空格设置
    'keyword-spacing': [2, {
      'overrides': {
        'if': {
          'after': false
        },
        'for': {
          'after': false
        },
        'while': {
          'after': false
        }
      }
    }],
    // if(true)
    'no-constant-condition': 0,
    // 下划线变量
    'no-underscore-dangle': [0, { "allow": ["__place"] }],
    'no-new': 0,
    'global-require': 'error',
    // 修改函数入参
    'no-param-reassign': ["error", { "props": false }],
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    // windows&unix结束符\n
    'linebreak-style': 0,
    // 箭头函数中的return
    "consistent-return": 0,
    // allow debugger during development
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': 'error',
    'eol-last': 0
  }
}
