const loginRouters = [
  {
    path: '/ZMLogin',
	  name: 'ZMLogin',
	  component: () => import(/* webpackChunkName ZMLogin*/ '@/views/login/index'),
	  meta: {
      title: '登陆',
		  keepAlive: false
	  }
  },
  {
    path: '/ZM/userAgreement',
	  name: 'userAgreement',
	  component: () => import(/* webpackChunkName userAgreement*/ '@/views/login/page/userAgreement'),
	  meta: {
      title: '用户协议',
		  keepAlive: false
	  }
  }
]
export default loginRouters
