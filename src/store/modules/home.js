const home = {
  state: {
    recData: null,
	  backRouter: ''
  },
  mutations: {
    SET_REC_DATA: function (state, val) {
      state.recData = val
    },
	  SET_BACK_ROUTER: function (state, val) {
      state.backRouter = val
	  }
  },
  actions: {}
}
export default home
