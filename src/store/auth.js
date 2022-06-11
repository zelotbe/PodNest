import router from "../router";
import store from "../store";

export default {
  namespaced: true,
  state() {
    return {
      isLoggedIn: false,
      webID: null,
      error: null,
    };
  },
  mutations: {
    SET_LOGGEDIN(state, value) {
      state.isLoggedIn = value;
    },
    SET_WEBID(state, value) {
      state.webID = value;
    },
  },
  getters: {
    getIsLoggedIn(state) {
      return state.isLoggedIn;
    },
    getWebID(state) {
      return state.webID;
    },
    error(state) {
      return state.error;
    },
  },
  actions: {
    setLoggedIn({ commit }, bool) {
      commit("SET_LOGGEDIN", bool);
    },
    setWebID({ commit }, url) {
      commit("SET_WEBID", url);
    },
  },
};
