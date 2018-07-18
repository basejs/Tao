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
  │   ├── build.js  打包命令入口
  │   ├── utils.js  工具函数，多页入口配置也在这里
  │   ├── vue-loader.conf.js  cssloader
  │   ├── webpack.base.conf.js 通用配置项
  │   ├── webpack.dev.conf.js 开发环境webpack配置项
  │   ├── webpack.prod.conf.js 生产环境webpack配置项
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
  │       ├── images/  全局图片
  │       ├── styles/  sass/css/less
  │       ├── fonts/  字体图标
  │       ├── media/  媒体资源
  │   ├──
  │   ├── common/ 全局资源 
  │       ├──
  │       ├── filters/  Vue过滤器
  │       ├── langs/  语言包(已提供缺省语言包时自动取中文包的写法)
  │       ├── libs/  第三方js
  │       ├── mixins/  Vue mixins
  │       ├── plugins/  全局行为
  │           ├── 
  │           ├── axios.js  axios拦截器
  │           ├── filter.js  绑定全局filter(默认只有一个时间格式format)
  │           ├── i18n.js  配置多语言环境(默认中文)
  │           ├── router.js  全局路由处理
  │           ├── index.js  入口文件
  │       ├── utils/  工具函数
  │       ├── mapping/  通用枚举对象
  │   ├──
  │   ├── api/  请求目录(按端或独立模块分离，建议写注释)
  │   ├──
  │   ├── store/  vuex状态管理
  │       ├──
  │       ├── getters/ 
  │       ├── state/
  │       ├── actions/  
  │       ├── modules/  vuex最好用的部分
  │       ├── mutations/ 
  │           ├──
  │           ├── common.js  
  │           ├── index.js
  │   ├──
  │   ├── apps/  多页模块目录，目录下所有包含index.html目录会被打包成多页模块
  │       ├──
  │       ├── m/  移动端
  │           ├── 
  │           ├── router/  路由配置目录
  │           ├── components/  模块下公共组件
  │           ├── containers/  模块首页路由
  │               ├── home/  首页视图
  │               ├── index.vue  路由入口视图
  │           ├── index.html  模块打包模板
  │           ├── index.js  模块实例化入口
  │       ├──
  │   ├── 
  │   ├── components/  全局组件
  │       ├── App.vue  所有端通用入口配置
  │   ├──
  │   ├── containers/  网站默认端视图
  │       ├── home/  网站默认端首页
  │       ├── index.vue  网站默认端全局入口视图
  │   ├── 
  │   ├── index.html  网站默认端模板
  │   ├── index.js  网站默认端入口
  │
  ├── static/  静态资源目录
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
// build/utils.js
exports.getMultiEntries = function() {
  // 配置依赖index.html，自动识别src/apps下的目录进行多页打包
  var files1 = glob.sync('src/index.html')
  var files2 = glob.sync('src/apps/**/index.html')
  // 如果不需要多页配置，只需 files2 = []即可
  var files = []
  var entries = {}
  if(files1) {
    files = files.concat(files1)
  }
  if(files2) {
    files = files.concat(files2)
  }

  files.forEach(function(f) {
    var name = /((?:.*\/)index)\.html/.exec(f)[1] //moudule/index这样的文件名
    if (!name) return

    entries[name.replace(/^src\/(apps\/)?/, '')] = './' + name + '.js'
  })
  return entries
}
```

**多页适配history模式**
```javascript
// build/webpack.dev.conf.js
const pageArr = Object.keys(utils.getMultiEntries()).filter(function(item) {
  return item !== 'index'
})
const rewrites = pageArr.map(function(page) {
  return {
    from: new RegExp('\/'+ page.split('/')[0] +'(\/?$|\/[^.]+$)'), to: '/' + page + '.html'
  }
})
devServer: {
  historyApiFallback: {
    rewrites: rewrites
  }
}
```

**页面标题**
```javascript
  // 已全局集成vue-wechat-title，在router定义中配置meta.title可便捷修改标题
  // src/m/router/inde.js 
  export default {
    path: '/m',
    component: () => import('../containers/main.vue'),
    children: [
      {
        path: '',
        component: () => import('../containers/home/index.vue'),
        meta: {
          title: '移动端首页'
        }
      },
    ]
  }
  // components/app.vue
  // <router-view v-wechat-title="title"></router-view>
  computed: {
    title() {
      return this.$store.state.title
    },
  }
  // common/plugins/router.js
  router.beforeEach((to, from, next) => {
    if(to.meta.title) {
      store.commit('updateTitle', to.meta.title)
    }
  })
```

**移动端适配**
```sass
// 移动端提供了2种适配方式lib-flexible和vw
// src/assets/styles/function/_px2rem.scss  依赖flexible计算根字体的font-size
// 需在src/apps/mobile/index.html中引入<script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js"></script>
@function px2rem($px, $designWidth: 750) {
  @return ($px / $designWidth) * 10rem;
}
// src/assets/styles/function/_px2vw.scss
// 建议使用vw进行适配，因为这种方式对于小数圆角有更好的支持，并且不依赖于js计算，更加的优雅，如果需要了解更多的用法，可以参考http://www.w3cplus.com/css/vw-for-layout.html
@function px2vw($px, $designWidth: 750) {
  @return ($px * (100 / $designWidth)) * 1vw;
}

// 2者用法都类似
.test1 {
  width: px2vw(20);
  height: px2vw(20);
}
.test1 {
  width: px2rem(20);
  height: px2rem(20);
}
```

#### 建议或约定
-  eslit不建议关闭。
-  class名称遵循BEM规范。
-  **多页模块间跳转请使用href**，模块内部路由跳转使用<router-link>或router.push()，不要用a标签。
-  组件以目录为区间，并且遵循样式与视图分离，一个组件应该包含一个index.vue文件和一个index.scss文件
-  模块(多页模块)间store状态不共享，如果涉及跨模块共享vuex时，请善用本地和服务器缓存配合

#### 已知问题
-  多端项目复杂度增加之后，开发环境会导致内存溢出，解决方式可以在手动修改:
mac 解决方案/node_modules/.bin/webpack-dev-server文件，在首行位置加上#!/usr/bin/env node --max_old_space_size=4096
win 解决方案/node_modules/.bin/webpack.cmd文件 node  "--max-old-space-size=4096 %~dp0\..\webpack\bin\webpack.js" %*
- 在script中加载的scss文件不会按需加载，解决办法可以将需要后加载的css代码放在style便签中加载
