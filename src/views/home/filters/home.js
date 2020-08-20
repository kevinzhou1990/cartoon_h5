import Vue from 'vue'
Vue.filter('authorFormate', (val) => {
  if (!val) return '-'
  if (Object.prototype.toString.call(val) === '[object Array]') {
    return val.length > 1 ? val.join(' ') : val.toString()
  }
  return val
})
