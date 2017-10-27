# Tao

> 根据项目经验提炼的一套通用型前端架构，采用Vue技术栈，基于vue-cli搭建集成eslint(airbnb)。集成多页打包配置，便于项目扩展，模块拆分。
> 集成elementui框架，基于vue-i18n集成多语言环境。
> 

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9527
npm start

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 注意事项
eslit
class名称遵循BEM规范
通用组件才写入全局components，业务组件放在模块下
全部路由跳转选用<router-link></router-link>或this.$router.push()，不要用a标签拼接


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
  │   ├── manager/  manager模块
  │       ├── 
  │       ├── common/  对应全局common/
  │       ├── router/  路由配置目录
  │       ├── components/  模块下公共组件
  │       ├── home/  模块首页
  │       ├── notfound/  404
  │       ├── index.html  模块打包模板页
  │       ├── index.js  模块实例化入口
  │       ├── main.vue  模块路由入口
  │   ├──
  │   ├── mobile/  mobile模块同manager模块
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