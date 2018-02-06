import Vue from 'vue'
import ElementUI from 'element-ui'
import App from '@/components/App'
import store from '@/store/index'
import router from '@/router'
import VueWechatTitle from 'vue-wechat-title'
import '@/common/plugins'

import 'element-ui/lib/theme-default/index.css'
import '@/assets/styles/admin/index.scss'

Vue.config.productionTip = false
Vue.config.devtools = false
Vue.use(ElementUI)
Vue.use(VueWechatTitle)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
