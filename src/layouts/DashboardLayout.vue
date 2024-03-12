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
  router.push("/marketplace");
};
</script>
<template>
  <VCard class="h-100">
    <VLayout class="h-100">
      <VNavigationDrawer
        v-model="drawer"
        :rail="rail"
        @click="rail = false"
        class="rounded-lg"
        mobile-breakpoint="sm"
      >
        <VListItem
          class="text-h5"
          prepend-avatar="https://cdn.vuetifyjs.com/docs/images/brand-kit/v-logo.svg"
          :title="t('Project Manger')"
          nav
        >
          <template v-slot:append>
            <VBtn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            ></VBtn>
          </template>
        </VListItem>

        <VDivider></VDivider>

        <VList density="compact" nav>
          <VListItem
            prepend-icon="mdi-view-dashboard"
            :title="t('Project')"
            value="project"
            :class="{ active: $route.name === 'DashBoardLayout' }"
            @click.stop="routeToDashBoard"
          ></VListItem>

          <VListItem
            prepend-icon="mdi-shopping"
            :title="t('MarketPlace')"
            value="new"
            :class="{ active: $route.name === 'New' }"
            @click.stop="routeTonew"
          ></VListItem>
        </VList>
        <template v-slot:append>
          <VList class="bottom" density="compact" nav>
            <VListItem
              prepend-icon="mdi-logout"
              :title="t('logout')"
              value="logout"
              @click.stop="handleLogout()"
            ></VListItem>
          </VList>
        </template>
      </VNavigationDrawer>
      <VMain
        style="width: 100%"
        class="bg-red-lighten-5"
        @click.stop="rail = true"
      >
        <NavBar @btnClick="changeDrawer" />
        <div class="d-flex align-center justify-center h-100">
          <router-view />
        </div>
      </VMain>
    </VLayout>
  </VCard>
</template>
<style scoped>
.bottom {
  position: relative;
  bottom: 15px;
}
</style>
