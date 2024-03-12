<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useProjects } from "@/stores/projects";
import type { Project } from "@/project";
import { toast, type ToastOptions } from "vue3-toastify";
import { computed } from "vue";
import { watch } from "vue";
import { useI18n } from "vue-i18n";
import CreateDiailog from "@/components/CreateDiailog.vue";

const { t, locale } = useI18n();
watch(locale, (newlocale) => {
  localStorage.setItem("locale", newlocale);
});

const tab = ref(null);
const search = ref<string>("");
const projectStore = useProjects();
const projects = ref<Project[]>([]);
const displayProject = ref<Project | null>(null);
const dialog = ref<boolean>(false);
const cardColors = ["#E5FAFB", "#FDEDE8", "#FEF5E5", "#E6FFFA"];
const rail = ref<boolean>(true);
const safeDisplayProject = computed(
  () => displayProject.value || { name: "", description: "", updated_at: "" }
);

const newProject = ref({
  name: "",
  description: "",
});

const fetchProjects = async (
  page?: number,
  pageSize?: number
): Promise<void> => {
  try {
    const res = await projectStore.fetchProjects(page, pageSize);
    projects.value = res.data;
  } catch (error: any) {
    console.error("Error:", error.response?.data.message);
  }
};

const getProject = async (id: string) => {
  try {
    const res = await projectStore.fetchProjectById(id);
    displayProject.value = res as Project;
  } catch (error: any) {
    console.error("Error:", error.response?.data.message);
  }
};

const deleteProject = async (id: string) => {
  try {
    if (displayProject.value) {
      const isDisplayedProject = displayProject.value.id === id;
      await projectStore.deleteProject(id);
      projects.value = projects.value.filter((project) => project.id !== id);
      if (isDisplayedProject) {
        displayProject.value = null;
      }
      toast.success("Project deleted successfully", {
        autoClose: 2000,
        position: toast.POSITION.TOP_RIGHT,
      } as ToastOptions);
    }
  } catch (error: any) {
    toast.error("Error deleting project", {
      autoClose: 2000,
      position: toast.POSITION.TOP_RIGHT,
    } as ToastOptions);
    console.error("Error:", error.response?.data.message);
  }
};

const updateProject = async (editProject: Project) => {
  try {
    const { id, name, description } = editProject;
    await projectStore.updateProject(id, name, description);
    await fetchProjects(1, 50);
    toast.success("Project updated successfully", {
      autoClose: 2000,
      position: toast.POSITION.TOP_RIGHT,
    } as ToastOptions);
  } catch (error: any) {
    toast.error("Error updating project", {
      autoClose: 2000,
      position: toast.POSITION.TOP_RIGHT,
    } as ToastOptions);
    console.error("Error:", error.response?.data.message);
  }
};

const addProject = async (newProject: Project) => {
  try {
    await projectStore.createProject(newProject.name, newProject.description);
    newProject.name = "";
    newProject.description = "";
    await fetchProjects(1, 50);
    toast.success("Project created successfully", {
      autoClose: 2000,
      position: toast.POSITION.TOP_RIGHT,
    } as ToastOptions);
  } catch (error: any) {
    console.error("Error creating project:", error);
    toast.error("Error creating project", {
      autoClose: 2000,
      position: toast.POSITION.TOP_RIGHT,
    } as ToastOptions);
  }
};

let currentColorIndex = 0;

const getNextColor = () => {
  const color = cardColors[currentColorIndex];
  currentColorIndex = (currentColorIndex + 1) % cardColors.length;
  return color;
};

const calculateTimeDifference = (updateDate: string): string => {
  const updateDateTime = new Date(updateDate);
  const currentDateTime = new Date();
  const timeDifferenceMs = currentDateTime.getTime() - updateDateTime.getTime();
  const seconds = Math.floor(timeDifferenceMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
};

onMounted(() => {
  fetchProjects(1, 50);
});
</script>

<template>
  <div class="h-100 w-100 pa-5">
    <VLayout class="rounded rounded-md h-100">
      <VNavigationDrawer
        v-model="rail"
        mobile-breakpoint="sm"
        :width="330"
        rail
        rail-width="330"
      >
        <VList>
          <VListItem class="font-weight-bold">
            <VListTitle>{{ t("All Projects") }}</VListTitle>
            <VCard class="mt-5" elevation="0">
              <VDataIterator
                :items="projects"
                :items-per-page="8"
                :search="search"
              >
                <template v-slot:header>
                  <VToolbar class="px-2">
                    <VTextField
                      v-model="search"
                      density="comfortable"
                      :placeholder="t('Search')"
                      prepend-inner-icon="mdi-magnify"
                      style="max-width: 100%"
                      variant="solo"
                      clearable
                      hide-details
                    ></VTextField>
                  </VToolbar>
                </template>

                <template v-slot:default="{ items }">
                  <VContainer class="pa-2" fluid>
                    <VRow dense>
                      <VCol
                        v-for="(item, i) in items"
                        :key="item.raw.id"
                        cols="12"
                      >
                        <VCard
                          class="pb-3 cursor-pointer"
                          flat
                          @click.stop="getProject(item.raw.id)"
                          :style="{ backgroundColor: getNextColor() }"
                        >
                          <VListItem
                            :subtitle="item.raw.description"
                            class="mb-2"
                          >
                            <template v-slot:title>
                              <strong class="text-h6 mb-2">{{
                                item.raw.name
                              }}</strong>
                            </template>
                          </VListItem>

                          <div class="d-flex justify-space-between px-4">
                            <div
                              class="d-flex align-center text-caption text-medium-emphasis me-1"
                            >
                              <VIcon icon="mdi-clock" start></VIcon>

                              <div class="text-truncate">
                                {{
                                  calculateTimeDifference(item.raw.updated_at)
                                }}
                              </div>
                            </div>

                            <VBtn
                              class="text-none bg-transparent"
                              @click.stop="deleteProject(item.raw.id)"
                              flat
                            >
                              <VIcon>mdi-delete</VIcon>
                            </VBtn>
                          </div>
                        </VCard>
                      </VCol>
                    </VRow>
                  </VContainer>
                </template>

                <template
                  v-slot:footer="{ page, pageCount, prevPage, nextPage }"
                >
                  <div class="d-flex align-center justify-center pa-4">
                    <VBtn
                      :disabled="page === 1"
                      density="comfortable"
                      icon="mdi-arrow-left"
                      variant="tonal"
                      rounded
                      @click="prevPage"
                    ></VBtn>

                    <div class="mx-2 text-caption">
                      Page {{ page }} of {{ pageCount }}
                    </div>

                    <VBtn
                      :disabled="page >= pageCount"
                      density="comfortable"
                      icon="mdi-arrow-right"
                      variant="tonal"
                      rounded
                      @click="nextPage"
                    ></VBtn>
                  </div>
                </template>
              </VDataIterator>
            </VCard>
          </VListItem>
        </VList>
      </VNavigationDrawer>
      <VAppBar class="d-flex d-sm-none border-b" elevation="0">
        <VAppBarNavIcon
          class="d-block d-sm-none w-100 h-100 rounded-0"
          @click.stop="rail = !rail"
        ></VAppBarNavIcon>
      </VAppBar>
      <VAppBar elevation="0" class="border-b">
        <template v-slot:append>
          <CreateDiailog
            :buttonText="t('New Project')"
            :cardTitle="t('Create Project')"
            :initialData="newProject"
            @submit="addProject"
          />
        </template>
      </VAppBar>

      <VMain class="d-flex justify-center bg-white">
        <div class="d-flex flex-column h-100 w-100" min-width="66%">
          <VTabs v-model="tab" align-tabs="end" color="deep-purple-accent-4">
            <VTab :value="1"><v-icon>mdi-eye</v-icon></VTab>
            <VTab
              v-if="displayProject && Object.keys(displayProject).length !== 0"
            >
              <CreateDiailog
                :buttonText="t('Edit Project')"
                :cardTitle="t('Edit Project')"
                :id="displayProject.id"
                @submit="updateProject"
            /></VTab>
          </VTabs>
          <VWindow v-model="tab">
            <VWindowItem :value="1">
              <VCard
                elevation="0"
                class="d-flex align-center justify-center w-100"
              >
                <VContainer
                  class="pa-6 d-flex flex-column align-center justify-center"
                >
                  <VCard class="w-100 h-100">
                    <VCardTitle class="text-h6 mb-4">{{
                      t("Name")
                    }}</VCardTitle>
                    <VCardText>{{ displayProject?.name }}</VCardText>

                    <VDivider class="my-4"></VDivider>

                    <VCardTitle class="text-h6 mb-4">{{
                      t("Description")
                    }}</VCardTitle>
                    <VCardText>{{ displayProject?.description }}</VCardText>
                  </VCard>
                </VContainer>
              </VCard>
            </VWindowItem>
          </VWindow>
        </div>
      </VMain>
    </VLayout>
  </div>
</template>
