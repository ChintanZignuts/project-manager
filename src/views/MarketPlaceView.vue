<script setup lang="ts">
import CalenderDialog from "@/components/CalenderDialog.vue";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
watch(locale, (newlocale) => {
  localStorage.setItem("locale", newlocale);
});

const rail = ref<boolean>(true);
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
        <h4 class="pa-4 text-h5 font-weight-bold">Filter</h4>
        <VDivider />
        <CalenderDialog btntext="Change Date" />
      </v-navigation-drawer>
      <v-app-bar class="d-flex d-sm-none border-b" elevation="0">
        <v-btn @click.stop="rail = !rail" class="w-100 h-100">
          <v-app-bar-nav-icon class="d-block d-sm-none rounded-0" text="Filter">
          </v-app-bar-nav-icon>
          <h4>Filter</h4>
        </v-btn>
      </v-app-bar>

      <v-main class="d-flex justify-center bg-white">
        <div class="d-flex flex-column h-100 w-100" min-width="66%"></div>
      </v-main>
    </v-layout>
  </div>
</template>
