import { IDInterface } from '@/domains/General';
import * as tournamentService from '@/services/tournaments';
import TournamentInterface, { TournamentPayloadInterface } from '@/domains/models/Tournament';

// Initial state
const stateData = {
  data: [],
  loading: true,
  errorMessage: '',
  selectedData: null,
  loadingSelectedData: true,
  initialData: {
    id: 0,
    name: '',
    season: '',
    game: {
      id: null
    },
    startDate: null,
    finishDate: null,
    registrationFormUrl: ''
  }
};

// Mutations
const mutations = {
  setData(state: any, options: any) {
    Object.assign(state, options);
  }
};

// Actions
const actions = {
  fetchList(context: any) {
    context.commit('setData', { loading: true });

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
        context.commit('setData', { loading: false });
      });
  },

  fetchOne(context: any, payload: IDInterface) {
    context.commit('setData', { loadingSelectedData: true });

    tournamentService
      .fetchOne(payload)
      .then(response => {
        context.commit('setData', {
          selectedData: response,
          errorMessage: ''
        });
      })
      .catch(() => {
        context.commit('setData', {
          selectedData: null,
          errorMessage: 'Unable to fetch selected data'
        });
      })
      .then(() => {
        context.commit('setData', { loadingSelectedData: false });
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
  },

  resetSelectedData(context: any) {
    const data = {
      selectedData: null
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
