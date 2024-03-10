<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useProjects } from "@/stores/projects";
import type { Project } from "@/project";
import { toast, type ToastOptions } from "vue3-toastify";
import { computed } from "vue";

const tab = ref(null);
const search = ref("");
const projectStore = useProjects();
const projects = ref<Project[]>([]);
const displayProject = ref<Project | null>(null);
const dialog = ref(false);
const cardColors = ["#E5FAFB", "#FDEDE8", "#FEF5E5", "#E6FFFA", "#33FFFF"];
const rail = ref(true);
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

const updateProject = async () => {
  try {
    const { id, name, description } = displayProject.value as Project;
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

const addProject = async () => {
  try {
    await projectStore.createProject(
      newProject.value.name,
      newProject.value.description
    );
    // Clear the input fields
    newProject.value.name = "";
    newProject.value.description = "";
    await fetchProjects(1, 50);
    dialog.value = false;
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
  currentColorIndex = (currentColorIndex + 1) % cardColors.length; // Cycle through colors
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
    <v-layout class="rounded rounded-md h-100">
      <v-navigation-drawer
        v-model="rail"
        mobile-breakpoint="sm"
        :width="330"
        rail
        rail-width="330"
      >
        <v-list>
          <v-list-item class="font-weight-bold">
            <v-list-title>All Projects</v-list-title>
            <v-card class="mt-5" elevation="0">
              <v-data-iterator
                :items="projects"
                :items-per-page="10"
                :search="search"
              >
                <template v-slot:header>
                  <v-toolbar class="px-2">
                    <v-text-field
                      v-model="search"
                      density="comfortable"
                      placeholder="Search"
                      prepend-inner-icon="mdi-magnify"
                      style="max-width: 100%"
                      variant="solo"
                      clearable
                      hide-details
                    ></v-text-field>
                  </v-toolbar>
                </template>

                <template v-slot:default="{ items }">
                  <v-container class="pa-2" fluid>
                    <v-row dense>
                      <v-col
                        v-for="(item, i) in items"
                        :key="item.raw.id"
                        cols="12"
                      >
                        <v-card
                          class="pb-3 cursor-pointer"
                          flat
                          @click.stop="getProject(item.raw.id)"
                          :style="{ backgroundColor: getNextColor() }"
                        >
                          <v-list-item
                            :subtitle="item.raw.description"
                            class="mb-2"
                          >
                            <template v-slot:title>
                              <strong class="text-h6 mb-2">{{
                                item.raw.name
                              }}</strong>
                            </template>
                          </v-list-item>

                          <div class="d-flex justify-space-between px-4">
                            <div
                              class="d-flex align-center text-caption text-medium-emphasis me-1"
                            >
                              <v-icon icon="mdi-clock" start></v-icon>

                              <div class="text-truncate">
                                {{
                                  calculateTimeDifference(item.raw.updated_at)
                                }}
                              </div>
                            </div>

                            <v-btn
                              class="text-none bg-transparent"
                              @click.stop="deleteProject(item.raw.id)"
                              flat
                            >
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>
                          </div>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </template>

                <template
                  v-slot:footer="{ page, pageCount, prevPage, nextPage }"
                >
                  <div class="d-flex align-center justify-center pa-4">
                    <v-btn
                      :disabled="page === 1"
                      density="comfortable"
                      icon="mdi-arrow-left"
                      variant="tonal"
                      rounded
                      @click="prevPage"
                    ></v-btn>

                    <div class="mx-2 text-caption">
                      Page {{ page }} of {{ pageCount }}
                    </div>

                    <v-btn
                      :disabled="page >= pageCount"
                      density="comfortable"
                      icon="mdi-arrow-right"
                      variant="tonal"
                      rounded
                      @click="nextPage"
                    ></v-btn>
                  </div>
                </template>
              </v-data-iterator>
            </v-card>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar class="d-flex d-sm-none border-b" elevation="0">
        <v-app-bar-nav-icon
          class="d-block d-sm-none w-100 h-100 rounded-0"
          @click.stop="rail = !rail"
        ></v-app-bar-nav-icon>
      </v-app-bar>
      <v-app-bar elevation="0" class="border-b">
        <template v-slot:append>
          <v-dialog v-model="dialog" max-width="600">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                class="text-none font-weight-regular text-white bg-deep-orange-lighten-1"
                text="New Project"
                variant="tonal"
                v-bind="activatorProps"
              ></v-btn>
            </template>

            <v-card title="Create Project">
              <v-card-text>
                <v-row dense>
                  <v-col cols="12">
                    <v-text-field
                      label="Name"
                      v-model="newProject.name"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      label="Description"
                      v-model="newProject.description"
                      required
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  text="Close"
                  variant="plain"
                  @click="dialog = false"
                ></v-btn>

                <v-btn
                  color="primary"
                  text="Save"
                  variant="tonal"
                  @click="addProject()"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-app-bar>

      <v-main class="d-flex justify-center bg-white">
        <div class="d-flex flex-column h-100 w-100" min-width="66%">
          <v-tabs v-model="tab" align-tabs="end" color="deep-purple-accent-4">
            <v-tab :value="1"><v-icon>mdi-eye</v-icon></v-tab>
            <v-tab
              :value="2"
              v-if="displayProject && Object.keys(displayProject).length !== 0"
              ><v-icon>mdi-text-box-edit</v-icon></v-tab
            >
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item :value="1">
              <v-card
                elevation="0"
                class="d-flex align-center justify-center w-100"
              >
                <v-container
                  class="pa-6 d-flex flex-column align-center justify-center"
                >
                  <v-card class="w-100 h-100">
                    <v-card-title class="text-h6 mb-4">Name</v-card-title>
                    <v-card-text>{{ displayProject?.name }}</v-card-text>

                    <v-divider class="my-4"></v-divider>

                    <v-card-title class="text-h6 mb-4"
                      >Description</v-card-title
                    >
                    <v-card-text>{{ displayProject?.description }}</v-card-text>
                  </v-card>
                </v-container>
              </v-card>
            </v-window-item>
            <v-window-item :value="2">
              <v-card elevation="0" class="mb-10 pa-10 bg-transparent">
                <v-container class="h-75" :elevation="0">
                  <v-card :elevation="0">
                    <h4 class="text-h6 mb-4">Change name</h4>
                    <v-text-field
                      v-model="safeDisplayProject.name"
                      label="Name"
                      row-height="25"
                      variant="outlined"
                    ></v-text-field>
                    <h4 class="text-h6 mb-4">Change Description</h4>
                    <v-textarea
                      v-model="safeDisplayProject.description"
                      label="Description"
                      row-height="25"
                      rows="2"
                      variant="outlined"
                      shaped
                    ></v-textarea>
                    <v-btn
                      prepend-icon="mdi-content-save-outline"
                      class="bg-amber-accent-4"
                      @click.stop="updateProject()"
                    >
                      Save
                    </v-btn>
                  </v-card>
                </v-container>
              </v-card>
            </v-window-item>
          </v-window>
        </div>
      </v-main>
    </v-layout>
  </div>
</template>
