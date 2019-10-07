import * as tournamentService from '../../services/tournaments';

const stateData = {
  data: null,
  loading: true,
  errorMessage: ''
};

const getters = {
  sideBarData: (state: any) => {
    if (!state.data) {
      return [];
    }

    return tournamentService.getTournamentsListForSideBar(state.data);
  },

  recentTournaments: (state: any) => {
    if (!state.data) {
      return [];
    }

    return tournamentService.getRecentTournaments(state.data);
  }
};

const mutations = {
  setData(state: any, options: any) {
    Object.assign(state, options);
  }
};

const actions = {
  fetchTournaments(context: any) {
    context.commit('setData', { loading: true });

    tournamentService
      .fetchTournamentsList()
      .then(response => {
        context.commit('setData', { data: response, errorMessage: '' });
      })
      .catch(() => {
        context.commit('setData', { data: null, errorMessage: 'Unable to fetch data.' });
      })
      .then(() => {
        context.commit('setData', { loading: false });
      });
  }
};

export default {
  namespaced: true,
  state: stateData,
  getters,
  mutations,
  actions
};
