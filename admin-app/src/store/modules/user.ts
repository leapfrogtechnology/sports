import * as authService from '../../services/auth';

// Initial state
const stateData = {
  userInfo: {}
};

// Mutations
const mutations = {
  setUserInfo(state: any, payload: any) {
    state.userInfo = payload;
  }
};

// Actions
const actions = {
  fetchUserInfo(context: any) {
    authService
      .getUserInfo()
      .then(response => {
        context.commit('setUserInfo', response);
      })
      .catch();
  },

  logout(context: any) {
    authService.logOut();
  }
};

// Getters
const getters = {};

export default {
  namespaced: true,
  mutations,
  actions,
  getters,
  state: stateData
};
