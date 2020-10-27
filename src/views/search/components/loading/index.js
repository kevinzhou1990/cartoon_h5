/**
 * @info: TODO 待定
 * @author: PengGeng
 * @date: 10/27/20-5:06 下午
 */
import Vue from 'vue'
import Loading from './loading'

const LoadIngConstructor = Vue.extend(Loading)
let LoadPool = []

// 返回一个instance
let returnInstance = instance => {
  if (instance) { LoadPool.push(instance) }
}

//  得到一个instance
let getInstance = () => {
  if (LoadPool.length > 0) {
    let instance = LoadPool[0]
	  LoadPool = LoadPool.splice(0, 1)
	  return instance
  }
  return new LoadIngConstructor({
	  el: document.createElement('div')
  })
}
LoadIngConstructor.prototype.close = function () {
  this.show = false
  // this.$el.parentNode.removeChild(this.$el)
  returnInstance(this)
}
LoadIngConstructor.prototype.show = function () {
  this.show = true
  // this.$el.parentNode.appendChild(this.$el)
  returnInstance(this)
}

const Load = (options) => {
  let instance = getInstance()
  // clearTimeout(timer)
  document.body.appendChild(instance.$el)
  Vue.nextTick(function() {
    instance.show = true
  })
  console.log(instance)
  return instance
}
export default Load
