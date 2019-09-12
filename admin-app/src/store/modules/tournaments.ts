import { IDInterface } from '@/domains/General';
import * as tournamentService from '@/services/tournaments';
import TournamentInterface, { TournamentPayloadInterface } from '@/domains/models/Tournament';

// Initial state
const stateData = {
  data: [],
  loading: true,
  errorMessage: '',
  editData: {
    id: 0,
    name: '',
    season: '',
    gameId: 0,
    startDate: null,
    finishDate: null,
    registrationFormUrl: ''
  }
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

    tournamentService
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

  create(context: any, payload: TournamentPayloadInterface) {
    return tournamentService.create(payload);
  },

  edit(context: any, payload: TournamentPayloadInterface) {
    return tournamentService.edit(payload);
  },

  delete(context: any, payload: IDInterface) {
    return tournamentService.remove(payload);
  },

  setEditData(context: any, payload: TournamentInterface) {
    const data = {
      editData: payload
    };

    context.commit('setData', data);
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
