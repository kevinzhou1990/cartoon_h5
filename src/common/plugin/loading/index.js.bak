import myLoading from './index.vue';
import env from '@/lib/utils/env';
export default {
  install(Vue) {
    if (env.isClient()){
      const Loading = Vue.extend(myLoading);
      const Profile = new Loading({
        el: document.createElement('div')
      });

      //插入到 document.body
      document.body.appendChild(Profile.$el);

      //定义显示隐藏的方法  open 会传入一个text 字符串。如果有则赋值给组件内默认值。
      const loadingMethod = {
        open() {
          Profile.show = true;
        },
        hide() {
          Profile.show = false;
        }
      };
      //添加实例方法 把自定义方法挂载到Vue构造器的上,这样每个实例都可以调用。
      Vue.prototype.$Loading = loadingMethod;
    }
  }
}
