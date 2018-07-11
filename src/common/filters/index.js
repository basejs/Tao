import format from '../libs/dateFormat'

const valueToLabel = (value, datas=[]) => {
  const current = datas.find(item => item.value === value)
  if(current) {
    return current.label
  }
  return ''
}

export default { format, valueToLabel }
