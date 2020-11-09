import Vue from 'vue'
import ZMDialog from './index.vue';

const ZMDialogConstructor = Vue.extend(ZMDialog)
let dialogPool = []

let returnAnInstance = instance => {
  if (instance) {
	  dialogPool.push(instance)
  }
}

ZMDialogConstructor.prototype.close = () => {
  if (getInstance) {
	  getInstance.show = false
  }
  returnAnInstance()
  // this.$el.parentNode.removeChild(this.$el)
}
let getInstance = () => {
  if (dialogPool.length > 0) {
    let instance = dialogPool[0]
    dialogPool.splice(0, 1)
    return instance
  }
  return new ZMDialogConstructor({
    el: document.createElement('div')
  })
}

const Dialog = (msg, type, options) => {
  const instance = getInstance();
  console.log(instance)
  document.body.appendChild(instance.$el);
  Vue.nextTick(() => {
	  instance.message = msg;
	  instance.show = true;
	  instance.type = type;
	  instance.options = options;
  })
  return instance
}

Dialog.install = () => {
  Vue.use(ZMDialog);
};
Vue.prototype.$dialog = Dialog;

export default Dialog;
