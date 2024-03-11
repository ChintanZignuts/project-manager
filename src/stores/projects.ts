// src/stores/projectStore.ts
import { defineStore } from "pinia";
import axios from "axios";
import { toast, type ToastOptions } from "vue3-toastify";

interface Project {
  id: string;
  name: string;
  description: string;
  updated_at: string;
}

export const useProjects = defineStore({
  id: "project",
  state: () => ({
    projects: [] as Project[],
    selectedProject: null as Project | null,
  }),

  actions: {
    async fetchProjects(page?: number, pageSize?: number) {
      try {
        const response = await axios.get("/api/projects", {
          params: {
            page,
            pageSize,
          },
        });

        this.projects = response.data;

        return response.data;
      } catch (error: any) {
        toast.error(error.response?.data.message, {
          autoClose: 2000,
          position: toast.POSITION.TOP_RIGHT,
        } as ToastOptions);
      }
    },

    async fetchProjectById(projectId: string) {
      try {
        const response = await axios.get(`/api/projects/${projectId}`);
        this.selectedProject = response.data;
        return response.data;
      } catch (error: any) {
        console.error(`Error fetching project with ID ${projectId}:`, error);
        toast.error(error.response?.data.message, {
          autoClose: 2000,
          position: toast.POSITION.TOP_RIGHT,
        } as ToastOptions);
      }
    },

    async createProject(name: string, description: string) {
      try {
        const response = await axios.post("/api/projects", {
          name,
          description,
        });
      } catch (error) {
        console.error("Error creating project:", error);
        throw error;
      }
    },

    async updateProject(projectId: string, name: string, description: string) {
      try {
        const response = await axios.patch(`/api/projects/${projectId}`, {
          name,
          description,
        });
      } catch (error) {
        console.error(`Error updating project with ID ${projectId}:`, error);
        throw error;
      }
    },

    async deleteProject(projectId: string) {
      try {
        return await axios.delete(`/api/projects/${projectId}`);
      } catch (error) {
        console.error(`Error deleting project with ID ${projectId}:`, error);
        throw error;
      }
    },
  },
});
