import * as gamesService from '@/services/games';
import GameInterface from '@/domains/models/Game';

// Initial state
const stateData = {
  data: [],
  loading: true,
  errorMessage: '',
  editData: {}
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
    context.commit('setLoading', false);

    gamesService
      .fetchAll()
      .then(response => {
        context.commit('setData', {
          data: response,
          errorMessage: ''
        });
      })
      .catch(() => {
        context.commit('setData', {
          data: [],
          errorMessage: 'Unable to fetch data'
        });
      })
      .then(() => {
        context.commit('setLoading', false);
      });
  },

  create(context: any, payload: GameInterface) {
    return gamesService.create(payload);
  },

  edit(context: any, payload: GameInterface) {
    return gamesService.edit(payload);
  },

  delete(context: any, payload: GameInterface) {
    return gamesService.remove(payload);
  },

  setEditData(context: any, payload: any) {
    const data = {
      editData: payload
    };

    context.commit('setData', data);
  }
};

// Getters
const getters = {
  games() {
    return stateData.data;
  }
};

export default {
  namespaced: true,
  mutations,
  actions,
  getters,
  state: stateData
};
