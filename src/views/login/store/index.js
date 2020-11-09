const Login = {
  state: {
    userInfo: {},
	  backRouter: ''
  },
  mutations: {
    SET_USERS_INFO(state, obj) {
      state.userInfo = Object.assign({}, obj)
	  },
	  SET_LAST_ROUTER(state, val) {
      state.backRouter = val
	  }
  },
  actions: {}
};
export default Login;
