const home = {
  state: {
    recData: null,
	  backRouter: '',
	  homeSearchVal: ''
  },
  mutations: {
    SET_REC_DATA: function (state, val) {
      state.recData = val
    },
	  SET_BACK_ROUTER: function (state, val) {
      state.backRouter = val
	  },
	  SET_SEARCH_VAL: function (state, val) {
		  state.homeSearchVal = val
	  }
  },
  actions: {}
}
export default home
