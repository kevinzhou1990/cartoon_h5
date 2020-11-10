import Vue from 'vue'

/**
 * @info: 作者格式化
 * @author: PengGeng
 * @date: 9/22/20-11:22 上午
 */
Vue.filter('authorFormate', (val) => {
  if (!val) return '-'
  if (typeof val === 'object') {
    return val.length >= 1 ? val.join('/') : '--'
  }
  return val
})
/**
 * @info: 周的格式化
 * @author: PengGeng
 * @date: 9/22/20-11:22 上午
 */
Vue.filter('weekFromate', (val) => {
  if (!val) return '--'
  const weeks = Math.floor(val / Number(7))
  return weeks
})

/**
 * @info: 人数格式化
 * @author: PengGeng
 * @date: 9/22/20-11:22 上午
 */
Vue.filter('personNums', (val) => {
  if (!val) return '--'
  const nums = val / 1000 > 1 ? (val / 1000).toFixed(1) : val
  return nums
})
