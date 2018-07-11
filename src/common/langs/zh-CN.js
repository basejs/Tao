const files = require.context('./', true, /^\.\/zh-CN\.js$/i)
const data = {}

files.keys().forEach(key => {
  const k = key.match(/\w+/)[0]
  if (k) {
    data[k] = {
      ...files(key).default
    }
  }
})

export default {
  ...data
}
