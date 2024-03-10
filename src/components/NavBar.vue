<script setup lang="ts">
import { computed, ref, defineEmits } from "vue";
interface Language {
  lang: string;
  code: string;
  icon: string;
}

const selectedLanguage = ref<Language | null>(null);
const user = ref(JSON.parse(localStorage.getItem("user")));
const emit = defineEmits(["btnClick"]);

const handleButtonClick = () => {
  console.log("handleButtonClick");
  emit("btnClick");
};

const language = ref([
  { lang: "English", code: "en", icon: "/country/united-kingdom.png" },
  { lang: "French", code: "fr", icon: "/country/france.png" },
  { lang: "中国人 ", code: "Chinese", icon: "/country/china.png" },
  { lang: "ગુજરાતી ", code: "india", icon: "/country/india.png" },
]);

const selectedLanguageIcon = computed(() => {
  if (selectedLanguage.value) {
    return selectedLanguage.value.icon;
  }
  return "/country/united-kingdom.png";
});
</script>
<template>
  <v-app-bar :elevation="0" rounded class="bg-transparent">
    <v-app-bar-nav-icon
      class="d-block d-sm-none"
      @click.stop="handleButtonClick"
    ></v-app-bar-nav-icon>
    <template v-slot:append>
      <v-menu
        v-model:selectedLanguage="selectedLanguage"
        transition="slide-x-transition"
        class="mr-5"
      >
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon>
            <v-avatar style="height: 22px; width: 22px">
              <v-img
                :src="selectedLanguageIcon"
                alt="Selected Language Flag"
              ></v-img>
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, i) in language"
            :key="i"
            @click="selectedLanguage = item"
          >
            <div class="d-flex ma-2">
              <v-list-item-avatar class="mr-2">
                <v-img
                  :src="item.icon"
                  width="24"
                  height="24"
                  alt="Language Flag"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-title class="text-subtitle-1 font-weight-regular"
                >{{ item.lang }}
                <span class="text-disabled text-subtitle-1 pl-2"
                  >({{ item.code }})</span
                ></v-list-item-title
              >
            </div>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon="mdi-account"> </v-btn>
        </template>
        <v-list class="pa-3">
          <v-row class="flex-column pa-3">
            <h6 class="text-h6 font-weight-medium">User Profile</h6>
            <v-divider></v-divider>
            <div class="d-flex align-center">
              <v-icon
                size="50"
                icon="mdi-account-circle "
                class="mr-4"
              ></v-icon>
              <div>
                <h6 class="text-h6 mb-n1">{{ user.name }}</h6>
                <span class="text-subtitle-1 font-weight-regular textSecondary"
                  >User</span
                >
              </div>
            </div>
            <div class="d-flex align-center mt-1">
              <v-icon width="18" height="18"> mdi-email </v-icon>
              <span
                class="text-subtitle-1 font-weight-regular textSecondary ml-2"
                >{{ user.email }}</span
              >
            </div>
          </v-row>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>
