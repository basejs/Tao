# Tao

> 根据项目经验提炼的一套通用型前端架构，采用Vue技术栈，基于vue-cli搭建集成eslint(airbnb)。集成多页打包配置，便于项目扩展，模块拆分。
> 集成elementui框架，基于vue-i18n集成多语言环境。

## 启动步骤

``` bash
# 安装依赖
npm install

# 启动本地服务 localhost:9527
npm start

# 打包
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 注意事项

#### 目录结构
只提取我认为重要的目录或文件进行标注说明。
``` bash
Tao/
  ├── build/  webpack打包配置目录
  │   ├──
  │   ├── dev-server.js  本地服务器
  │   ├── utils.js  工具函数，多页入口配置也在这里
  │   ├── vue-loader.conf.js  cssloader
  │   ├── webpack.base.conf.js 通用配置项
  │   ├── webpack.dev.conf.js 开发环境配置项
  │   ├── webpack.prod.conf.js 生产环境配置项
  │   ├──
  ├── config/  环境配置
  │   ├──
  │   ├── index.js  webpack开发与生产环境的差异化配置
  │   ├── server.js  自定义的服务器地址，用于转发ajax请求
  │   ├── (dev|prod).evn.js  环境变量
  │   ├──
  ├── src/  开发目录
  │   ├──
  │   ├── assets/  资源目录
  │       ├──
  │       ├── images/  图片
  │       ├── styles/  sass/css/less
  │       ├── fonts/  字体图标
  │       ├── media/  媒体资源
  │   ├──
  │   ├── common/ 全局资源 
  │       ├──
  │       ├── filters/  Vue过滤器
  │       ├── langs/  语言包(已提供缺省语言包时自动取中文包的写法)
  │       ├── libs/  第三方js
  │       ├── mixins/  Vue混合对象
  │       ├── plugins/  全局行为
  │           ├──
  │           ├── axios.js  axios拦截器
  │           ├── filter.js  绑定全局filter(默认只有一个时间格式format)
  │           ├── i18n.js  配置多语言环境(默认中文)
  │           ├── index.js  入口文件
  │   ├──
  │   ├── components/  全局组件
  │   ├──
  │   ├── requests/  请求目录(分离所有的axios的请求，按模块书写)
  │   ├──
  │   ├── vuex/  全局vuex管理
  │       ├──
  │       ├── state/  state划分同mutations/
  │       ├── actions/  actions没咋用过
  │       ├── mutations/ 
  │           ├──
  │           ├── common.js  全局mutations，用于修改../state/common.js中定义的state
  │           ├── index.js  入口文件
  │           ├── manager.js  manager模块的mutations，(只是名义上分离，实际上也能修改common中的state)
  │           ├── mobile.js  mobile模块的mutations
  │   ├──
  │   ├── apps/  多页模块目录，目录下所有包含index.html目录会被打包成多页模块
  │       ├──
  │       ├── manager/  manager模块
  │           ├── 
  │           ├── common/  对应全局common/
  │           ├── router/  路由配置目录
  │           ├── components/  模块下公共组件
  │           ├── home/  模块首页路由
  │           ├── index.html  模块打包模板
  │           ├── index.js  模块实例化入口
  │           ├── main.vue  模块路由入口
  │       ├──
  │       ├── mobile/  mobile模块同manager模块
  │   ├── 
  │   ├── home/  全局首页路由
  │   ├── 
  │   ├── notfound/  全局404路由(其他全局路由均可放这一层)
  │   ├──
  │   ├── index.html  首页打包模板
  │   ├── index.js  首页实例化入口
  │   ├── main.vue  首页路由入口
  │
  ├── public/  静态资源目录(不用webpack加载的资源)
  │
  ├── dist/  生产代码目录
  │
  ├── node_modules/  包文件目录
  │
  ├── .eslintrc.js  eslint规则
  │
  ├── .eslintignore  eslint过滤文件
  │
  ├── .babelrc  babel规则补充
  │
  ├── .gitignore  git过滤文件
  │
  ├── .postcssrc.js  postcss 插件
  │
  ├── package.json 依赖包和启动命令配置文件
  │
  └── etc
```

#### 代码段说明
**多页打包配置**
```javascript
// build/utils.js 默认已支持src目录下所有包含index.html的目录进行多页打包
exports.getMultiEntries = function() {
  // 配置依赖index.html，自动识别src/apps下的目录进行多页打包
  var files1 = glob.sync('src/apps/**/index.html')
  var files2 = glob.sync('src/index.html')
  var files = [].concat(files1).concat(files2)
  var entries = {}

  files.forEach(function(f) {
    var name = /((?:.*\/)index)\.html/.exec(f)[1] //moudule/index这样的文件名
    if (!name) return

    entries[name.replace(/^src\/(apps\/)?/, '')] = './' + name + '.js'
  })
  return entries
}
```

**支持history路由**
```javascript
// build/dev-server.js 默认已支持所有多页目录history，如需修改，请重写rewrites
app.use(require('connect-history-api-fallback')({
  rewrites: rewrites,
}))
```

**页面标题**
```javascript
  // mobile模块已集成vue-wechat-title，用通过router中定义meta修改标题
  // src/mobile/router/inde.js 
  {
    path: '/mobile',
    component: () => import('@/mobile/main.vue'),
    meta: {
      title: Vue.t('mobile.title'),
    },
  }
```
**路由拦截**
```javascript
// src/manager/common/plugins/axios.js
import commonAxios from '@/common/plugins/axios'

const showError = (errMsg) => {
  const { prototype: { $message } } = Vue
  $message({
    showClose: true,
    message: errMsg,
    type: 'error'
  })
}
// commonAxios支持第二个参数，如果传值则替换默认拦截
commonAxios(showError)
```

#### 建议或约定
-  eslit建议不要关闭。
-  class名称遵循BEM规范。
-  **多页模块间跳转请使用href**，模块内部路由跳转使用<router-link>或router.push()，不要用a标签。
-  如果模块比较大(资源文件或页面比较多)，可以考虑分离全局assets目录下的styles和images目录到对应模块下
-  模块(多页模块)间vuex状态不共享，如果涉及跨模块共享vuex时，请善用本地缓存配合

#### 已知问题
-  多页打包带来vuex状态好像无法共享，暂时没有想到很好的办法解决。
