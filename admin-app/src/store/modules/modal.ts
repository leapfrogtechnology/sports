// Initial state
const state = {
  title: '',
  visible: false,
  bodyComponent: null
};

// Mutations
const mutations = {
  setOptions(state: any, options: any) {
    Object.assign(state, options);
  }
};

// Actions
const actions = {
  showModal(context: any, payload: any) {
    const options = {
      visible: true,
      title: payload.title || '',
      bodyComponent: payload.component || null
    };

    context.commit('setOptions', options);
  },

  hideModal(context: any) {
    const options = {
      visible: false,
      title: '',
      bodyComponent: null
    };

    context.commit('setOptions', options);
  }
};

// Getters
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
