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
      openedFile: "pod/openedFile",
      filecontent: "pod/fileContent",
      currentFile: "pod/currentFile",
    }),
  },
  methods: {
    openDir(dir) {
      this.$store.dispatch("pod/changeOpenedFile", false);
      this.$store.dispatch("pod/setURL", dir);
      this.$store.dispatch("pod/getData");
    },
    openFile(file) {
      this.$store.dispatch("pod/setCurrentfile", file);
      this.$store.dispatch("pod/readFile", file);
    },
    openImage(file) {
      this.$store.dispatch("pod/setCurrentfile", file);
      this.$store.dispatch("pod/changeOpenedFile", true);
    },
  },
  async mounted() {
    await this.$store.dispatch("pod/getAll");
  },
};
</script>

<template>
  <div class="" id="dashboard">
    <div>
      <h2>File viewer</h2>
      <p
        class="w-72 mx-auto text-center"
        v-if="currentURL !== '' && !openedFile"
      >
        <span
          class="text-sky-600 underline font-bold cursor-pointer"
          @click="openDir(baseURL)"
          >HOME</span
        ><span
          class="cursor-pointer text-sky-400"
          @click="openDir(currentURL)"
          >{{ currentURL }}</span
        >
      </p>
      <p
        class="w-72 mx-auto text-center underline font-bold cursor-pointer"
        v-else-if="openedFile"
      >
        <span
          class="text-sky-600 underline font-bold cursor-pointer"
          @click="openDir(baseURL)"
          >HOME</span
        ><span @click="openDir(currentURL)">{{ currentURL }}</span
        >{{ currentFile.replace(currentURL, "") }}
      </p>
      <p
        class="w-72 mx-auto text-center text-sky-600 underline font-bold cursor-pointer"
        @click="openDir(baseURL)"
        v-else
      >
        HOME
      </p>
      <div class="container" v-if="pods.length > 1">
        <h3>Select a pod to manage.</h3>
        <select class="rounded-full">
          <option value="">Choose a pod from below to continue</option>
          <option v-for="pod in pods" :key="pod" :value="pod">{{ pod }}</option>
        </select>
      </div>
      <div v-else-if="!openedFile" class="flex flex-wrap justify-center">
        <div
          class="w-1/6 rounded shadow-lg mx-4 my-4 cursor-pointer"
          v-for="file in files"
          :key="file"
        >
          <div v-if="file.endsWith('/')" @click="openDir(file)">
            <img class="w-20 mx-auto" src="@/assets/folder.png" :alt="file" />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2"></div>
              <p class="text-gray-700 text-base text-center">
                {{ file.replace(currentURL, "") }}
              </p>
            </div>
          </div>
          <div
            v-else-if="
              file.endsWith('.ico') ||
              file.endsWith('.jpg') ||
              file.endsWith('.jpeg') ||
              file.endsWith('.png') ||
              file.endsWith('.gif')
            "
            @click="openImage(file)"
          >
            <img
              class="w-20 mx-auto"
              :src="pods[0].slice(0, -1) + file"
              :alt="file"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2"></div>
              <p class="text-gray-700 text-base text-center">
                {{ file.replace(currentURL, "") }}
              </p>
            </div>
          </div>

          <div v-else @click="openFile(file)">
            <img class="w-20 mx-auto" src="@/assets/file.png" :alt="file" />

            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2"></div>
              <p class="text-gray-700 text-base text-center">
                {{ file.replace(currentURL, "") }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="h-96">
        <div
          v-if="
            currentFile.endsWith('.ico') ||
            currentFile.endsWith('.jpg') ||
            currentFile.endsWith('.jpeg') ||
            currentFile.endsWith('.png') ||
            currentFile.endsWith('.gif')
          "
        >
          <figure class="w-72 mx-auto mt-5">
            <img :src="pods[0].slice(0, -1) + currentFile" :alt="currentFile" />
          </figure>
        </div>
        <div v-else>
          <textarea
            class="form-control block w-3/6 mx-auto mt-8 h-96 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleFormControlTextarea1"
            rows="3"
            disabled
            v-model="filecontent"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
