const files = require.context('./', false, /^\.\/(?!index)\w+\.js$/i)
const data = {}

files.keys().forEach(key => {
  const k = key.match(/\w+/)[0]
  if (k) {
    data[k] = {
      ...files(key).default
    }
  }
})

// store数据没有层级关系，故定义时务必以模块区分开
export default {
  ...data
}
