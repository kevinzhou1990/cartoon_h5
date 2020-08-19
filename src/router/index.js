import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home';
// import Comments from '@/views/comments';
import Detail from '@/views/detail';
import Test from '@/views/detail/indexTest';
import Recommend from '@/views/recommend';
import Main from '@/views/main';
import Reader from '@/views/reader';
import Mine from '@/views/mine';
import Shelf from '@/views/shelf';
import Ranking from '@/views/ranking';
import store from '../store';

Vue.use(Router);
const router = new Router({
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
          path: '/detail/test',
          name: 'test',
          component: Test,
          meta: { title: '漫画详情', transitionIn: 'slide-left' }
        }, // {
        //   path: '/detail/comments',
        //   name: 'comments',
        //   component: Comments,
        //   meta: { title: '评论', transitionIn: 'slide-left' }
        // },
        {
          path: '/recommend',
          name: 'recommend',
          component: Recommend,
          meta: { title: '更多推荐', transitionIn: 'slide-left' }
        },
        {
          path: '/mine',
          name: 'mine',
          component: Mine,
          meta: { title: '我的', transitionIn: 'slide-left' }
        },
        {
          path: '/shelf',
          name: 'shelf',
          component: Shelf,
          meta: { title: '书架', transitionIn: 'slide-left' }
        }
      ]
    },
    {
      path: '/reader',
      name: 'reader',
      component: Reader,
      meta: { title: '漫画阅读' }
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
      meta: { title: '漫画详情', transitionIn: 'slide-left' }
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking,
      meta: { title: '排行榜', transitionIn: 'slide-left' }
    }
  ]
});

router.afterEach((to, from) => {
  store.commit('updateActived', to.name);
});
export default router;
