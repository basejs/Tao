// 遍历
export const traverse = (data, child, cb, parent) => {
  if(!data || !Array.isArray(data)) return data
  data.forEach(item => {
    if(typeof cb === 'function') cb(item, parent)
    if(item && item[child] && item[child].length) {
      traverse(item[child], child, cb, item)
    }
  })
}

//转list
export const toList = (data, child = 'children', list = []) => {
  if(!data || !Array.isArray(data)) return list
  data.forEach(item => {
    list.push(item)
    if(item[child] && item[child].length) {
      toList(item[child], child, list)
    }
  })
  return list
}

//查当前节点的祖先链
export const findChain = (list, val, key = 'id') => {
  const chains = []
  const f = (val, key = 'id') => {
    list.forEach(item => {
      if(item[key] === val) {
        chains.push(item)
        if(item.pid) {
          f(item.pid)
        }
      }
    })
  }
  f(val, key)
  return chains
}
