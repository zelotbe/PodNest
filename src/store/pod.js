import store from ".";
import { getDefaultSession, fetch } from "@inrupt/solid-client-authn-browser";
import getLastModifiedString from "../util/CalculateModifiedDate.js";
import convertFileSize from "../util/FileSize.js";

import {
  addUrl,
  addStringNoLocale,
  createSolidDataset,
  createThing,
  getInteger,
  getDecimal,
  getPodUrlAll,
  getSolidDataset,
  getThing,
  getThingAll,
  getFile,
  getStringNoLocale,
  getStringNoLocaleAll,
  getStringByLocaleAll,
  removeThing,
  saveSolidDatasetAt,
  setThing,
  getContainedResourceUrlAll,
  getNamedNode,
} from "@inrupt/solid-client";

import { FOAF, RDF, AS, SCHEMA_INRUPT, POSIX } from "@inrupt/vocab-common-rdf";

export default {
  namespaced: true,
  state() {
    return {
      pods: {},
      name: "",
      files: {},
      baseURL: "",
      currentURL: "",
      openedFile: false,
      filecontent: "",
      currentFile: "",
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
    SET_URL(state, value) {
      state.currentURL = value;
    },
    SET_BASEURL(state, value) {
      state.baseURL = value;
    },
    SET_FILECONTENT(state, value) {
      state.filecontent = value;
    },
    SET_OPENEDFILE(state, value) {
      state.openedFile = value;
    },
    SET_CURRENTFILE(state, value) {
      state.currentFile = value;
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
    currentURL(state) {
      return state.currentURL;
    },
    baseURL(state) {
      return state.baseURL;
    },
    openedFile(state) {
      return state.openedFile;
    },
    fileContent(state) {
      return state.filecontent;
    },
    currentFile(state) {
      return state.currentFile;
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
      try {
        name = await getSolidDataset(store.getters["auth/WebID"], {
          fetch: session.fetch,
        });
      } catch (error) {
        console.log("error");
        return false;
      }
      const profile = getThing(name, store.getters["auth/WebID"]);
      commit("SET_NAME", getStringNoLocale(profile, FOAF.name));
    },
    async getData({ commit }) {
      const session = getDefaultSession();
      const profileURL = new URL(
        store.getters["auth/WebID"].replace(
          "/profile/card",
          store.getters["pod/currentURL"]
        )
      );
      profileURL.hash = "";

      let data;
      try {
        data = await getSolidDataset(profileURL.href, {
          fetch: session.fetch,
        });
      } catch (error) {
        store.dispatch(
          "auth/setError",
          "The session has expired, please login again."
        );
        store.dispatch("auth/logoutUser");
        return false;
      }

      let files = getThingAll(data);
      console.log(files);

      let filesObject = [];
      for (let i = 0; i < files.length; i++) {
        let item = {};
        let name = new URL(files[i].url);
        let size = getInteger(files[i], POSIX.size);
        size = convertFileSize(size);
        let modified = new Date(getDecimal(files[i], POSIX.mtime) * 1000);
        let modifiedString = getLastModifiedString(modified);
        item = { name: name.pathname, size: size, modified: modifiedString };

        console.log(item);
        filesObject.push(item);
      }
      filesObject.shift();
      commit("SET_FILES", filesObject);
    },
    setURL({ commit }, dir) {
      commit("SET_URL", dir);
    },
    setBaseURL({ commit }) {
      const url = new URL(
        store.getters["auth/WebID"].replace(
          "/profile/card",
          store.getters["pod/currentURL"]
        )
      );
      url.hash = "";
      commit("SET_BASEURL", url);
    },
    async getAll() {
      await store.dispatch("pod/getPods");
      await store.dispatch("pod/readProfile");
      await store.dispatch("pod/getData");
    },
    async readFile({ commit }, incomingFile) {
      commit("SET_OPENEDFILE", true);
      const session = getDefaultSession();
      const fileURL = new URL(
        store.getters["auth/WebID"].replace(
          "/profile/card",
          store.getters["pod/currentURL"]
        )
      );
      fileURL.pathname += incomingFile.slice(1);
      fileURL.hash = "";
      console.log(fileURL.href);

      try {
        const file = await getFile(fileURL.href, { fetch: fetch });

        let t = file.text().then(function (text) {
          return text;
        });
        let text = (await t).toString();
        commit("SET_FILECONTENT", text);
        console.log(text);
      } catch (err) {
        console.log(err);
      }
    },
    changeOpenedFile({ commit }, bool) {
      commit("SET_OPENEDFILE", bool);
    },
    setCurrentfile({ commit }, file) {
      commit("SET_CURRENTFILE", file);
    },
  },
};
