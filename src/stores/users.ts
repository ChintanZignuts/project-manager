import { defineStore } from "pinia";
import axios from "axios";
import { toast, type ToastOptions } from "vue3-toastify";
import type { User, oldUser } from "../user";

interface UserState {
  isLoggedIn: boolean;
  user: User | null;
}

export const useUsers = defineStore("users", {
  state: (): UserState => ({
    isLoggedIn: false,
    user: null,
  }),
  getters: {
    getuser(): User | null {
      return this.user;
    },
    isLogged(): boolean {
      return this.isLoggedIn;
    },
  },
  actions: {
    async handleRequest(request: Promise<any>, errorMessage: string) {
      try {
        const response = await request;
        return response.data;
      } catch (error: any) {
        toast.error(error.response?.data.message || errorMessage, {
          autoClose: 2000,
          position: toast.POSITION.TOP_RIGHT,
        } as ToastOptions);
      }
    },
    async login(credentials: oldUser) {
      const response = await this.handleRequest(
        axios.post("/api/login", credentials),
        "Login failed:"
      );
      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(response.user));
      this.isLoggedIn = true;
      return response;
    },

    async logout() {
      const token = localStorage.getItem("token");
      return this.handleRequest(
        axios.post(
          "/api/logout",
          {},
          { headers: { Authorization: "Bearer " + token } }
        ),
        "Logout failed:"
      );
    },

    async register(newUser: User) {
      const response = await this.handleRequest(
        axios.post("api/register", newUser),
        "Registration failed:"
      );

      this.user = response.user;
      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(response.user));
      this.isLoggedIn = true;
      return response;
    },

    async getUser() {
      return this.handleRequest(axios.get("/api/user"), "Get user failed:");
    },
  },
});
