<script setup lang="ts">
import router from "@/router";
import NavBar from "./NavBar.vue";
import { useUsers } from "@/stores/users";
import { ref } from "vue";
import MainBox from "./MainBox.vue";
const usersStore = useUsers();
const rail = ref(true);
const drawer = ref(true);
const dialog = ref(false);
const handleLogout = async () => {
  await usersStore.logout();
  localStorage.removeItem("token");
  router.push("/");
};
const routeToDashBoard = () => {
  router.push("/dashboard");
};
</script>
<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
        class="rounded-lg"
        temporary
      >
        <v-list-item
          class="text-h5"
          prepend-avatar="https://cdn.vuetifyjs.com/docs/images/brand-kit/v-logo.svg"
          title="Project Manger"
          nav
        >
          <template v-slot:append>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-view-dashboard"
            title="DashBoard"
            value="dashboard"
            @click.stop="routeToDashBoard()"
            active
          ></v-list-item>
        </v-list>
        <template v-slot:append>
          <v-list class="bottom" density="compact" nav>
            <v-list-item
              prepend-icon="mdi-logout"
              title="Logout"
              value="logout"
              @click.stop="handleLogout()"
            ></v-list-item>
          </v-list>
        </template>
      </v-navigation-drawer>
      <v-main
        style="height: 100vh; width: 100%"
        class="bg-red-lighten-5"
        @click.stop="rail = true"
      >
        <NavBar />
        <div class="d-flex align-center justify-center">
          <MainBox />
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>
<style scoped>
.bottom {
  position: relative;
  bottom: 15px;
}
</style>
