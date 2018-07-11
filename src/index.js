import Vue from 'vue'
import App from '@/components/App'
import store from '@/store/index'
import router from '@/router'
import VueWechatTitle from 'vue-wechat-title'
import '@/common/plugins'
import './index.scss'

Vue.config.productionTip = false
// Vue.config.devtools = true

Vue.use(VueWechatTitle)

if (module.hot) {
  module.hot.accept()
}

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
