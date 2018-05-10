import Vue from 'vue'
import Mint from 'mint-ui'
import App from '@/components/App'
import store from '@/store/index'
import router from '@/router'
import VueWechatTitle from 'vue-wechat-title'
import '@/common/plugins'

import '@/assets/styles/m/index.scss'

Vue.config.productionTip = false
Vue.config.devtools = false
Vue.use(VueWechatTitle)
Vue.use(Mint)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
