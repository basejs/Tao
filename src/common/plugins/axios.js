import Vue from 'vue'
// import Qs from 'qs'

axios.defaults.timeout = 0

const { t, prototype: { $message, MessageBox } } = Vue
const showErrorMsg = (msg) => {
  const errMsg = msg || t('common.network.exception')
  if(MessageBox) {
    MessageBox({
      title: Vue.t('common.network.title'),
      message: errMsg,
    })
  }
  if($message) {
    $message({
      showClose: true,
      message: errMsg,
      type: 'error',
      duration: 3000
    })
  }
}

axios.interceptors.request.use(
  config => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    // config.data = Qs.stringify(config.data)
    return config
  },
)

let timer = null
axios.interceptors.response.use(
  response => {
    if(response.data.code !== 0) {
      switch (response.data.code) {
        // 登陆失效
        case 20001:
          if(!timer) {
            // showErrorMsg(response.data.msg)
            clearTimeout(timer)
            timer = setTimeout(() => {
              timer = null
              // 跳转登录
              location.href = response.data.data
            }, 500)
          }
          break
        default:
          showErrorMsg(response.data.msg)
          break
      }
    }
    if(!response.data.data) {
      response.data.data = {}
    }
    return response.data
  },
  error => {
    const errorMsg = t('common.network.exception')
    showErrorMsg(errorMsg)
    const errCode = error.response ? error.response.status : '-1'
    return Promise.reject({
      data: null,
      code: errCode,
      msg: errorMsg
    })
  }
)
