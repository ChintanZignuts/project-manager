<script setup lang="ts">
import { ref, defineProps, computed, watchEffect, watch } from "vue";
import { useProjects } from "@/stores/projects";
import { useI18n } from "vue-i18n";
import type { Project } from "@/project";
const { t, locale } = useI18n();
watch(locale, (newlocale) => {
  localStorage.setItem("locale", newlocale);
});
const projectStore = useProjects();
const { buttonText, cardTitle, id } = defineProps([
  "buttonText",
  "cardTitle",
  "id",
]);

const dialog = ref<boolean>(false);
const emits = defineEmits(["submit"]);
const projectvalue = ref({
  name: "",
  description: "",
});
const getProject = async (id: string) => {
  try {
    const res = await projectStore.fetchProjectById(id);
    projectvalue.value = res as Project;
  } catch (error: any) {
    console.error("Error:", error.response?.data.message);
  }
};

const handleclick = (id: string) => {
  if (id) {
    getProject(id);
  }
};

const submitForm = () => {
  emits("submit", projectvalue.value);
  dialog.value = false;
};
</script>
<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-regular text-white bg-deep-orange-lighten-1"
        :text="buttonText"
        variant="tonal"
        v-bind="activatorProps"
        @click.stop="handleclick(id)"
      ></v-btn>
    </template>

    <form @submit.prevent="submitForm">
      <v-card :title="cardTitle">
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                :label="t('Name')"
                variant="outlined"
                v-model="projectvalue.name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                :label="t('Description')"
                variant="outlined"
                v-model="projectvalue.description"
                required
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>
          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            type="submit"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>
