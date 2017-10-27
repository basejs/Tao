import Vue from 'vue'
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
  const { prototype: { $message } } = Vue
  $message({
    showClose: true,
    message: errMsg,
    type: 'error'
  })
}

commonAxios(errcb, showError)
