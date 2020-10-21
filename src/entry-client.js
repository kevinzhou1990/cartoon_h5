import Vue from 'vue';
import { createApp } from './main';

const { app, store, router } = createApp();

Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options;
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      })
        .then(next)
        .catch(next);
    } else {
      next();
    }
  }
});

// 客户端挂载app之前，store状态替换
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

// 数据预处理，路由导航跳转前，解析数据
router.onReady(() => {
  console.log('进入了客户端实例');
  // 添加路由钩子函数，用于处理asyncData
  // 在初始路由resolve之后执行，以便我们不会二次预取已有的数据
  // 使用 `router.beforeResolve()`，以确保所有异步组件都resolve
  router.beforeResolve((to, from, next) => {
    const matchedComponents = router.getMatchedComponents(to);
    const preMatchComponents = router.getMatchedComponents(from);
    const actived = matchedComponents.filter((component, i) => component !== preMatchComponents[i]);
    // 我们只关心非预渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异列表
    const activatedAsyncHooks = actived.map(component => component && component.asyncData).filter(Boolean);

    if (!activatedAsyncHooks.length) {
      return next();
    }
    // 这里如果有加载指示器，就触发
    notify('开始预取数据...');
    Promise.all(
      activatedAsyncHooks.map(hook => {
        hook({ store, route: to });
      })
    )
      .then(() => {
        // 停止加载指示器
        console.log('ok');
        next();
      })
      .catch(next);
  });
  app.$mount('#app');
});

// 注册service-worker
if (window && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js');
}

// 浏览器通知函数
function notify(title) {
  if (!('Notification' in window)) return;

  if (Notification.permission === 'granted') {
    return new Notification(title);
  } else {
    Notification.requestPermission(permission => {
      if (permission === 'granted') {
        return new Notification(title);
      }
    });
  }
}
