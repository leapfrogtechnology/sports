import { fetchAllGames } from '../../services/games';

// Initial state
const state = {
  data: [],
  loading: true,
  errorMessage: ''
};

// Mutations
const mutations = {
  setData(state: any, options: any) {
    Object.assign(state, options);
  },

  setLoading(state: any, loading: boolean) {
    state.loading = loading;
  }
};

// Actions
const actions = {
  fetchList(context: any) {
    context.commit(`setLoading`, false);

    fetchAllGames()
      .then(response => {
        context.commit(`setData`, {
          data: response,
          errorMessage: ''
        });
      })
      .catch(() => {
        context.commit(`setData`, {
          data: [],
          errorMessage: 'Unable to fetch data'
        });
      })
      .then(() => {
        context.commit(`setLoading`, false);
      });
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
