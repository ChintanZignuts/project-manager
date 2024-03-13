<script setup lang="ts">
import CalenderDialog from "@/components/CalenderDialog.vue";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
watch(locale, (newlocale) => {
  localStorage.setItem("locale", newlocale);
});

const rail = ref<boolean>(true);
const date: Date = new Date();
const orderdate = ref<string>(date.toDateString());
const category = ref<string>("All");
const formatDate = (dateString: string): string => {
  const dateObj = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  if (isNaN(dateObj.getTime())) {
    return ""; // or handle invalid date as needed
  }
  return dateObj.toLocaleDateString("en-GB", options);
};

const handaldateChange = (newdate: Date) => {
  const formattedDate: string = formatDate(newdate.toDateString());
  orderdate.value = formattedDate;
};
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
        <div>
          <p class="pa-4">
            <span class="text-h5 font-weight-bold">Filter</span>
          </p>
        </div>
        <VDivider />
        <div class="d-flex align-center justify-center ma-4">
          <CalenderDialog
            btntext="Change Date"
            @date-changed="handaldateChange"
          />
        </div>
        <div>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-checkbox
                  class="w-100"
                  v-model="category"
                  color="orange"
                  value="All"
                  hide-details
                ></v-checkbox>
                <v-lable> </v-lable>
                <v-checkbox
                  v-model="category"
                  color="orange"
                  label="kitchen"
                  value="kitchen"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="category"
                  color="orange"
                  label="electronics"
                  value="electronics"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="category"
                  color="orange"
                  label="books"
                  value="books"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="category"
                  color="orange"
                  label="fashion"
                  value="fashion"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="category"
                  color="orange"
                  label="Toys"
                  value="toys"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </VNavigationDrawer>
      <VAppBar class="d-flex d-sm-none border-b" elevation="0">
        <VBtn @click.stop="rail = !rail" class="w-100 h-100">
          <VAppBarNavIcon class="d-block d-sm-none rounded-0" text="Filter">
          </VAppBarNavIcon>
          <h4>Filter</h4>
        </VBtn>
      </VAppBar>
      <VAppBar class="border-b elevation-0">
        <p class="text-subtitle-2 ma-4 font-weight-thin">
          Order For:
          {{ formatDate(orderdate) }}
        </p>
      </VAppBar>

      <VMain class="d-flex justify-center bg-white">
        <div class="d-flex flex-column h-100 w-100" min-width="66%"></div>
      </VMain>
    </VLayout>
  </div>
</template>
