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
    <VLayout class="rounded rounded-md h-100">
      <VNavigationDrawer
        v-model="rail"
        mobile-breakpoint="sm"
        :width="330"
        rail
        rail-width="330"
      >
        <p class="pa-4">
          <span class="text-h5 font-weight-bold">Filter</span>
          <span>Date</span>
        </p>
        <VDivider />
        <CalenderDialog btntext="Change Date" />
      </VNavigationDrawer>
      <VAppBar class="d-flex d-sm-none border-b" elevation="0">
        <VBtn @click.stop="rail = !rail" class="w-100 h-100">
          <VAppBarNavIcon class="d-block d-sm-none rounded-0" text="Filter">
          </VAppBarNavIcon>
          <h4>Filter</h4>
        </VBtn>
      </VAppBar>

      <VMain class="d-flex justify-center bg-white">
        <div class="d-flex flex-column h-100 w-100" min-width="66%"></div>
      </VMain>
    </VLayout>
  </div>
</template>
