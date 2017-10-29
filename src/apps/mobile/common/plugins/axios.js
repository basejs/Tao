import Vue from 'vue'
import { MessageBox } from 'mint-ui'
import commonAxios from '@/common/plugins/axios'

const showError = (errMsg) => {
  MessageBox({
    title: Vue.t('common.network.title'),
    message: errMsg,
  })
}

commonAxios(showError)
