import Vue from 'vue'
import commonAxios from '@/common/plugins/axios'

const showError = (errMsg) => {
  const { prototype: { $message } } = Vue
  $message({
    showClose: true,
    message: errMsg,
    type: 'error'
  })
}

commonAxios(showError)
