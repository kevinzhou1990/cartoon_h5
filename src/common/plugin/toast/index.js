import ToastComponent from './index.vue';
const Toast = {
  install(Vue) {
    const ToastConstructor = Vue.extend(ToastComponent);
    Vue.prototype.$toast = (message, options) => {
      if (!message) return;
      const propsData = { message, ...options };
      const instance = new ToastConstructor({ propsData: { ...propsData } });
      document.body.appendChild(instance.$mount().$el);
    };
  }
};
export default Toast;
