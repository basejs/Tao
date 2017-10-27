/**
 * by zada
 * 2016-7-4 16:04:26
 */
'use strict';

var formatter = function(str, fmt) {
  if(!str) {
    return ''
  }
  if(typeof str === 'string') {
    // 后端吐的时间戳可能为Date(111111111)
    // 将中间空格转成T保险
    str = str.replace(/^\/Date\((\d+)\)\/$/ig, '$1').replace(/\s/, 'T')
    if(!isNaN(str)) {
      str = parseInt(str)
    }
  }

  fmt = fmt || 'YYYY-MM-DD hh:mm';

  var date = new Date(str);

  var rules = {
    'M+': date.getMonth() + 1, //月份
    'D+': date.getDate(), //日 
    'h+': date.getHours(), //  小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    'S': date.getMilliseconds(), //毫秒
    'T': 'T'
  };
  if (/(Y+)/i.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var key in rules) {
    if (new RegExp("(" + key + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (rules[key]) : (("00" + rules[key]).substr(("" + rules[key]).length)));
    }
  }
  return fmt;
}

module.exports = formatter;