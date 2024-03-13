<script setup lang="ts">
//imports
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

//translate
const { t, locale } = useI18n();
watch(locale, (newlocale) => {
  localStorage.setItem("locale", newlocale);
});

//interfaces
interface Language {
  lang: string;
  code: string;
  icon: string;
}

//variables
const selectedLanguage = ref<Language | null>(null);
const user = ref(JSON.parse(localStorage.getItem("user") as string));
const language = ref([
  { lang: "English", code: "en", icon: "/country/united-kingdom.png" },
  { lang: "ગુજરાતી ", code: "gu", icon: "/country/india.png" },
  { lang: "French", code: "fr", icon: "/country/france.png" },
]);

//emits
const emit = defineEmits<{
  (e: "btnClick"): void;
}>();

//functions
const handleButtonClick = () => {
  emit("btnClick");
};

const changeLanguage = (selectedLang: Language) => {
  locale.value = selectedLang.code;
  selectedLanguage.value = selectedLang;
};

const selectedLanguageIcon = computed(() => {
  if (selectedLanguage.value) {
    return selectedLanguage.value.icon;
  }
  return "/country/united-kingdom.png";
});
</script>
<template>
  <VAppBar :elevation="0" rounded class="bg-transparent">
    <VAppBarNavIcon
      class="d-block d-sm-none"
      @click.stop="handleButtonClick"
    ></VAppBarNavIcon>
    <template v-slot:append>
      <VMenu
        v-model:selectedLanguage="selectedLanguage"
        transition="slide-x-transition"
        class="mr-5"
      >
        <template v-slot:activator="{ props }">
          <VBtn v-bind="props" icon>
            <VAvatar style="height: 22px; width: 22px">
              <VImg
                :src="selectedLanguageIcon"
                alt="Selected Language Flag"
              ></VImg>
            </VAvatar>
          </VBtn>
        </template>

        <VList>
          <VListItem
            v-for="(item, i) in language"
            :key="i"
            @click="changeLanguage(item)"
          >
            <div class="d-flex ma-2">
              <VListItemAvatar class="mr-2">
                <VImg
                  :src="item.icon"
                  width="24"
                  height="24"
                  alt="Language Flag"
                ></VImg>
              </VListItemAvatar>
              <VListItemTitle class="text-subtitle-1 font-weight-regular"
                >{{ item.lang }}
                <span class="text-disabled text-subtitle-1 pl-2"
                  >({{ item.code }})</span
                ></VListItemTitle
              >
            </div>
          </VListItem>
        </VList>
      </VMenu>
      <VMenu transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <VBtn v-bind="props" icon="mdi-account"> </VBtn>
        </template>
        <VList class="pa-3">
          <VRow class="flex-column pa-3">
            <h6 class="text-h6 font-weight-medium">{{ t("User Profile") }}</h6>
            <VDivider></VDivider>
            <div class="d-flex align-center">
              <VIcon size="50" icon="mdi-account-circle " class="mr-4"></VIcon>
              <div>
                <h6 class="text-h6 mb-n1">{{ user.name }}</h6>
                <span class="text-subtitle-1 font-weight-regular textSecondary"
                  >User</span
                >
              </div>
            </div>
            <div class="d-flex align-center mt-1">
              <VIcon width="18" height="18"> mdi-email </VIcon>
              <span
                class="text-subtitle-1 font-weight-regular textSecondary ml-2"
                >{{ user.email }}</span
              >
            </div>
          </VRow>
        </VList>
      </VMenu>
    </template>
  </VAppBar>
</template>
