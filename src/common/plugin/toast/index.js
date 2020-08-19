import Vue from 'vue';
import ToastComponent from './index.vue';
const ToastConstructor = Vue.extend(ToastComponent);

const Toast = (message = 'msg', options = { duration: 500 }) => {
  const instance = new ToastConstructor({
    el: document.createElement('div'),
    propsData: { message, ...options }
  });
  document.body.appendChild(instance.$el);
  // Vue.nextTick(function() {});
};
// const Toast = {
//   install(Vue) {
//     const ToastConstructor = Vue.extend(ToastComponent);
//     Vue.prototype.$toast = (message, options) => {
//       if (!message) return;
//       const propsData = { message, ...options };
//       const instance = new ToastConstructor({ propsData: { ...propsData } });
//       document.body.appendChild(instance.$mount().$el);
//     };
//   }
// };
export default Toast;
