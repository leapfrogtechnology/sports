import * as tournamentService from '../../services/tournaments';

const initialState = {
  data: null,
  loading: true,
  errorMessage: '',
  selectedTournament: {
    data: null,
    error: false,
    loading: true
  }
};

const stateData = Object.assign({}, initialState);

const getters = {
  sideBarData: (state: any) => {
    if (!state.data) {
      return [];
    }

    return tournamentService.getTournamentsListForSideBar(state.data);
  },

  navigationRoutes: (state: any) => (payload: { game: string, season: string }) => {
    if (!state.selectedTournament.data) {
      return [];
    }

    return tournamentService.getNavigationRoutes(state.selectedTournament.data, payload);
  },

  recentTournaments: (state: any) => {
    if (!state.data) {
      return [];
    }

    return tournamentService.getRecentTournaments(state.data);
  },

  selectedTournamentData: (state: any) => {
    if (!state.selectedTournament.data) {
      return initialState.selectedTournament;
    }

    return state.selectedTournament;
  }
};

const mutations = {
  setData: (state: any, options: any) => {
    Object.assign(state, options);
  },

  setSelectedData: (state: any, options: any) => {
    Object.assign(state.selectedTournament, options);
  }
};

const actions = {
  fetchTournaments: (context: any) => {
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
  },

  fetchTournament: (context: any, options: any) => {
    context.commit('setSelectedData', { loading: true });

    tournamentService
      .fetchTournament(options.game, options.season)
      .then(response => {
        const data = tournamentService.getSanitizedTournamentData(response);

        context.commit('setSelectedData', { data, error: false });
      })
      .catch(() => {
        context.commit('setSelectedData', { data: null, error: true });
      })
      .then(() => {
        context.commit('setSelectedData', { loading: false });
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
