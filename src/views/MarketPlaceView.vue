<script setup lang="ts">
//imports
import CalenderDialog from "@/components/CalenderDialog.vue";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { itemsData, type Items } from "@/Productlist";
//transactors
const { t, locale } = useI18n();
watch(locale, (newlocale) => {
  localStorage.setItem("locale", newlocale);
});

//variables
const rail = ref<boolean>(true);
const date: Date = new Date();
const orderdate = ref<string>(date.toDateString());
const category = ref<string>("All");
const currentProducts = ref<Items[]>(itemsData);

//functions
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
  localStorage.setItem("currentDate", newdate.toDateString());
  if (newdate) {
    const cartItems: { item: Items; dateAdded: string }[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    const currentCart = cartItems.filter(
      (item) => item.dateAdded === newdate.toDateString()
    );
    localStorage.setItem("currentCart", JSON.stringify(currentCart));
    console.log(currentCart);
  }
  const formattedDate: string = formatDate(newdate.toDateString());
  orderdate.value = formattedDate;
};
watch(category, (newCategory) => {
  if (newCategory === "All") {
    currentProducts.value = itemsData;
  } else {
    filterCurrentProduct(newCategory);
  }
});
const filterCurrentProduct = (currentCategory: string) => {
  currentProducts.value = itemsData.filter(
    (item) => item.category === currentCategory
  );
};
const addToCart = (item: Items) => {
  const currentDate = localStorage.getItem("currentDate");
  if (currentDate) {
    const cartItems: { item: Items; dateAdded: string }[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    cartItems.push({ item, dateAdded: currentDate });
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
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
            <h5 class="text-h5 font-weight-bold">Categories</h5>
            <v-row>
              <v-col cols="12" class="w-100 d-block">
                <v-checkbox
                  v-model="category"
                  color="orange"
                  value="All"
                  label="All"
                  width="100%"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="category"
                  color="orange"
                  label="Groceries"
                  value="groceries"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="category"
                  color="orange"
                  label="Electronics"
                  value="electronics"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="category"
                  color="orange"
                  label="Motorcycle"
                  value="motorcycle"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="category"
                  color="orange"
                  label="Fashion"
                  value="fashion"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="category"
                  color="orange"
                  label="Automotive"
                  value="automotive"
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
          {{ formatDate() }}
        </p>
      </VAppBar>

      <VMain class="d-flex justify-center bg-white">
        <div class="d-flex flex-column h-100 w-100">
          <v-card class="overflow-y-auto elevation-0 h-100">
            <v-container class="pa-2" fluid>
              <v-row>
                <v-col
                  v-for="item in currentProducts"
                  :key="item.id"
                  cols="12"
                  md="4"
                >
                  <v-card class="pb-3 h-100" border flat>
                    <v-img height="50%" :src="item.images[0]"></v-img>
                    <div class="h-66">
                      <div class="about">
                        <v-list-item
                          :subtitle="item.description"
                          class="mb-2 h-66"
                        >
                          <template v-slot:title>
                            <strong class="text-h6 mb-2">{{
                              item.title
                            }}</strong>
                          </template>
                        </v-list-item>

                        <div class="d-flex justify-space-between px-4">
                          <div class="font-weight-bold">$ {{ item.price }}</div>

                          <v-btn
                            class="text-none"
                            size="small"
                            text="Add Cart"
                            border
                            @click.stop="addToCart(item)"
                            flat
                          >
                          </v-btn>
                        </div>
                        <v-rating
                          v-model="item.rating"
                          size="small"
                          color="yellow-darken-3"
                          class="ma-2"
                          density="compact"
                        ></v-rating>
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </div>
      </VMain>
    </VLayout>
  </div>
</template>
