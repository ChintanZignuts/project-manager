<script setup lang="ts">
//imports
import { ref, watch } from "vue";
import { useProjects } from "@/stores/projects";
import type { Project } from "@/project";
import { useI18n } from "vue-i18n";

//for translate
const { t, locale } = useI18n();
watch(locale, (newlocale) => {
  localStorage.setItem("locale", newlocale);
});

//variable
const projectStore = useProjects();
const dialog = ref<boolean>(false);
const emits = defineEmits(["submit"]);
const projectvalue = ref({
  name: "",
  description: "",
});

//props
const { buttonText, cardTitle, id } = defineProps([
  "buttonText",
  "cardTitle",
  "id",
]);

//Function
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
  <VDialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <VBtn
        class="text-none font-weight-regular text-white bg-deep-orange-lighten-1"
        :text="buttonText"
        variant="tonal"
        v-bind="activatorProps"
        @click.stop="handleclick(id)"
      ></VBtn>
    </template>

    <form @submit.prevent="submitForm">
      <!-- //form -->
      <VCard :title="cardTitle">
        <VCardText>
          <VRow dense>
            <VCol cols="12">
              <VTextField
                :label="t('Name')"
                variant="outlined"
                v-model="projectvalue.name"
                required
              ></VTextField>
            </VCol>
            <VCol cols="12">
              <VTextarea
                :label="t('Description')"
                variant="outlined"
                v-model="projectvalue.description"
                required
              ></VTextarea>
            </VCol>
          </VRow>
        </VCardText>

        <VDivider></VDivider>

        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn text="Close" variant="plain" @click="dialog = false"></VBtn>
          <VBtn
            color="primary"
            text="Save"
            variant="tonal"
            type="submit"
          ></VBtn>
        </VCardActions>
      </VCard>
    </form>
  </VDialog>
</template>
