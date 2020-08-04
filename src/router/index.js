import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home';
import Comments from '@/views/comments';
import Detail from '@/views/detail';
import Recommend from '@/views/recommend';
import Main from '@/views/main';
import Reader from '@/views/reader';
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      redirect: 'home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home,
          meta: { title: '首页' }
        },
        {
          path: '/detail',
          name: 'detail',
          component: Detail,
          meta: { title: '漫画详情', transitionIn: 'slide-left' }
        },
        {
          path: '/detail/comments',
          name: 'comments',
          component: Comments,
          meta: { title: '评论', transitionIn: 'slide-left' }
        },
        {
          path: '/recommend',
          name: 'recommend',
          component: Recommend,
          meta: { title: '更多推荐', transitionIn: 'slide-left' }
        }
      ]
    },
    {
      path: '/reader',
      name: 'reader',
      component: Reader,
      meta: { title: '漫画阅读' }
    }
  ]
});
