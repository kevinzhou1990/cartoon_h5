import DialogComponent from './index.vue';
const Dialog = {
  install(Vue) {
    Vue.component('Dialog', DialogComponent);
    const DialogConstructor = Vue.extend(DialogComponent);
    const instance = new DialogConstructor();
    instance.$mount(document.createElement('div'));
    document.body.appendChild(instance.$el);
    Vue.prototype.$dialog = (msg, type) => {
      instance.message = msg;
      instance.show = true;
      instance.type = type;
      console.log(msg, type, instance);
      // instance.open = () => {
      //   console.log('open');
      // };
      // instance.close = () => {
      //   console.log('close');
      // };
    };
  }
};
export default Dialog;
