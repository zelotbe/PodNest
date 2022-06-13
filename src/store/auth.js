import { logout } from "@inrupt/solid-client-authn-browser";
import router from "../router";

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
    SET_ERROR(state, value) {
      state.error = value;
    },
  },
  getters: {
    loggedIn(state) {
      return state.isLoggedIn;
    },
    WebID(state) {
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
    setError({ commit }, error) {
      commit("SET_ERROR", error);
    },
    logoutUser({ commit }) {
      logout();
      window.localStorage.clear();
      router.push("/");
      commit("SET_LOGGEDIN", false);
    },
  },
};
