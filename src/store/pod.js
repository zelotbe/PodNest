import store from ".";
import router from "../router";
import { getDefaultSession, fetch } from "@inrupt/solid-client-authn-browser";

import {
  addUrl,
  addStringNoLocale,
  createSolidDataset,
  createThing,
  getPodUrlAll,
  getSolidDataset,
  getThing,
  getThingAll,
  getStringNoLocale,
  getStringByLocaleAll,
  removeThing,
  saveSolidDatasetAt,
  setThing,
  getContainedResourceUrlAll,
} from "@inrupt/solid-client";

import {
  VCARD,
  RDF,
  AS,
  SCHEMA_INRUPT,
  FOAF,
  LDP,
} from "@inrupt/vocab-common-rdf";

export default {
  namespaced: true,
  state() {
    return {
      pods: {},
      name: "",
      files: {},
    };
  },
  mutations: {
    SET_POD(state, value) {
      state.pods = value;
    },
    SET_NAME(state, value) {
      state.name = value;
    },
    SET_FILES(state, value) {
      state.files = value;
    },
  },
  getters: {
    pods(state) {
      return state.pods;
    },
    files(state) {
      return state.files;
    },
    name(state) {
      return state.name;
    },
  },
  actions: {
    async getPods({ commit }) {
      const pods = await getPodUrlAll(store.getters["auth/WebID"], {
        fetch: fetch,
      });
      commit("SET_POD", pods);
    },
    async readProfile({ commit }) {
      const session = getDefaultSession();

      const profileURL = new URL(
        store.getters["auth/WebID"].replace("/profile/card", "")
      );
      profileURL.hash = "";

      let name;
      let data;
      try {
        name = await getSolidDataset(store.getters["auth/WebID"], {
          fetch: session.fetch,
        });
        data = await getSolidDataset(profileURL.href, {
          fetch: session.fetch,
        });
      } catch (error) {
        console.log("error");
        return false;
      }
      const profile = getThing(name, store.getters["auth/WebID"]);
      commit("SET_NAME", getStringNoLocale(profile, FOAF.name));
      //console.log(profile);

      let files = getThingAll(data);

      let filesObject = [];
      for (let i = 0; i < files.length; i++) {
        let item;
        let name = new URL(files[i].url);
        // let t = getStringNoLocale(files[i], LDP.type);

        item = name.pathname;
        filesObject.push(item);
      }
      commit("SET_FILES", filesObject);
    },
    async getAll() {
      await store.dispatch("pod/getPods");
      await store.dispatch("pod/readProfile");
    },
  },
};
