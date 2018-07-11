// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  'globals': {
    'axios': true,
    '@': true,
    'UM': true,
    '_': true,
  },
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    'no-debugger': 'error',
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
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
    // 'keyword-spacing': [2, {
    //   'overrides': {
    //     'if': {
    //       'after': false
    //     },
    //     'for': {
    //       'after': false
    //     },
    //     'while': {
    //       'after': false
    //     }
    //   }
    // }],
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
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'global-require': 0,
    'no-case-declarations': 0
  }
}