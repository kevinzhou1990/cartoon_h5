import Home from '@/views/home';
import Comments from '@/views/comments';
import Detail from '@/views/detail';
import Test from '@/views/detail/indexTest';
import Recommend from '@/views/recommend';
import Main from '@/views/main';
import Reader from '@/views/reader';
import Mine from '@/views/mine';
import Shelf from '@/views/shelf';
import CFavorites from '@/views/shelf/favorites/customize/tableList';
import Ranking from '@/views/ranking';
import Topic from '@/views/topic';
import Discovery from '@/views/discovery';
export default [
  {
    path: '/',
    name: 'main',
    component: Main,
    redirect: 'home',
    meta: { keepAlive: true },
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: { title: '首页', keepAlive: true }
      },
      {
        path: '/mine',
        name: 'mine',
        component: Mine,
        meta: { title: '我的', transitionIn: 'slide-left', keepAlive: false }
      },
      {
        path: '/shelf',
        name: 'shelf',
        component: Shelf,
        meta: { title: '书架', transitionIn: 'slide-left', keepAlive: false }
      }
    ]
  },
  {
    path: '/favorites/:favorite_id',
    name: 'customize',
    component: CFavorites,
    meta: { title: '自定义收藏', keepAlive: false }
  },
  {
    path: '/reader',
    name: 'reader',
    component: Reader,
    meta: { title: '漫画阅读', keepAlive: false }
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: Recommend,
    meta: { title: '更多推荐', transitionIn: 'slide-left', keepAlive: false }
  },
  {
    path: '/detail',
    name: 'detail',
    component: Detail,
    meta: { title: '漫画详情', transitionIn: 'slide-left', keepAlive: false }
  },
  {
    path: '/detail/test',
    name: 'test',
    component: Test,
    meta: { title: '漫画详情', transitionIn: 'slide-left', keepAlive: false }
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: Ranking,
    meta: { title: '排行榜', transitionIn: 'slide-left', keepAlive: false }
  },
  {
    path: '/topic',
    name: 'topic',
    component: Topic,
    meta: { title: '专题', transitionIn: 'slide-left', keepAlive: false }
  },
  {
    path: '/comments',
    name: 'comments',
    component: Comments,
    meta: { title: '评论', transitionIn: 'slide-left', keepAlive: false }
  },
  {
    path: '/discovery',
    name: 'discovery',
    component: Discovery,
    meta: { title: '发现', transitionIn: 'slide-left', keepAlive: false }
  }
];
