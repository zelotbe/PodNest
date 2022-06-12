<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      pods: "pod/pods",
      webID: "auth/WebID",
      baseURL: "pod/baseURL",
      currentURL: "pod/currentURL",
      files: "pod/files",
    }),
  },
  methods: {
    openDir(dir) {
      this.$store.dispatch("pod/setURL", dir);
      this.$store.dispatch("pod/getData");
    },
  },
  mounted() {
    this.$store.dispatch("pod/getAll");
  },
};
</script>

<template>
  <div class="" id="dashboard">
    <div>
      <h2>File viewer</h2>
      <p class="w-44 mx-auto text-center" v-if="currentURL !== ''">
        <span
          class="text-sky-600 underline font-bold cursor-pointer"
          @click="openDir(baseURL)"
          >ROOT</span
        >{{ currentURL }}
      </p>
      <p
        class="w-44 mx-auto text-center text-sky-600 underline font-bold cursor-pointer"
        @click="openDir(baseURL)"
        v-else
      >
        ROOT
      </p>
      <div class="container" v-if="pods.length > 1">
        <h3>Select a pod to manage.</h3>
        <select class="rounded-full">
          <option value="">Choose a pod from below to continue</option>
          <option v-for="pod in pods" :key="pod" :value="pod">{{ pod }}</option>
        </select>
      </div>
      <div v-else class="flex flex-wrap justify-center">
        <div
          class="w-1/6 rounded shadow-lg mx-4 my-4 cursor-pointer"
          v-for="file in files"
          :key="file"
        >
          <div v-if="file.endsWith('/')" @click="openDir(file)">
            <img class="w-20 mx-auto" src="folder.png" :alt="file" />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2"></div>
              <p class="text-gray-700 text-base text-center">{{ file }}</p>
            </div>
          </div>
          <div
            v-else-if="
              file.endsWith('.ico') ||
              file.endsWith('.jpg') ||
              file.endsWith('.png') ||
              file.endsWith('.gif')
            "
            @click="openImage()"
          >
            <img
              class="w-20 mx-auto"
              :src="pods[0].slice(0, -1) + file"
              :alt="file"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2"></div>
              <p class="text-gray-700 text-base text-center">{{ file }}</p>
            </div>
          </div>

          <div v-else @click="openFile()">
            <img class="w-20 mx-auto" src="file.png" :alt="file" />

            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2"></div>
              <p class="text-gray-700 text-base text-center">{{ file }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
