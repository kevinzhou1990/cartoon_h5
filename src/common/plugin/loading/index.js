import Vue from 'vue';
import myLoading from './index.vue';
import env from '@/lib/utils/env';

const Loading = Vue.extend(myLoading);
let instance;

export default {
  open() {
    if (env.isClient()) {
      if (!instance) {
        instance = new Loading({
          el: document.createElement('div')
        });
      }

      if (instance.show) return;
      document.body.appendChild(instance.$el);

      Vue.nextTick(() => {
        instance.show = true;
      });
    }
  },

  hide() {
    if (env.isClient()) {
      if (instance) {
        Vue.nextTick(() => {
          instance.show = false;
        });
      }
    }
  }
};
