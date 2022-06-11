import { createStore } from "vuex";
import auth from "./auth";
import pod from "./pod";

export default createStore({
  getters: {},
  mutations: {},
  modules: {
    auth,
    pod,
  },
});
