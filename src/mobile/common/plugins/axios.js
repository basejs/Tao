import Vue from 'vue'
import { MessageBox } from 'mint-ui'
import commonAxios from '@/common/plugins/axios'

const errcb = (errCode) => {
  let timer = null
  switch (errCode) {
    // 登陆失效
    case 20001:
      if(!timer) {
        timer = setTimeout(() => {
          clearTimeout(timer)
          timer = null
          // 清除本地缓存
          // 跳转登录页
        }, 500)
      }
      break
    default:
      break
  }
}

const showError = (errMsg) => {
  MessageBox({
    title: Vue.t('common.network.title'),
    message: errMsg,
  })
}

commonAxios(errcb, showError)
