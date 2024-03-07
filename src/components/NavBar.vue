<script setup lang="ts">
import { computed, ref } from "vue";
import { useUsers } from "@/stores/users";
interface Language {
  lang: string;
  code: string;
  icon: string;
}

const usersStore = useUsers();
const selectedLanguage = ref<Language | null>(null);
console.log(usersStore.user);
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
  <v-app-bar :elevation="0" rounded>
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
        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>
