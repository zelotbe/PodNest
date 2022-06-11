<script>
import { mapGetters } from "vuex";

import { fetch } from "@inrupt/solid-client-authn-browser";

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
  removeThing,
  saveSolidDatasetAt,
  setThing,
  getContainedResourceUrlAll,
} from "@inrupt/solid-client";

import { VCARD, RDF, AS, SCHEMA_INRUPT, FOAF } from "@inrupt/vocab-common-rdf";
export default {
  computed: {
    ...mapGetters({
      pods: "pod/pods",
      files: "pod/files",
    }),
  },
  methods: {},
  mounted() {
    this.$store.dispatch("pod/getAll");
  },
};
</script>

<template>
  <div class="bg-lime-50" id="dashboard">
    <div>
      <h2>File viewer</h2>
      <div class="container" v-if="pods.length > 1">
        <h3>Select a pod to manage.</h3>
        <select class="rounded-full">
          <option value="">Choose a pod from below to continue</option>
          <option v-for="pod in pods" :key="pod" :value="pod">{{ pod }}</option>
        </select>
      </div>
      <div v-else class="flex flex-wrap">
        <div
          class="w-50 rounded shadow-lg mx-4"
          v-for="file in files"
          :key="file"
        >
          <img
            class="w-20 mx-auto"
            src="folder.png"
            v-if="file.endsWith('/')"
            :alt="file"
          />
          <img
            class="w-20 mx-auto"
            :src="pods[0].slice(0, -1) + file"
            v-else-if="
              file.endsWith('.ico') ||
              file.endsWith('.jpg') ||
              file.endsWith('.png')
            "
            :alt="file"
          />
          <img class="w-20 mx-auto" src="file.png" v-else :alt="file" />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2"></div>
            <p class="text-gray-700 text-base">{{ file }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
