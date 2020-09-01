import Vue from 'vue';
import ToastComponent from './index.vue';
const ToastConstructor = Vue.extend(ToastComponent);

const Toast = (message = 'msg', options = { duration: 500 }) => {
  const instance = new ToastConstructor({
    el: document.createElement('div'),
    propsData: { message, ...options }
  });
  document.body.appendChild(instance.$el);
};
export default Toast;
