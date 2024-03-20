import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import axios from "../plugins/axiosConfig";
import vuetify from "../plugins/vuetify";

import Vue3Toasity, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import { createI18n } from "vue-i18n";
import en from "./languages/En-US.json";
import gu from "./languages/Gu-Gujarati.json";
import fr from "./languages/Fr-French.json";

import "@mdi/font/css/materialdesignicons.css";

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("locale") ?? "en",
  fallbackLocale: "zh-TW",
  messages: {
    en: en,
    gu: gu,
    fr: fr,
  },
});
const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(Vue3Toasity, {
  autoClose: 3000,
} as ToastContainerOptions);

app.use(i18n);
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.mount("#app");
