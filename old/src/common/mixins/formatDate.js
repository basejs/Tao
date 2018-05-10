import format from '../libs/dateFormat'

export default {
  methods: {
    formatDate(str, fmt) {
      return format(str, fmt)
    },
  }
}
