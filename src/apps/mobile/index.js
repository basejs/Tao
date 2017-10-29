import Vue from 'vue'
import VueWechatTitle from 'vue-wechat-title'
import App from '@/components/App'
import store from '@/vuex/store'

import '@/assets/styles/mobile/index.scss'
import './common/plugins'

import router from './router'

Vue.config.productionTip = false
Vue.use(VueWechatTitle)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
