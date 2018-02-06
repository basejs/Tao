import Vue from 'vue'
import VueI18n from 'vue-i18n'
import localCN from '@/common/langs/zh-CN'
import localEN from '@/common/langs/en-US'
import elemeEN from 'element-ui/lib/locale/lang/en'
import elemeCN from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

Vue.config.lang = 'zh-CN'
Vue.locale('zh-CN', {
  ...elemeCN,
  ...localCN
})
// 英文状态下，缺失字段自动取中文
Vue.locale('en-US', _.merge({}, elemeEN, localCN, localEN))
