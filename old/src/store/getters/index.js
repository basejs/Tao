const files = require.context('./', false, /^\.\/(?!index)\w+\.js$/i)
let data = {}

files.keys().forEach(key => {
  data = {
    ...data,
    ...files(key).default
  }
})

// store数据没有层级关系，故定义时务必以模块区分开
export default {
  ...data
}
