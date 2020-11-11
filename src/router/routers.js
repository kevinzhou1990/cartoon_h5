import loginRouters from '@/views/login/router';
export default [
  {
    path: '/',
    name: 'main',
    component: () => import(/* webpackChunkName: Main */ '@/views/main'),
    redirect: 'home',
    meta: {
      keepAlive: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: Home */ '@/views/home'),
        meta: {
          title: '首页',
          keepAlive: true
        }
      },
      {
        path: '/mine',
        name: 'mine',
        component: () => import(/* webpackChunkName: Mine */ '@/views/mine'),
        meta: {
          title: '我的',
          transitionIn: 'slide-left',
          keepAlive: false
        }
      },
      {
        path: '/shelf',
        name: 'shelf',
        component: () => import(/* webpackChunkName: Shelf */ '@/views/shelf'),
        meta: {
          title: '书架',
          transitionIn: 'slide-left',
          keepAlive: false
        }
      }
    ]
  },
  {
    path: '/favorites/:favorite_id',
    name: 'customize',
    component: () =>
      import(/* webpackChunkName: customize */ '@/views/shelf/favorites/customize/tableList'),
    meta: {
      title: '自定义收藏',
      keepAlive: false
    }
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import(/* webpackChunkName: customize */ '@/views/mine/personal'),
    meta: {
      title: '个人设置',
      keepAlive: false
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: customize */ '@/views/about'),
    meta: {
      title: '关于我们',
      keepAlive: false
    }
  },
  {
    path: '/personal/update-nickname',
    name: 'UpdateNickname',
    component: () => import(/* webpackChunkName: customize */ '@/views/mine/personal/nickname'),
    meta: {
      title: '更新昵称',
      keepAlive: false
    }
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import(/* webpackChunkName setting */ '@/views/mine/setting/index'),
    meta: {
      title: '设置'
    }
  },
  {
    path: '/reader',
    name: 'reader',
    component: () => import(/* webpackChunkName: reader */ '@/views/reader'),
    meta: {
      title: '漫画阅读',
      keepAlive: false
    }
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import(/* webpackChunkName:recommend */ '@/views/recommend'),
    meta: {
      title: '更多推荐',
      transitionIn: 'slide-left',
      keepAlive: false
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import(/* webpackChunkName:detail */ '@/views/detail'),
    meta: {
      title: '漫画详情',
      transitionIn: 'slide-left',
      keepAlive: false
    }
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: () => import(/* webpackChunkName:ranking */ '@/views/ranking'),
    meta: {
      title: '排行榜',
      transitionIn: 'slide-left',
      keepAlive: false
    }
  },
  {
    path: '/topic',
    name: 'topic',
    component: () => import(/* webpackChunkName:topic */ '@/views/topic'),
    meta: {
      title: '专题',
      transitionIn: 'slide-left',
      keepAlive: false
    }
  },
  {
    path: '/comments',
    name: 'comments',
    component: () => import(/* webpackChunkName:comments */ '@/views/comments'),
    meta: {
      title: '评论',
      transitionIn: 'slide-left',
      keepAlive: false
    }
  },
  {
    path: '/discovery',
    name: 'discovery',
    component: () => import(/* webpackChunkName:discovery */ '@/views/discovery'),
    meta: {
      title: '发现',
      transitionIn: 'slide-left',
      keepAlive: false
    }
  },
  {
    path: '/ZMSearch',
    name: 'ZMSearch',
    component: () => import(/* webpackChunkName: ZMSearch */ '@/views/search/index'),
    meta: {
      title: '搜索',
      transitionIn: 'slide-left',
      keepAlive: false
    }
  },
  {
    path: '/ZMSearchResult',
    name: 'ZMSearchResult',
    component: () => import(/* webpackChunkName: ZMSearchResult */ '@/views/search/searchResult'),
    meta: {
      title: '搜索结果',
      transitionIn: 'slide-left',
      keepAlive: false
    }
  },
  {
    path: '/download',
    name: 'AppDownload',
    component: () => import(/* webpackChunkName: Download */ '@/views/download'),
    meta: {
      title: '下载引导页',
      keepAlive: false
    }
  },
  {
    path: '/help',
    name: 'help',
    component: () => import(/* webpackChunkName: help */ '@/views/help'),
    meta: {
      title: '帮助中心',
      keepAlive: false
    }
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import(/* webpackChunkName: feedback */ '@/views/feedback'),
    meta: {
      title: '问题反馈',
      keepAlive: false
    }
  },
  ...loginRouters,
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: Download */ '@/views/404/404'),
    meta: {
      title: '404',
      keepAlive: false
    }
  },
  {
    path: '/500',
    component: () => import(/* webpackChunkName: Download */ '@/views/404/500'),
    meta: {
      title: '500',
      keepAlive: false
    }
  },
  {
    path: '/*',
    redirect: '/404'
  }
];
