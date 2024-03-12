<script setup lang="ts">
import { useRouter } from "vue-router";
import NavBar from "../components/NavBar.vue";
import { useUsers } from "@/stores/users";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
watch(locale, (newlocale) => {
  localStorage.setItem("locale", newlocale);
});

const usersStore = useUsers();
const rail = ref<boolean>(true);
const drawer = ref<boolean>(true);
const router = useRouter();

const handleLogout = async () => {
  await usersStore.logout();
  localStorage.removeItem("token");
  router.push("/");
};

const changeDrawer = () => {
  console.log("changeDrawer");
  rail.value = false;
  drawer.value = !drawer.value;
};

const routeToDashBoard = () => {
  router.push("/dashboard");
};
const routeTonew = () => {
  router.push("/new");
};
</script>
<template>
  <v-card class="h-100">
    <v-layout class="h-100">
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        @click="rail = false"
        class="rounded-lg"
        mobile-breakpoint="sm"
      >
        <v-list-item
          class="text-h5"
          prepend-avatar="https://cdn.vuetifyjs.com/docs/images/brand-kit/v-logo.svg"
          :title="t('Project Manger')"
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
            :title="t('Project')"
            value="project"
            :class="{ active: $route.name === 'DashBoardLayout' }"
            @click.stop="routeToDashBoard"
          ></v-list-item>

          <v-list-item
            prepend-icon="mdi-view-dashboard"
            :title="t('New')"
            value="new"
            :class="{ active: $route.name === 'New' }"
            @click.stop="routeTonew"
          ></v-list-item>
        </v-list>
        <template v-slot:append>
          <v-list class="bottom" density="compact" nav>
            <v-list-item
              prepend-icon="mdi-logout"
              :title="t('logout')"
              value="logout"
              @click.stop="handleLogout()"
            ></v-list-item>
          </v-list>
        </template>
      </v-navigation-drawer>
      <v-main
        style="width: 100%"
        class="bg-red-lighten-5"
        @click.stop="rail = true"
      >
        <NavBar @btnClick="changeDrawer" />
        <div class="d-flex align-center justify-center h-100">
          <router-view />
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
