import Vue from 'vue'
import App from '@/components/App'
import store from '@/store/index'
import router from '@/router'
import VueWechatTitle from 'vue-wechat-title'
import '@/common/plugins/m'
import components from './components/globalComponents'
import './index.scss'

Vue.config.productionTip = false
Vue.config.devtools = false
Vue.use(VueWechatTitle)
Vue.use(components)

// todo 全局过滤器放到js文件中
Vue.filter('money', v => (v || 0).toFixed(2))

if (module.hot) {
  module.hot.accept()
}

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
