import { IdInterface } from '@/domains/General';
import CategoryInterface from '@/domains/models/Category';
import * as categoriesService from '@/services/categories';

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

    categoriesService.fetchAll()
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

  create(context: any, payload: CategoryInterface) {
    return categoriesService.create(payload);
  },

  edit(context: any, payload: CategoryInterface) {
    return categoriesService.edit(payload);
  },

  delete(context: any, payload: IdInterface) {
    return categoriesService.remove(payload);
  },

  setEditData(context: any, payload: any) {
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
