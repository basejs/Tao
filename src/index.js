import Vue from 'vue'
import App from '@/components/App'
import store from '@/vuex/store'

import 'element-ui/lib/theme-default/index.css'
import '@/assets/styles/manager/index.scss'
import './common/plugins'

import router from './router'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
