# i18n

> test vue i18n

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 注意事项
eslit
class名称遵循BEM规范
通用组件才写入全局components，业务组件放在模块下
全部路由跳转选用<router-link></router-link>或this.$router.push()，不要用a标签拼接
