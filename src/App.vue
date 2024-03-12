<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import DashboardLayout from "./layouts/DashboardLayout.vue";
const route = useRoute();
console.log(route);
</script>

<template>
  <DashboardLayout v-if="route.meta.layout === 'default'" />
  <RouterView v-else />
</template>

<style scoped></style>
