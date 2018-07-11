import ProductTags from './ProductTags'
import BaseBlock from './BaseBlock'

const components = {
  install: (Vue) => {
    Vue.component('ProductTags', ProductTags)
    Vue.component('BaseBlock', BaseBlock)
  }
}

export default components
