const searchRouters = [
// 	{
// 		path: '/ZMSearch',
// 		name: 'searchIndex',
// 		component: () => import(/* webpackChunkName searchIndex*/ '@/views/search/index'),
// 		meta: {
// 			title: '搜索',
// 			keepAlive: false
// 		},
// 		children: [
// 			{
// 				path: '',
// 				component: () => import(/* webpackChunkName search*/ '@/views/search/search')
// 			},
// 			{
// 				path: 'index',
// 				component: () => import(/* webpackChunkName search*/ '@/views/search/search')
// 			},
// 			{
// 				path: 'searchResult',
// 				component: () => import(/* webpackChunkName searchResult*/ '@/views/search/searchResult')
// 			}
// 		]
// 	}
	{
	  path: '/ZMSearch',
	  name: 'ZMSearch',
	  component: () => import(/* webpackChunkName: ZMSearch */ '@/views/search/index'),
	  meta: {
	    title: '搜索',
	    keepAlive: false
	  }
	},
	{
	  path: '/ZMSearchResult',
	  name: 'ZMSearchResult',
	  component: () => import(/* webpackChunkName: ZMSearchResult */ '@/views/search/searchResult'),
	  meta: {
	    title: '搜索结果',
	    keepAlive: false
	  }
	}
]
export default searchRouters
