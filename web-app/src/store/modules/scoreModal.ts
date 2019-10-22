const initialState = {
  show: false,
  fixture: null,
  bodyComponent: null
};

const stateData = Object.assign({}, initialState);

const getters = {};

const mutations = {
  setData: (state: any, options: any) => {
    Object.assign(state, options);
  }
};

const actions = {
  showModal: (context: any, options: any) => {
    const payload = {
      ...options,
      show: true
    };

    context.commit('setData', payload);
  },

  hideModal: (context: any) => {
    context.commit('setData', initialState);
  }
};

export default {
  getters,
  mutations,
  actions,
  state: stateData,
  namespaced: true
};
