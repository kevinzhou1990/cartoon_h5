import Vue from 'vue';
import env from '@/lib/utils/env';
import ToastComponent from './index.vue';
const ToastConstructor = Vue.extend(ToastComponent);

const Toast = (message = 'msg', options = { duration: 500 }) => {
  if (env.isClient()) {
    const instance = new ToastConstructor({
      el: document.createElement('div'),
      propsData: { message, ...options }
    });
    document.body.appendChild(instance.$el);
  }
};
export default Toast;
