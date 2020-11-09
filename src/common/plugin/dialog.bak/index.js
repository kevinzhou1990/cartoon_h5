import DialogComponent from './index.vue';
const Dialog = {
  install(Vue) {
    Vue.component('Dialog', DialogComponent);
    const DialogConstructor = Vue.extend(DialogComponent);
    const instance = new DialogConstructor();
    instance.$mount(document.createElement('div'));
    document.body.appendChild(instance.$el);
    Vue.prototype.$dialog = (msg, type, options) => {
      instance.message = msg;
      instance.show = true;
      instance.type = type;
      instance.options = options;
    };
  }
};
export default Dialog;
